<template>
	<!-- eslint-disable -->
	<div id="app">
		<div class="container mx-auto">
			<h1 class="my-4">
				Vue flux
			</h1>

			<p>You can use arrow keys to show next image (when no transition running). Double click to switch full screen mode.</p>

			<div class="block sm:block md:block lg:flex">
				<div class="lg:w-4/6 px-2 mb-4">
					<vue-flux
						ref="slider"
						:options="vfOptions"
						:images="vfImages"
						:transitions="vfTransitions"
						:captions="vfCaptions"
					>
						<template v-slot:controls>
							<flux-controls />
						</template>
					</vue-flux>
				</div>

				<div class="lg:w-2/6 px-2 mb-4 transitions">
					<h4 class="mb-2">
						2D Transitions
					</h4>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionFade')" @click="showNext('fade')">Fade</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionKenburn')" @click="showNext('kenburn')">Kenburn</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionSwipe')" @click="showNext('swipe')">Swipe</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionSlide')" @click="showNext('slide')">Slide</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionWaterfall')" @click="showNext('waterfall')">Waterfall</a>
						</li>

						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionZip')" @click="showNext('zip')">Zip</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionBlinds2d')" @click="showNext('blinds2d')">Blinds 2D</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionBlocks1')" @click="showNext('blocks1')">Blocks 1</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionBlocks2')" @click="showNext('blocks2')">Blocks 2</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionConcentric')" @click="showNext('concentric')">Concentric</a>
						</li>

						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionWarp')" @click="showNext('warp')">Warp</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionCamera')" @click="showNext('camera')">Camera</a>
						</li>
					</ul>

					<h4 class="mt-5 mb-2">
						3D Transitions
					</h4>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionCube')" @click="showNext('cube')">Cube</a>
						</li>

						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionBook')" @click="showNext('book')">Book</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionFall')" @click="showNext('fall')">Fall</a>
						</li>
					</ul>

					<ul class="flex mb-2">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionWave')" @click="showNext('wave')">Wave</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionBlinds3d')" @click="showNext('blinds3d')">Blinds 3D</a>
						</li>
					</ul>

					<ul class="flex">
						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionRound1')" @click="showNext('round1')">Round 1</a>
						</li>

						<li class="flex-1 mr-2">
							<a :class="transitionClass('transitionRound2')" @click="showNext('round2')">Round 2</a>
						</li>

						<li class="flex-1">
							<a :class="transitionClass('transitionExplode')" @click="showNext('explode')">Explode</a>
						</li>
					</ul>
				</div>
			</div>

			<vue-cosk v-for="i of 12" :key="'a'+ i" mode="fill" style="margin-top: 24px;" />

			<h2>Relative</h2>

			<flux-parallax src="slides/01.jpg" class="flux-parallax" style="height: 200px;">
				<div>CONTENT</div>
			</flux-parallax>

			<h2 class="mt-4">
				Visible
			</h2>

			<flux-parallax src="slides/01.jpg" class="flux-parallax" type="visible" style="height: 200px;">
				<div>CONTENT</div>
			</flux-parallax>

			<h2 class="mt-4">
				Fixed
			</h2>

			<flux-parallax src="slides/01.jpg" class="flux-parallax" type="fixed" style="height: 200px;">
				<div>CONTENT</div>
			</flux-parallax>

			<vue-cosk v-for="i of 12" :key="'b'+ i" mode="fill" style="margin-top: 24px;" />
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import * as components from '@/components';
	import { VueCosk } from 'vue-cosk';

	export default {
		name: 'App',

		components: {
			...components,
			VueCosk,
		},

		data: () => ({
			rendered: false,
			baseTransitionClass: 'text-center whitespace-no-wrap block border border-grey-light rounded text-white cursor-pointer py-2 px-4 shadow-md',
			activeTransitionClass: 'bg-black',
			inactiveTransitionClass: 'bg-gray-800 hover:bg-black',
			vfOptions: {
				autohideTime: 0,
				autoplay: false,
				delay: 1500,
				bindKeys: true,
				allowFullscreen: true,
				lazyLoadAfter: 30,
			},
			vfImages: [],
/*			vfTransitions: ['camera'],*/
			vfTransitions: [
				'fade', 'kenburn',
				'swipe', 'slide',
				'waterfall', 'zip', 'blinds2d',
				'blocks1', 'blocks2',
				'concentric', 'warp', 'camera',
				'cube', 'book', 'fall',
				'wave', 'blinds3d',
				'round1', 'round2', 'explode',
			],
			vfCaptions: [],
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

				this.vfImages = [];
				this.vfCaptions = [];

				// eslint-disable-next-line no-unused-vars
				let index, src;

				for (let i = 0; i <= 6; i++) {
					//index = Math.floor(Math.random() * srcs.length);
					//src = srcs.splice(index, 1)[0];

					src = srcs[i];

					this.vfImages.push(src);
					this.vfCaptions.push(src);
				}
			},

			addImage(url, author, location) {
				this.vfImages.push(url);
				this.vfCaptions.push(location +' - '+ author);
			},

			showNext(transition) {
				this.$refs.slider.show('next', transition);
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
	};
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
