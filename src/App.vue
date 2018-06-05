<template>
	<div id="app" class="ui container">
		<h1 class="ui aligned header">Vue flux</h1>

		<div class="ui grid">
			<div class="eleven wide column">
				<vue-flux :options="fluxOptions" :images="fluxImages" :transitions="fluxTransitions" :captions="fluxCaptions" ref="slider">
					<!--<template slot-scope="paginationItem" slot="paginationItem">{{ paginationItem.index }}</template>-->
					<!--<template slot="controls">
						<span @click="slider.showImage('previous')">PREVIOUS</span>
						<span @click="slider.toggleAutoplay()">TOGGLE</span>
						<span @click="slider.showImage('next')">NEXT</span>
					</template>-->
				</vue-flux>
			</div>

			<div class="five wide column left aligned">
				<div class="ui two item menu inverted">
					<a @click="showNext('transitionFade')" :class="transitionActive('transitionFade')" class="item">Fade</a>
					<a @click="showNext('transitionSwipe')" :class="transitionActive('transitionSwipe')" class="item">Swipe</a>
				</div>

				<div class="ui two item menu inverted">
					<a @click="showNext('transitionSlide2d')" :class="transitionActive('transitionSlide2d')" class="item">Slide 2D</a>
					<a @click="showNext('transitionSlide3d')" :class="transitionActive('transitionSlide3d')" class="item">Slide 3D</a>
				</div>

				<div class="ui three item menu inverted">
					<a @click="showNext('transitionBars2d')" :class="transitionActive('transitionBars2d')" class="item">Bars 2D</a>
					<a @click="showNext('transitionBars3d')" :class="transitionActive('transitionBars3d')" class="item">Bars 3D</a>
					<a @click="showNext('transitionZip')" :class="transitionActive('transitionZip')" class="item">Zip</a>
				</div>

				<div class="ui three item menu inverted">
					<a @click="showNext('transitionBlinds2d')" :class="transitionActive('transitionBlinds2d')" class="item">Blinds 2D</a>
					<a @click="showNext('transitionBlinds3d')" :class="transitionActive('transitionBlinds3d')" class="item">Blinds 3D</a>
					<a @click="showNext('transitionTurn3d')" :class="transitionActive('transitionTurn3d')" class="item">Turn 3D</a>
				</div>

				<div class="ui three item menu inverted">
					<a @click="showNext('transitionBlocks2d1')" :class="transitionActive('transitionBlocks2d1')" class="item">Blocks 2D <div class="detail">1</div></a>
					<a @click="showNext('transitionBlocks2d2')" :class="transitionActive('transitionBlocks2d2')" class="item">Blocks 2D 2</a>
					<a @click="showNext('transitionBlocks3d')" :class="transitionActive('transitionBlocks3d')" class="item">Blocks 3D</a>
				</div>

				<div class="ui three item menu inverted">
					<a @click="showNext('transitionConcentric')" :class="transitionActive('transitionConcentric')" class="item">Concentric</a>
					<a @click="showNext('transitionWarp')" :class="transitionActive('transitionWarp')" class="item">Warp</a>
					<a @click="showNext('transitionCamera')" :class="transitionActive('transitionCamera')" class="item">Camera</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VueFlux from './components/VueFlux.vue';
	import Transitions from './components/transitions/index.js';

	export default {
		name: 'app',

		components: {
			VueFlux
		},

		data: () => ({
			fluxOptions: {
				autoplay: true,
				showPagination: true,
				showControls: true
			},
			fluxImages: [
				'slides/1.jpg',
				'slides/2.jpg',
				'slides/3.jpg',
				'slides/4.jpg',
				'slides/5.jpg',
				'slides/6.jpg'
			],
			fluxTransitions: Transitions,
			fluxCaptions: [ 'First caption', 'Second caption', undefined, 'Fourth caption' ],
			rendered: false
		}),

		computed: {
			slider: function() {
				return this.$refs.slider;
			},

			currentTransition: function() {
				if (!this.rendered)
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

			transitionActive(transition) {
				return this.currentTransition === transition? 'active' : '';
			}
		}
	}
</script>

<style lang="scss" scoped>
	h1.ui.header {
		margin-top: 18px;
	}

	.vue-flux {
		box-shadow: 0 0 12px 2px rgba(34,36,38,.85);
	}
</style>
