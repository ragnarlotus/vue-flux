<template>
	<div>
		<flux-cube :images="images" :css="cubeCss" ref="cube"></flux-cube>
		<flux-image :imagea="images" :css="imageCss" ref="image"></flux-image>
	</div>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxCube from '@/components/FluxCube.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'transitionBook',

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
			pageWidth: 0,
			images: {
				front: {},
				back: {},
			},
			cubeCss: {
				transformOrigin: 'left center',
			},
			imageCss: {
			},
		}),

		created() {
			let pageWidth = this.size.width / 2;

			this.cubeCss.width = this.imageCss.width = pageWidth +'px';

			this.images.front = this.from;
			this.images.back = this.to;
		},

		mounted() {
			this.mask.perspective = '1600px';

			this.$nextTick(() => {
				this.cube.transform({
					transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
					transform: 'rotateY(180deg)',
				});
			});
		},

		methods: {
			setCubeBackCss() {
				let [backgroundPositionX] = this.cube.back.style.backgroundPosition.split(' ');
				backgroundPositionX = parseFloat(backgroundPositionX);

				backgroundPositionX -= this.pageWidth;

				this.cube.back.setCss({
					backgroundPositionX: backgroundPositionX +'px',
				});
			},
		},
	};
</script>
