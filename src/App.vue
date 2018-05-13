<template>
	<div id="app" class="ui container">
		<h1 class="ui aligned header">Vue flux</h1>

		<div class="ui grid">
			<div class="eleven wide column">
				<vue-flux
					:options="fluxOptions"
					:images="fluxImages"
					:transitions="fluxTransitions"
					ref="slider">
				</vue-flux>
			</div>

			<div class="five wide column left aligned">
				<div class="ui two item menu inverted">
					<a @click="showImage('transitionFade')" :class="transitionActive('transitionFade')" class="item">Fade</a>
					<a @click="showImage('transitionSwipe')" :class="transitionActive('transitionSwipe')" class="item">Swipe</a>
				</div>

				<div class="ui two item menu inverted">
					<a @click="showImage('transitionSlide2d')" :class="transitionActive('transitionSlide2d')" class="item">Slide 2D</a>
					<a @click="showImage('transitionSlide3d')" :class="transitionActive('transitionSlide3d')" class="item">Slide 3D</a>
				</div>

				<div class="ui three item menu inverted">
					<a @click="showImage('transitionBars2d')" :class="transitionActive('transitionBars2d')" class="item">Bars 2D</a>
					<a @click="showImage('transitionBars3d')" :class="transitionActive('transitionBars3d')" class="item">Bars 3D</a>
					<a @click="showImage('transitionZip')" :class="transitionActive('transitionZip')" class="item">Zip</a>
				</div>

				<div class="ui three item menu inverted">
					<a @click="showImage('transitionBlinds2d')" :class="transitionActive('transitionBlinds2d')" class="item">Blinds 2D</a>
					<a @click="showImage('transitionBlinds3d')" :class="transitionActive('transitionBlinds3d')" class="item">Blinds 3D</a>
					<a @click="showImage('transitionTurn3d')" :class="transitionActive('transitionTurn3d')" class="item">Turn 3D</a>
				</div>

				<div class="ui three item menu inverted">
					<a @click="showImage('transitionBlocks2d1')" :class="transitionActive('transitionBlocks2d1')" class="item">Blocks 2D <div class="detail">1</div></a>
					<a @click="showImage('transitionBlocks2d2')" :class="transitionActive('transitionBlocks2d2')" class="item">Blocks 2D 2</a>
					<a @click="showImage('transitionBlocks3d')" :class="transitionActive('transitionBlocks3d')" class="item">Blocks 3D</a>
				</div>

				<div class="ui three item menu inverted">
					<a @click="showImage('transitionConcentric')" :class="transitionActive('transitionConcentric')" class="item">Concentric</a>
					<a @click="showImage('transitionWarp')" :class="transitionActive('transitionWarp')" class="item">Warp</a>
					<a @click="showImage('transitionCamera')" :class="transitionActive('transitionCamera')" class="item">Camera</a>
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
				autoplay: true
			},
			fluxImages: [
				'slides/1.jpg',
				'slides/2.jpg',
				'slides/3.jpg'
			],
			fluxTransitions: Transitions,
			rendered: false
		}),

		computed: {
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
			showImage(transition) {
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
		width: 750px;
		box-shadow: 0 0 12px 2px rgba(34,36,38,.85);
	}
</style>
