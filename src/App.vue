<template>
	<div id="app">
		<div class="container mx-auto">
			<h1 class="my-4">Vue flux</h1>

			<p>You can use arrow keys to show next image (when no transition running). Double click to switch full screen mode.</p>

			<div class="sm:block md:block lg:flex xl:flex">
				<div class="lg:w-3/5 px-2 mb-4">
					<vue-flux :options="fluxOptions" :images="fluxImages" :transitions="fluxTransitions" :captions="fluxCaptions" ref="slider">
					</vue-flux>
				</div>

				<div class="lg:w-2/5 px-2 mb-4 transitions">
					<h4 class="mb-2">2D Transitions</h4>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionFade')" @click="showNext('transitionFade')">Fade</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionKenburn')" @click="showNext('transitionKenburn')">Kenburn</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionSwipe')" @click="showNext('transitionSwipe')">Swipe</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionSlide')" @click="showNext('transitionSlide')">Slide</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionWaterfall')" :class="transitionClass('transitionWaterfall')">Waterfall</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('transitionZip')" :class="transitionClass('transitionZip')">Zip</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionBlinds2d')" :class="transitionClass('transitionBlinds2d')">Blinds 2D</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionBlocks1')" :class="transitionClass('transitionBlocks1')">Blocks 1</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionBlocks2')" :class="transitionClass('transitionBlocks2')">Blocks 2</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionConcentric')" :class="transitionClass('transitionConcentric')">Concentric</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('transitionWarp')" :class="transitionClass('transitionWarp')">Warp</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionCamera')" :class="transitionClass('transitionCamera')">Camera</a>
						</li>
					</ul>

					<h4 class="mt-5 mb-2">3D Transitions</h4>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionCube')" @click="showNext('transitionCube')">Cube</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('transitionBook')" :class="transitionClass('transitionBook')">Book</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionFall')" :class="transitionClass('transitionFall')">Fall</a>
						</li>
					</ul>

					<ul class="list-reset flex mb-2">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionWave')" :class="transitionClass('transitionWave')">Wave</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionBlinds3d')" :class="transitionClass('transitionBlinds3d')">Blinds 3D</a>
						</li>
					</ul>

					<ul class="list-reset flex">
						<li class="flex-1 mr-2">
							<a @click="showNext('transitionRound1')" :class="transitionClass('transitionRound1')">Round 1</a>
						</li>

						<li class="flex-1 mr-2">
							<a @click="showNext('transitionRound2')" :class="transitionClass('transitionRound2')">Round 2</a>
						</li>

						<li class="flex-1">
							<a @click="showNext('transitionExplode')" :class="transitionClass('transitionExplode')">Explode</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VueFlux from './components/VueFlux.vue';
	import FluxCaption from './components/FluxCaption.vue';
	import FluxControls from './components/FluxControls.vue';
	import FluxIndex from './components/FluxIndex.vue';
	import FluxPagination from './components/FluxPagination.vue';
	import Transitions from '@/transitions/index.js';
	import FluxParallax from './components/FluxParallax.vue';

	export default {
		name: 'app',

		components: {
			VueFlux,
			FluxCaption,
			FluxControls,
			FluxIndex,
			FluxPagination,
			FluxParallax
		},

		data: () => ({
			rendered: false,
			baseTransitionClass: 'text-center whitespace-no-wrap block border border-grey-light rounded text-white cursor-pointer py-2 px-4 shadow-md',
			activeTransitionClass: 'bg-black',
			inactiveTransitionClass: 'bg-grey-darkest hover:bg-black',
			fluxOptions: {
				autoplay: false,
				bindKeys: true,
				fullscreen: true
			},
			fluxImages: [
				'slides/1.jpg',
				'slides/2.jpg',
				'slides/3.jpg',
				'slides/4.jpg',
				'slides/5.jpg',
				'slides/6.jpg',
			],
			fluxTransitions: Transitions,
			fluxCaptions: [ 'First caption', 'Second caption', undefined, 'Fourth caption' ]
		}),

		computed: {
			currentTransition: function() {
				if (!this.rendered || !this.$refs.slider || !this.$refs.slider.transition)
					return undefined;

				return this.$refs.slider.transition.current;
			}
		},

		mounted() {
			this.rendered = true;
		},

		methods: {
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
