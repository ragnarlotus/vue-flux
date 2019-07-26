<template>
	<button type="button" class="flux-button" @click="$emit('click')">
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
			<circle cx="50" cy="50" r="50" />
			<svg viewBox="-28 -28 156 156">
				<slot></slot>
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
	$size: 50px;
	$smSize: $size * 0.55;
	$mdSize: $size * 0.70;
	$lgSize: $size * 0.85;

	.vue-flux .flux-button {
		position: absolute;
		margin: 0;
		padding: 0;
		width: $size;
		height: $size;
		border: 0;
		cursor: pointer;
		background-color: transparent;

		&:focus {
			outline: 0;
		}

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

		&.top {
			margin-top: -($size / 2);

			@media (max-width: 576px) {
				margin-top: -($smSize / 2);
			}

			@media (min-width: 577px) and (max-width: 768px) {
				margin-top: -($mdSize / 2);
			}

			@media (min-width: 769px) and (max-width: 992px) {
				margin-top: -($lgSize / 2);
			}
		}

		&.right {
			margin-right: -($size / 2);

			@media (max-width: 576px) {
				margin-right: -($smSize / 2);
			}

			@media (min-width: 577px) and (max-width: 768px) {
				margin-right: -($mdSize / 2);
			}

			@media (min-width: 769px) and (max-width: 992px) {
				margin-right: -($lgSize / 2);
			}
		}

		&.bottom {
			margin-bottom: -($size / 2);

			@media (max-width: 576px) {
				margin-bottom: -($smSize / 2);
			}

			@media (min-width: 577px) and (max-width: 768px) {
				margin-bottom: -($mdSize / 2);
			}

			@media (min-width: 769px) and (max-width: 992px) {
				margin-bottom: -($lgSize / 2);
			}
		}

		&.left {
			margin-left: -($size / 2);

			@media (max-width: 576px) {
				margin-left: -($smSize / 2);
			}

			@media (min-width: 577px) and (max-width: 768px) {
				margin-left: -($mdSize / 2);
			}

			@media (min-width: 769px) and (max-width: 992px) {
				margin-left: -($lgSize / 2);
			}
		}

		> svg {
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
