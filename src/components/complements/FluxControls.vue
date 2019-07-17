<template>
	<transition name="fade">
		<div v-if="display" class="flux-controls">
			<button class="previous" @click="vf.showImage('previous')">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<polyline fill="none" stroke="white" stroke-width="14" stroke-linejoin="round" stroke-linecap="round" points="68,12 22,50 68,88" />
				</svg>
			</button>

			<button class="play" v-if="!vf.config.autoplay" @click="vf.play('next', 1)">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<polygon fill="white" stroke="white" stroke-width="14" stroke-linejoin="round" stroke-linecap="round" points="32,12 78,50 32,88" />
				</svg>
			</button>

			<button class="pause" v-if="vf.config.autoplay" @click="vf.stop()">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<line fill="none" stroke="white" stroke-width="14" stroke-linejoin="round" stroke-linecap="round" x1="32" y1="12" x2="32" y2="88" />
					<line fill="none" stroke="white" stroke-width="14" stroke-linejoin="round" stroke-linecap="round" x1="68" y1="12" x2="68" y2="88" />
				</svg>
			</button>

			<button class="next" @click="vf.showImage('next')">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<polyline fill="none" stroke="white" stroke-width="14" stroke-linejoin="round" stroke-linecap="round" points="32,12 78,50 32,88" />
				</svg>
			</button>
		</div>
	</transition>
</template>

<script>
	import BaseComplement from '@/mixins/BaseComplement.js';

	export default {
		name: 'FluxControls',

		mixins: [
			BaseComplement,
		],

		computed: {
			display() {
				if (!this.vf)
					return false;

				if (!this.vf.loaded)
					return false;

				if (!this.vf.mouseOver)
					return false;

				return true;
			},

			autoplayClass() {
				return this.vf && this.vf.config.autoplay? 'pause' : 'play';
			},
		},
	};
</script>

<style lang="scss">
	$size: 50px;
	$smSize: $size * 0.55;
	$mdSize: $size * 0.70;
	$lgSize: $size * 0.85;

	.vue-flux .flux-controls {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		margin-top: -($size / 2);
		text-align: center;
		z-index: 100;

		&.fade-enter, &.fade-leave-to {
			opacity: 0;
		}

		&.fade-enter-active, &.fade-leave-active {
			transition: opacity 0.3s ease-in;
		}

		& > button {
			position: absolute;
			top: 0;
			width: $size;
			height: $size;
			padding: 14px;
			cursor: pointer;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.6);
			border: none;

			&:hover {
				background-color: rgba(0, 0, 0, 0.9);
			}

			@media (max-width: 576px) {
				width: $smSize;
				height: $smSize;
				background-size: 31%;
			}

			@media (min-width: 577px) and (max-width: 768px) {
				width: $mdSize;
				height: $mdSize;
				background-size: 34%;
			}

			@media (min-width: 769px) and (max-width: 992px) {
				width: $lgSize;
				height: $lgSize;
				background-size: 37%;
			}
		}

		.previous {
			left: $size / 2;
		}

		.play {
			position: relative;
			display: inline-block;
		}

		.pause {
			position: relative;
			display: inline-block;
		}

		.next {
			right: $size / 2;
			padding: 14px;
		}
	}
</style>
