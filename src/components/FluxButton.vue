<template>
	<button type="button" class="flux-button" @click="$emit('click')">
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
			<circle cx="50" cy="50" r="50" />
			<svg viewBox="-20 -20 140 140">
				<slot />
			</svg>
		</svg>
	</button>
</template>

<script>
	export default {
		name: 'FluxButton'
	};
</script>

<style lang="scss">
	$size: 40px;
	$smSize: $size * 0.55;
	$mdSize: $size * 0.70;
	$lgSize: $size * 0.85;

	.vue-flux .flux-button {
		width: $size;
		height: $size;
		border: 0;
		cursor: pointer;
		background-color: transparent;
		outline: 0;

		@media (max-width: 576px) {
			width: $smSize;
			height: $smSize;
		}

		@media (min-width: 577px) and (max-width: 768px) {
			width: $mdSize;
			height: $mdSize;
		}

		@media (min-width: 769px) and (max-width: 992px) {
			width: $lgSize;
			height: $lgSize;
		}

		> svg {
			& * {
				cursor: pointer;
			}

			> circle {
				fill: rgba(0, 0, 0, 0.7);
			}

			&:hover > circle {
				fill: rgba(0, 0, 0, 0.9);
			}

			line, polyline, rect, polygon {
				stroke-linecap: round;
				stroke-linejoin: round;
				stroke: white;
				stroke-width: 14;
				fill: none;
			}

			rect, polygon {
				fill: white;
				stroke-width: 0;
			}
		}
	}
</style>
