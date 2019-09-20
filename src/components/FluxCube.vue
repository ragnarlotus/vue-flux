<template>
	<div :style="style" ref="cube">
		<flux-image
			v-for="side in definedSides"
			:key="side"
			:size="getSideSize(side)"
			:image="getSideImage(side)"
			:color="getSideColor(side)"
			:css="getSideCss(side)"
			:offset="offset || getSideOffset(side)"
			:ref="side" />
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent.js';
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

		mixins: [
			BaseComponent,
		],

		data: () => ({
			sides: [ 'front', 'back', 'top', 'bottom', 'left', 'right' ],
			baseStyle: {
				transformStyle: 'preserve-3d',
			},
		}),

		props: {
			images: {
				type: Object,
				default: () => ({}),
			},

			depth: Number,

			sidesCss: {
				type: Object,
			},

			offset: {
				type: [ Number, String, Object ],
			},
		},

		computed: {
			definedSides() {
				return this.sides.filter(side => this.sideDefined(side))
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
				return this.finalSize;
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

				if (this.sidesCss && this.sideDefined(side))
					Object.assign(css, this.sidesCss[side]);

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
		},
	};
</script>
