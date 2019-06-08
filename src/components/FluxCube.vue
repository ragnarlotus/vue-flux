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
			:offset="getSideOffset(side)"
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
			sides: [ 'front', 'back', 'top', 'bottom', 'left', 'right' ],
			baseStyle: {
				position: 'absolute',
				top: 0,
				left: 0,
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

			depth: Number,

			css: {
				type: Object,
				default: () => ({}),
			},
		},

		computed: {
			viewSize() {
				let size = {
					...this.imageFinalSize,
				};

				if (this.css.width)
					size.width = parseFloat(this.css.width);

				if (this.css.height)
					size.height = parseFloat(this.css.height);

				return size;
			},

			imageFinalSize() {
				if (this.size.width && this.size.height) {
					return {
						...this.size,
					};
				}

				if (!this.mounted)
					return undefined;

				let parentSize = DomHelper.sizeFrom(this.$el.parentNode);

				return {
					width: this.size.width || parentSize.width,
					height: this.size.height || parentSize.height,
				};
			},

			sizeStyle() {
				let size = {
					width: this.imageFinalSize.width || '100%',
					height: this.imageFinalSize.height || '100%',
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

			translateZ() {
				let size = this.viewSize;

				return {
					top: size.height / 2,
					bottom: size.height / 2,
					left: (this.depth || size.width) / 2,
					right: -(this.depth || size.width) / 2 + this.viewSize.width,
				};
			}
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
				return this.images[side];
			},

			getSideSize(side) {
				return this.imageFinalSize;
			},

			getSideColor(side) {
				if (this.color && typeof this.color === 'string')
					return this.color;

				if (this.color && this.color[side])
					return this.color[side];

				return undefined;
			},

			getSideCss(side) {
				let css = {
					...this.viewSize,
				};

				if (this.depth && ['left', 'right'].includes(side))
					css.width = this.depth;

				css.width += 'px';
				css.height += 'px';

				css.transform = this.getTransform(side);

				return css;
			},

			getSideOffset(side) {
				let offset = {};

				if (this.css.top)
					offset.top = -parseFloat(this.css.top);

				if (this.css.left)
					offset.left = -parseFloat(this.css.left);

				return offset;
			},

			getTransform(side) {
				let rx = rotate.x[side] || 0;
				let ry = rotate.y[side] || 0;
				let tx = translate.x[side] || 0;
				let ty = translate.y[side] || 0;
				let tz = this.translateZ[side] || 0;

				return `rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}%, ${ty}%, ${tz}px)`;
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

			turnBack() {
				this.turn('back');
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
