<template>
	<button type="button" class="flux-button" @click="$emit('click')">
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
			<circle cx="50" cy="50" r="49" />
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
	.vue-flux .flux-button {
		width: 6%;
		height: 6%;
		min-width: 15px;
		min-height: 15px;
		max-width: 40px;
		max-height: 40px;
		border: 0;
		cursor: pointer;
		background-color: transparent;
		outline: 0;

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
