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
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxCube',

		components: {
			FluxImage,
		},

		data: () => ({
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
				required: false,
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
			sizeStyle() {
				return {
					width: this.size.width +'px' || '100%',
					height: this.size.height +'px' || '100%',
				};
			},

			style() {
				return {
					...this.baseStyle,
					...this.sizeStyle,
					...this.css,
				};
			},
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
				return this.size;
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
					if (this.css.top)
						css.top = this.css.top;

					if (this.css.left)
						css.left = this.css.left;
				}

				let rotate = {
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

				let translate = {
					x: {
						left: '-50',
						right: '50',
					},

					y: {
						top: '-50',
						bottom: '50',
					},

					z: {
						top: this.size.height,
						bottom: this.size.height,
						left: this.size.width,
						right: this.size.width,
					},
				};

				css.transform = this.getTransform(rotate, translate, side);

				return css;
			},

			getTransform(rotate, translate, side) {
				let rx = rotate.x[side] || '0';
				let ry = rotate.y[side] || '0';
				let tx = translate.x[side] || '0';
				let ty = translate.y[side] || '0';
				let tz = translate.z[side] / 2 || '0';

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
				let rotate = {
					x: {
						top: '90',
						bottom: '-90',
					},

					y: {
						left: '-90',
						right: '90',
					},
				};

				let translate = {
					x: {
						left: '-50',
						right: '50',
					},

					y: {
						top: '-50',
						bottom: '50',
					},

					z: {
						top: this.size.height,
						bottom: this.size.height,
						left: this.size.width,
						right: this.size.width,
					},
				};

				this.transform({
					transform: this.getTransform(rotate, translate, side),
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
