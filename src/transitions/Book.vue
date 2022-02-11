<template>
	<div>
		<flux-image
			ref="from"
			:image="from"
			:size="size"
			:view-size="viewSize"
			:offset="image.offset"
			:css="image.css"
		/>
		<flux-cube
			ref="cube"
			:images="cube.images"
			:size="size"
			:view-size="viewSize"
			:offsets="cube.offsets"
			:sides-css="cube.sidesCss"
			:css="cube.css"
		/>
	</div>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxCube from '@/components/FluxCube.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionBook',

		components: {
			FluxCube,
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1200,
			easing: 'ease-out',
			viewSize: {},
			image: {
				offset: {},
				css: {
					position: 'absolute',
					top: 0,
					left: 0,
				},
			},
			cube: {
				images: {},
				offsets: {},
				css: {
					position: 'absolute',
					top: 0,
					left: 0,
				},
			},
		}),

		computed: {
			halfWidth() {
				return Math.ceil(this.size.width / 2);
			},

			halfWidthPx() {
				return this.halfWidth +'px';
			},
		},

		created() {
			Object.assign(this.mask, {
				perspective: '1600px',
				overflow: 'visible',
			});

			this.viewSize = {
				width: Math.ceil(this.size.width / 2),
				height: this.size.height,
			};

			this.cube.images = {
				front: this.from,
				back: this.to,
			};
		},

		played() {
			this.$refs.cube.transform({
				transition: `transform ${this.totalDuration}ms ${this.easing}`,
				transform: `rotateY(${this.getDeg()}deg)`,
			});
		},

		methods: {
			setupPrev() {
				this.image.offset.left = this.halfWidth;
				this.image.css.left = this.halfWidthPx;

				this.cube.offsets.back = {
					left: this.halfWidth,
				};

				this.cube.css = {
					...this.cube.css,
					transformOrigin: 'right center',
				};
			},

			setupNext() {
				this.cube.offsets.front = {
					left: this.halfWidth,
				};

				this.cube.css = {
					...this.cube.css,
					left: this.halfWidthPx,
					transformOrigin: 'left center',
				};
			},

			getDeg() {
				let sides = {
					next: '-180',
					prev: '180',
				};

				return sides[this.direction];
			}
		}
	};
</script>
