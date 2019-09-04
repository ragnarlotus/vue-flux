<template>
	<div>
		<flux-image
			ref="image"
			:image="images.front"
			:size="size"
			:css="imageCss"
		/>
		<flux-cube
			ref="cube"
			:images="images"
			:size="size"
			:css="cubeCss"
			:sides-css="cubeSidesCss"
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
			images: {},
			imageCss: {},
			cubeCss: {
				transformOrigin: 'left center',
			},
			cubeSidesCss: {
				back: {
					backgroundPositionX: 0,
				},
			},
		}),

		created() {
			let widthPx = (this.size.width / 2) +'px';

			this.imageCss.width = widthPx;

			Object.assign(this.cubeCss, {
				left: widthPx,
				width: widthPx,
			});

			this.images = {
				front: this.from,
				back: this.to,
			};
		},

		mounted() {
			Object.assign(this.mask, {
				perspective: '1600px',
				overflow: 'visible',
			});

			this.$nextTick(() => {
				this.$refs.cube.transform({
					transition: `transform ${this.totalDuration}ms ${this.easing}`,
					transform: 'rotateY(-180deg)',
				});
			});
		},
	};
</script>
