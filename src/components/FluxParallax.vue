<script setup>
	import { ref, reactive, computed, unref, onMounted, onUnmounted } from 'vue';
	import { floor, ceil } from '@/models/partials/math.js';
	import { default as usePartials } from '@/models/partials/component.js';

	const $el = ref(null);

	const props = defineProps({
		rsc: {
			type: Object,
			required: true,
		},

		/* eslint-disable vue/require-prop-types */
		holder: {
			default: () => window
		},

		type: {
			default: 'relative',
		},

		offset: {
			type: [ Number, String ],
			default: '100%',
		},
	});

	const styles = reactive({
		base: {
			position: 'relative',
		},
	});

	const isIos = (/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream;

	const view = reactive({
		width: null,
		height: null,
	});

	let parallax = reactive({
		top: null,
		width: null,
		height: null,
	});

	const background = reactive({
		top: null,
		left: null,
		width: null,
		height: null,
	});

	const fixedParentStyle = reactive({
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		clip: 'rect(auto auto auto auto)',
	});

	const {
		style,
		setCss,
	} = usePartials($el, props, styles);

	const parallaxSize = computed(() => ({
		width: $el.clientWidth,
		height: $el.clientHeight,
	}));

	const offsetHeight = computed(() => {
		const { offset } = props;
		const offsetValue = parseFloat(offset);

		if (/^[0-9]+px$/.test(offset)) {
			return {
				px: offsetValue,
				pct: offsetValue * 100 / background.height,
			};

		}

		if (/^[0-9]+%$/.test(offset)) {
			return {
				px: ceil(parallaxSize.height * offsetValue / 100),
				pct: parseFloat(offsetValue),
			};
		}

		return 0;
	});

	const backgroundHeight = computed(
		() => isIos? view.height : parallaxSize.height + offsetHeight.px
	);

	const remainderHeight = computed(() => background.height - backgroundHeight.value);

	const fixedChildStyle = computed(() => ({
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		background: `url("${props.rsc.src}") no-repeat center center fixed`,
		backgroundSize: `${background.width}px ${background.height}px`,
	}));


	onMounted(() => {
		setCss({
			background: `url("${props.rsc.src}") no-repeat`,
		});

		window.addEventListener('resize', resize, {
			passive: true,
		});

		if (props.type !== 'fixed' || isIos) {
			setTimeout(() => {
				props.holder.addEventListener('scroll', handleScroll, {
					passive: true,
				});
			});
		}
	});


	onUnmounted(() => {
		window.removeEventListener('resize', resize);
		props.holder.removeEventListener('scroll', handleScroll);
	});


	const resize = () => {
		view.width = props.holder.scrollWidth || props.holder.innerWidth;
		view.height = props.holder.scrollHeight || props.holder.innerHeight;

		parallax = {
			...unref(parallax),
			...unref(parallaxSize),
			top: $el.offsetTop,
		};

		let imageRatio = props.rsc.height / props.rsc.width;
		let viewRatio = view.height / view.width;

		if (imageRatio >= viewRatio && !isIos) {
			background.width = view.width;
			background.height = floor(view.width * props.rsc.height / props.rsc.width);

		} else {
			background.height = view.height;
			background.width = floor(background.height * props.rsc.width / props.rsc.height);
		}

		setCss({
			backgroundSize: `${background.width}px ${background.height}px`,
			backgroundPosition: `center 0`,
		});

		handleScroll();
	};

	const moveBackgroundByPct = pct => {
		if (remainderHeight.value > 0)
			pct = pct * offsetHeight.pct / 100 + 50 - offsetHeight.pct / 2;

		setCss({
			backgroundPositionY: pct.toFixed(2) +'%'
		});
	};

	const handleScroll = () => {
		if (props.rsc.status.value !== 'loaded' || (!isIos && props.type === 'fixed'))
			return;

		let scrollTop = props.holder.scrollY || props.holder.scrollTop || props.holder.pageYOffset || 0;

		if (props.holder !== window)
			return handleRelative(scrollTop);

		if (scrollTop + view.height < parallax.top)
			return;

		if (scrollTop > parallax.top + parallax.height)
			return;

		let positionY = scrollTop - parallax.top + view.height;

		handle[props.type](positionY);
	};

	const handleVisible = positionY => {
		let pct = 0;

		if (positionY < parallax.height)
			pct = 0;

		else if (positionY > view.height)
			pct = 100;

		else
			pct = (positionY - parallax.height) * 100 / (view.height - parallax.height);

		moveBackgroundByPct(pct);
	};

	const handleRelative = positionY => {
		let pct;

		if (props.holder === window)
			pct = positionY * 100 / (view.height + parallax.height);

		else
			pct = positionY * 100 / (view.height - props.holder.clientHeight);

		moveBackgroundByPct(pct);
	};

	const handleFixed = positionY => {
		setCss({
			backgroundPositionY: (positionY - view.height) +'px',
		});
	};

	const handle = {
		visible: handleVisible,
		relative: handleRelative,
		fixed: handleFixed,
	};

	defineExpose(resize, setCss);
</script>

<template>
	<div ref="parallax" :style="style">
		<div v-if="type === 'fixed' && !isIos" :style="fixedParentStyle">
			<div class="image" :style="fixedChildStyle" />
		</div>

		<slot />
	</div>
</template>

<style lang="scss">
	.flux-parallax img {
		position: absolute;
		visibility: hidden;
	}

	.flux-parallax :not(.image) {
		z-index: 1;
	}
</style>