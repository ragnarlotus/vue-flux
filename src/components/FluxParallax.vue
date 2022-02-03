<script setup>
	// holder (window), component, background

	import { ref, reactive, computed, unref, onMounted, onUnmounted } from 'vue';
	import { ceil } from '@/models/partials/math.js';

	const $el = ref(null);

	const props = defineProps({
		rsc: {
			type: Object,
			required: true,
		},

		/* eslint-disable vue/require-prop-types */
		holder: {
			default: window,
		},

		type: {
			default: 'relative',
		},

		offset: {
			type: [ Number, String ],
			default: '100%',
		},
	});

	const { holder, rsc } = props;

	const style = {
		base: {
			position: 'relative',
			background: `url("${rsc.src}") no-repeat`,
		},
		defined: reactive({}),
		final: computed(() => ({
			...style.base,
			...unref(style.defined),
		}))
	};

	const isIos = (/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream;

	const display = reactive({
		width: null,
		height: null,
		aspectRatio: computed(() => display.width / display.height),
	});

	const view = reactive({
		top: null,
		width: null,
		height: null,
		aspectRatio: computed(() => view.width / view.height),
	});

	const background = reactive({
		top: null,
		left: null,
		width: null,
		height: null,
	});

	const fixedParentStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		clip: 'rect(auto auto auto auto)',
	};

	const fixedChildStyle = computed(() => ({
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		background: `url("${rsc.src}") no-repeat center center fixed`,
		backgroundSize: `${background.width}px ${background.height}px`,
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
				px: ceil(view.height * offsetValue / 100),
				pct: offsetValue,
			};
		}

		return 0;
	});

	const remainderHeight = computed(() => {
		const effectHeight = isIos? display.height : view.height + offsetHeight.value.px;

		return background.height - effectHeight;
	});

	onMounted(() => {
		window.addEventListener('resize', resize, {
			passive: true,
		});

		if (props.type !== 'fixed' || isIos) {
			holder.addEventListener('scroll', onScroll, {
				passive: true,
			});
		}

		rsc.load().then(() => {
			resize();
		});
	});

	onUnmounted(() => {
		window.removeEventListener('resize', resize);
		holder.removeEventListener('scroll', onScroll);
	});

	const resize = () => {
		display.width = holder.scrollWidth || holder.innerWidth;
		display.height = holder.scrollHeight || holder.innerHeight;

		view.width = $el.value.clientWidth;
		view.height = $el.value.clientHeight;
		view.top = $el.value.offsetTop;

		Object.assign(rsc.adaptToSize, display);
		const coverSize = rsc.adaptedStyle;

		background.width = coverSize.width;
		background.height = coverSize.height;

		style.defined.backgroundSize = `${background.width}px ${background.height}px`;
		style.defined.backgroundPosition = `center 0`;

		onScroll();
	};

	const moveBackgroundByPct = pct => {
		if (remainderHeight.value > 0)
			pct = pct * offsetHeight.value.pct / 100 + 50 - offsetHeight.value.pct / 2;

		style.defined.backgroundPositionY = pct.toFixed(2) +'%';
	};

	const onScroll = () => {
		if (rsc.status.value !== 'loaded' || (!isIos && props.type === 'fixed'))
			return;

		const scrollTop = holder.scrollY || holder.scrollTop || holder.pageYOffset || 0;

		if (holder !== window)
			return handle.relative(scrollTop);

		if (scrollTop + display.height < view.top)
			return;

		if (scrollTop > view.top + view.height)
			return;

		let positionY = scrollTop - view.top + display.height;

		handle[props.type](positionY);
	};

	const handle = {
		visible: positionY => {
			let pct = 0;

			if (positionY < view.height)
				pct = 0;

			else if (positionY > view.height)
				pct = 100;

			else
				pct = (positionY - view.height) * 100 / (view.height - view.height);

			moveBackgroundByPct(pct);
		},

		relative: positionY => {
			let pct;

			if (holder === window)
				pct = positionY * 100 / (display.height + view.height);

			else
				pct = positionY * 100 / (display.height - holder.clientHeight);

			moveBackgroundByPct(pct);
		},

		fixed: positionY => {
			style.defined.backgroundPositionY = (positionY - display.height) +'px';
		},
	};

	defineExpose(resize);
</script>

<template>
	<div ref="$el" :style="style.final.value">
		<div v-if="props.type === 'fixed' && !isIos" :style="fixedParentStyle">
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