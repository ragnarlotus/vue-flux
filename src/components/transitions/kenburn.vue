<template>
	<flux-image :slider="slider" :index="index" ref="image"></flux-image>
</template>

<script>
	import FluxImage from '../FluxImage.vue';

	export default {
		name: 'transitionKenburn',

		components: {
			FluxImage
		},

		data: () => ({
			currentImage: undefined,
			nextImage: undefined,
			totalDuration: 6000,
			easing: 'cubic-bezier(0.600, 0.040, 0.780, 0.335)',
			index: undefined
		}),

		props: {
			slider: Object
		},

		created() {
			this.currentImage = this.slider.currentImage();
			this.nextImage = this.slider.nextImage();

			this.slider.setTransitionOptions(this);

			this.index = this.currentImage.index;

			if (this.direction === 'left')
				this.index = this.nextImage.index;
		},

		mounted() {
			this.slider.mask.style.overflow = 'hidden';

			let transform = this.getTransform();

			if (this.direction !== 'left')
				this.focusIn(transform);

			else
				this.focusOut(transform);
		},

		destroyed() {
			this.slider.mask.style.overflow = 'visible';

			this.currentImage.setCss({
				transition: 'none',
				opacity: 1
			});
		},

		methods: {
			focusIn(transform) {
				this.$refs.image.setCss({
					transformOrigin: transform.originX +' '+ transform.originY,
					zIndex: 12
				});

				this.currentImage.hide();

				this.$refs.image.transform({
					transition: 'all '+ this.totalDuration +'ms '+ this.easing,
					transform: 'scale('+ transform.scale +') translate('+ transform.translateX +', '+ transform.translateY +')',
					opacity: 0
				});
			},

			focusOut(transform) {
				this.currentImage.setCss({
					transition: 'opacity '+ this.totalDuration +'ms '+ this.easing,
					opacity: 0
				});

				this.$refs.image.setCss({
					transform: 'scale('+ transform.scale +') translate('+ transform.translateX +', '+ transform.translateY +')',
					transformOrigin: transform.originX +' '+ transform.originY,
					zIndex: 11
				});

				this.$refs.image.transform({
					transition: 'all '+ this.totalDuration +'ms '+ this.easing,
					transform: 'scale(1) translate(0, 0)'
				});
			},

			getTransform() {
				let origin = Math.floor((Math.random() * 4) + 1);

				if (origin === 1) {
					return {
						scale: '2',
						translateX: '-50%',
						translateY: '-50%',
						originX: 'top',
						originY: 'left'
					};
				}

				if (origin === 2) {
					return {
						scale: '2',
						translateX: '50%',
						translateY: '-50%',
						originX: 'top',
						originY: 'right'
					};
				}

				if (origin === 3) {
					return {
						scale: '2',
						translateX: '-50%',
						translateY: '50%',
						originX: 'bottom',
						originY: 'left'
					};
				}

				return {
					scale: '2',
					translateX: '50%',
					translateY: '50%',
					originX: 'bottom',
					originY: 'right'
				};
			}
		}
	};
</script>
