<template>
	<div :style="style" ref="cube">
		<flux-image
			v-for="side in sides"
			v-if="sideDefined(side)"
			:key="side"
			:size="getSideSize(side)"
			:image="getSideImage(side)"
			:color="getSideColor(side)"
			:css="getSideCss(side)"
			:ref="side">
		</flux-image>
	</div>
</template>

<script>
	import DomHelper from '@/libraries/DomHelper.js';
	import FluxImage from '@/components/FluxImage.vue';

	const rotate = {
		x: {
			top: '90',
			bottom: '-90',
		},

		y: {
			back: '180',
			left: '-90',
			right: '90',
		},
	};

	const translate = {
		x: {
			left: '-50',
			right: '50',
		},

		y: {
			top: '-50',
			bottom: '50',
		},
	};

	export default {
		name: 'FluxCube',

		components: {
			FluxImage,
		},

		data: () => ({
			mounted: false,
			sides: [ 'front', 'top', 'back', 'bottom', 'left', 'right' ],
			baseStyle: {
				position: 'absolute',
				top: 0,
				left: 0,
				overflow: 'visible',
				transformStyle: 'preserve-3d',
			},
		}),

		props: {
			size: {
				type: Object,
				default: () => ({}),
			},

			images: {
				type: Object,
				default: () => ({}),
			},

			color: {
				type: [ String, Object ],
				default: () => ({}),
			},

			css: {
				type: Object,
				default: () => ({}),
			},
		},

		computed: {
			viewSize() {
				if (this.size.width && this.size.height)
					return this.size;

				if (!this.mounted)
					return {};

				let parentSize = DomHelper.sizeFrom(this.$el.parentNode);

				return {
					width: this.size.width || parentSize.width,
					height: this.size.height || parentSize.height,
				};
			},

			sizeStyle() {
				let size = {
					width: this.viewSize.width || '100%',
					height: this.viewSize.height || '100%',
				};

				if (/[0-9]$/.test(size.width))
					size.width += 'px';

				if (/[0-9]$/.test(size.height))
					size.height += 'px';

				return size;
			},

			style() {
				return {
					...this.baseStyle,
					...this.sizeStyle,
					...this.css,
				};
			},
		},

		mounted() {
			this.mounted = true;
		},

		methods: {
			sideDefined(side) {
				if (this.images[side] || this.color[side])
					return true;

				return false;
			},

			getSide(side) {
				return this.sideDefined(side)? this.$refs[side] : undefined;
			},

			getSideImage(side) {
				if (this.images[side])
					return this.images[side];

				return undefined;
			},

			getSideSize(side) {
				return this.viewSize;
			},

			getSideColor(side) {
				if (this.color && typeof this.color === 'string')
					return this.color;

				if (this.color && this.color[side])
					return this.color[side];

				return undefined;
			},

			getSideCss(side) {
				let css = {};

				if (this.sideDefined(side)) {
					if (this.css.top) {
						css.top = this.css.top;

						if (side === 'back')
							css.top = css.top[0] === '-'? css.top.substr(1) : '-'+ css.top;
					}

					if (this.css.left) {
						css.left = this.css.left;

						if (side === 'back')
							css.left = css.left[0] === '-'? css.left.substr(1) : '-'+ css.left;
					}
				}

				translate.z = {
					top: this.size.height,
					bottom: this.size.height,
					left: this.size.width,
					right: this.size.width,
				};

				css.transform = this.getTransform(side);

				return css;
			},

			getTransform(side) {
				let translateZ = {
					top: this.viewSize.height,
					bottom: this.viewSize.height,
					left: this.viewSize.width,
					right: this.viewSize.width,
				};

				let rx = rotate.x[side] || '0';
				let ry = rotate.y[side] || '0';
				let tx = translate.x[side] || '0';
				let ty = translate.y[side] || '0';
				let tz = translateZ[side] / 2 || '0';

				return 'rotateX('+ rx +'deg) rotateY('+ ry +'deg) translate3d('+ tx +'%, '+ ty +'%, '+ tz +'px)';
			},

			setCss(css) {
				this.baseStyle = {
					...this.baseStyle,
					...css,
				};
			},

			transform(css) {
				this.$nextTick(() => {
					this.$refs.cube.clientHeight;
					this.setCss(css);
				});
			},

			turn(side) {
				this.transform({
					transform: this.getTransform(side),
				});
			},

			turnTop() {
				this.turn('top');
			},

			turnBottom() {
				this.turn('bottom');
			},

			turnLeft() {
				this.turn('left');
			},

			turnRight() {
				this.turn('right');
			},
		}
	};
</script>
