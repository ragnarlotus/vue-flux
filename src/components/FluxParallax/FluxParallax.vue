<script setup lang="ts">
	// holder (window), component, background

	import {
		ref,
		reactive,
		computed,
		unref,
		onMounted,
		onUnmounted,
		Ref,
		CSSProperties,
	} from 'vue';
	import { Maths } from '../../shared';
	import {
		DisplayProps,
		FluxParallaxProps,
		FluxParallaxStyles,
		ViewProps,
	} from './types';

	const { aspectRatio } = Maths;

	const props = withDefaults(defineProps<FluxParallaxProps>(), {
		holder: () => window,
		type: 'relative',
		offset: '100%',
	});

	const $el: Ref<null | HTMLDivElement> = ref(null);

	const { holder, rsc } = props;

	const style: FluxParallaxStyles = {
		base: {
			position: 'relative',
			background: `url("${rsc.src}") no-repeat`,
		},

		defined: reactive({}),

		final: computed(() => ({
			...style.base,
			...unref(style.defined),
		})),
	};

	const isIos =
		/iPad|iPhone|iPod/.test(navigator.userAgent) ||
		(navigator.userAgent === 'MacIntel' && navigator.maxTouchPoints > 1);

	const display: DisplayProps = reactive({
		width: 0,
		height: 0,
		aspectRatio: computed(() => aspectRatio(display)),
	});

	const view: ViewProps = reactive({
		top: 0,
		width: 0,
		height: 0,
		aspectRatio: computed(() => aspectRatio(view)),
	});

	const background = reactive({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
	});

	const fixedParentStyle: CSSProperties = {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		clip: 'rect(auto auto auto auto)',
	};

	const fixedChildStyle = computed<CSSProperties>(() => ({
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
				pct: (offsetValue * 100) / background.height,
			};
		}

		if (/^[0-9]+%$/.test(offset)) {
			return {
				px: Math.ceil((view.height * offsetValue) / 100),
				pct: offsetValue,
			};
		}

		return {
			px: 0,
			pct: 0,
		};
	});

	const remainderHeight = computed(() => {
		const effectHeight = isIos
			? display.height
			: view.height + offsetHeight.value.px;

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

		view.width = $el.value!.clientWidth;
		view.height = $el.value!.clientHeight;
		view.top = $el.value!.getBoundingClientRect().top + window.scrollY;

		rsc.displaySize.update(display);
		const fillProps = rsc.resizeProps.value;

		background.width = fillProps.width!;
		background.height = fillProps.height!;

		style.defined.backgroundSize = `${background.width}px ${background.height}px`;
		style.defined.backgroundPosition = `center 0`;

		onScroll();
	};

	const moveBackgroundByPct = (pct: number) => {
		if (remainderHeight.value > 0)
			pct =
				(pct * offsetHeight.value.pct) / 100 +
				50 -
				offsetHeight.value.pct / 2;

		style.defined.backgroundPositionY = pct.toFixed(2) + '%';
	};

	const onScroll = () => {
		if (!rsc.isLoaded() || (!isIos && props.type === 'fixed')) {
			return;
		}

		const scrollTop = holder.scrollY || holder.scrollTop || 0;

		if (holder !== window) {
			return handle.relative(scrollTop);
		}

		if (scrollTop + display.height < view.top) {
			return;
		}

		if (scrollTop > view.top + view.height) {
			return;
		}

		const positionY = scrollTop - view.top + display.height;

		handle[props.type](positionY);
	};

	const handle = {
		visible: (positionY: number) => {
			let pct = 0;

			if (positionY < view.height) {
				pct = 0;
			} else if (positionY > display.height) {
				pct = 100;
			} else {
				pct =
					((positionY - view.height) * 100) /
					(display.height - view.height);
			}

			moveBackgroundByPct(pct);
		},

		relative: (positionY: number) => {
			let pct;

			if (holder === window) {
				pct = (positionY * 100) / (display.height + view.height);
			} else {
				pct = (positionY * 100) / (display.height - holder.clientHeight);
			}

			moveBackgroundByPct(pct);
		},

		fixed: (positionY: number) => {
			style.defined.backgroundPositionY = positionY - display.height + 'px';
		},
	};

	defineExpose({
		resize,
	});
</script>

<template>
	<div ref="$el" class="flux-parallax" :style="style.final.value">
		<div v-if="props.type === 'fixed' && !isIos" :style="fixedParentStyle">
			<div class="image" :style="fixedChildStyle" />
		</div>

		<slot />
	</div>
</template>
