<template>
	<div id="app">
		<div class="container mx-auto">
			<h1 class="my-4">Vue flux</h1>

			<p>You can use arrow keys to show next image (when no transition running). Double click to switch full screen mode.</p>

			<div class="block sm:block md:block lg:flex">
				<div class="lg:w-4/6 px-2 mb-4">
					<vue-flux :options="fluxOptions" :images="fluxImages" :transitions="fluxTransitions" :captions="fluxCaptions" ref="slider">
						<template v-slot:preloader>
							<flux-preloader></flux-preloader>
						</template>

						<template v-slot:caption>
							<custom-caption :slider="$refs.slider"></custom-caption>
						</template>

						<template v-slot:controls>
							<flux-controls></flux-controls>
						</template>

						<template v-slot:pagination>
							<flux-pagination></flux-pagination>
						</template>

						<template v-slot:index>
							<flux-index></flux-index>
						</template>
					</vue-flux>
				</div>

				<div class="lg:w-2/6 px-2 mb-4 transitions">
					<h4 class="mb-2">2D Transitions</h4>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('fade')" :class="transitionClass('transitionFade')">Fade</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('kenburn')" :class="transitionClass('transitionKenburn')">Kenburn</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('swipe')" :class="transitionClass('transitionSwipe')">Swipe</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('slide')" :class="transitionClass('transitionSlide')">Slide</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('waterfall')" :class="transitionClass('transitionWaterfall')">Waterfall</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('zip')" :class="transitionClass('transitionZip')">Zip</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('blinds2d')" :class="transitionClass('transitionBlinds2d')">Blinds 2D</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('blocks1')" :class="transitionClass('transitionBlocks1')">Blocks 1</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('blocks2')" :class="transitionClass('transitionBlocks2')">Blocks 2</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('concentric')" :class="transitionClass('transitionConcentric')">Concentric</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('warp')" :class="transitionClass('transitionWarp')">Warp</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('camera')" :class="transitionClass('transitionCamera')">Camera</a>
						</li>
					</ul>

					<h4 class="mt-5 mb-2">3D Transitions</h4>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('cube')" :class="transitionClass('transitionCube')">Cube</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('book')" :class="transitionClass('transitionBook')">Book</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('fall')" :class="transitionClass('transitionFall')">Fall</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('wave')" :class="transitionClass('transitionWave')">Wave</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('blinds3d')" :class="transitionClass('transitionBlinds3d')">Blinds 3D</a>
						</li>
					</ul>

					<ul class="flex">
						<li class="flex-1 mr-2">
							<a @click="showNext('round1')" :class="transitionClass('transitionRound1')">Round 1</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('round2')" :class="transitionClass('transitionRound2')">Round 2</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('explode')" :class="transitionClass('transitionExplode')">Explode</a>
						</li>
					</ul>
				</div>
			</div>

			<h2>Relative</h2>

			<flux-parallax src="slides/01.jpg" height="300px" type="relative" offset="80%">
				<div>CONTENT</div>
			</flux-parallax>

			<h2 class="mt-4">Static</h2>

			<flux-parallax src="slides/01.jpg" height="300px" type="static" offset="80%">
				<div>CONTENT</div>
			</flux-parallax>

			<h2 class="mt-4">Fixed</h2>

			<flux-parallax src="slides/01.jpg" height="300px" type="fixed" offset="80%">
				<div>CONTENT</div>
			</flux-parallax>
		</div>
	</div>
</template>

<script>
	import VueFlux from './components/VueFlux.vue';
	import FluxParallax from './components/FluxParallax.vue';

	import FluxPreloader from './components/complements/FluxPreloader.vue';
	import FluxCaption from './components/complements/FluxCaption.vue';
	import FluxControls from './components/complements/FluxControls.vue';
	import FluxIndex from './components/complements/FluxIndex.vue';
	import FluxPagination from './components/complements/FluxPagination.vue';
	import CustomCaption from './CustomCaption.vue';

	export default {
		name: 'app',

		components: {
			VueFlux,
			FluxPreloader,
			FluxCaption,
			FluxControls,
			FluxIndex,
			FluxPagination,
			FluxParallax,
			CustomCaption,
		},

		data: () => ({
			rendered: false,
			baseTransitionClass: 'text-center whitespace-no-wrap block border border-grey-light rounded text-white cursor-pointer py-2 px-4 shadow-md',
			activeTransitionClass: 'bg-black',
			inactiveTransitionClass: 'bg-gray-800 hover:bg-black',
			fluxOptions: {
				autoplay: false,
				bindKeys: true,
				allowFullscreen: true,
				lazyLoadAfter: 5,
			},
			fluxImages: [],
			fluxTransitions: [
				'fade', 'kenburn',
				'swipe', 'slide',
				'waterfall', 'zip', 'blinds2d',
				'blocks1', 'blocks2',
				'concentric', 'warp', 'camera',
				'cube', 'book', 'fall',
				'wave', 'blinds3d',
				'round1', 'round2', 'explode',
			],
			fluxCaptions: []
		}),

		computed: {
			currentTransition: function() {
				if (!this.rendered || !this.$refs.slider || !this.$refs.slider.Transitions)
					return undefined;

				return this.$refs.slider.Transitions.current;
			}
		},

		created() {
			this.loadImages();
		},

		mounted() {
			this.rendered = true;
		},

		methods: {
			loadImages() {
				// https://unsplash.com/t/nature

				let srcs = [];
				for (let i = 1; i <= 32; i++) {
					srcs.push(`slides/${i.toString().padStart(2, '0')}.jpg`);
				}

				this.fluxImages = [];
				this.fluxCaptions = [];

				let index, src;
				for (let i = 1; i <= 10; i++) {
					index = Math.floor(Math.random() * srcs.length);
					src = srcs.splice(index, 1)[0];

					this.fluxCaptions.push(src);
					this.fluxImages.push(src);
				}
			},

			addImage(url, author, location) {
				this.fluxImages.push(url);
				this.fluxCaptions.push(location +' - '+ author);
			},

			showNext(transition) {
				this.$refs.slider.showImage('next', transition);
			},

			transitionClass(transition) {
				let tClass = this.baseTransitionClass;

				if (this.currentTransition === transition)
					tClass += ' '+ this.activeTransitionClass;

				else
					tClass += ' '+ this.inactiveTransitionClass;

				return tClass;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vue-flux {
		box-shadow: 0 0 12px 2px rgba(34,36,38,.85);
	}

	.transitions a {
		font-size: .975rem;
		transition: all .5s linear;

		&.bg-black {
			color: #ff3;
		}
	}

	.flux-parallax {
		display: flex;
		position: relative;
		font-size: 3rem;
		color: white;
		font-weight: bold;
		justify-content: center;
		align-items: center;
		text-shadow:
			-2px -2px 0 black,
			 2px -2px 0 black,
			-2px  2px 0 black,
			 2px  2px 0 black;
	}

	p {
		margin: 24px 0;
	}
</style>
