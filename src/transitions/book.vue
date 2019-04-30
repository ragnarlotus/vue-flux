<template>
	<div>
		<flux-image :image="images.front" :size="componentsSize" :css="imageCss" ref="image"></flux-image>
		<flux-cube :images="images" :size="componentsSize" :css="cubeCss" ref="cube"></flux-cube>
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
			totalDuration: 120000,
			easing: 'ease-out',
			pageWidth: 0,
			perspective: '1600px',
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

		computed: {
			componentsSize() {
				return {
					...this.size,
					width: this.size.width / 2,
				};
			},
		},

		created() {
			this.cubeCss.left = this.componentsSize.width +'px';
			this.images.front = this.from;
			this.images.back = this.to;
		},

		mounted() {
			this.mask.perspective = this.perspective;
			this.mask.overflow = 'visible';

			this.setCubeCss();
			this.setCubeBackCss();
/*
			this.$nextTick(() => {
				this.$refs.cube.transform({
					transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
					transform: 'rotateY(-180deg)',
				});
			});*/
		},

		methods: {
			setCubeCss() {
				this.$refs.cube.setCss({
					transformOrigin: 'right center',
				});
			},

			setCubeBackCss() {
				let backSide = this.$refs.cube.$refs.back[0];

				let backgroundPosition = backSide.style.backgroundPosition;
				let positionX = parseFloat(backgroundPosition.split(' ')[0]);

				backSide.setCss({
					backgroundPositionX: (positionX + this.pageWidth) +'px',
				});
			},
		},
	};
</script>
