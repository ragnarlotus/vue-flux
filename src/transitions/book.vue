<template>
	<div>
		<flux-image
			ref="from"
			:image="from"
			:size="size"
			:style="image.style"
		/>
		<flux-cube
			ref="cube"
			:images="cube.images"
			:size="size"
			:offset="cube.offset"
			:sides-css="cube.sidesCss"
			:style="cube.style"
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
			totalDuration: 1200000,
			easing: 'ease-out',
			image: {
				style: undefined,
			},
			cube: {
				images: undefined,
				offset: undefined,
				sidesCss: {
					front: undefined,
					back: undefined,
				},
				style: undefined,
			},
		}),

		created() {
			Object.assign(this.mask, {
				perspective: '1600px',
				overflow: 'visible',
			});

			let width = this.size.width / 2;
			let widthPx = width +'px';

			this.image.style = {
				width: widthPx,
			};

			this.cube.images = {
				front: this.from,
				back: this.to,
			};

			this.cube.offset = {
				left: 0,
				top: 0,
			};

			this.cube.sidesCss.front = {
				width: widthPx,
			};

			this.cube.sidesCss.back = {
				width: widthPx,
			};

			this.cube.style = {
				position: 'absolute',
				top: 0,
				left: widthPx,
				width: widthPx,
				height: this.size.height +'px',
				transformOrigin: 'left center',
			};
		},

		played() {
			this.$refs.cube.transform({
				transition: `transform ${this.totalDuration}ms ${this.easing}`,
				transform: 'rotateY(-180deg)',
			});
		},
	};
</script>
