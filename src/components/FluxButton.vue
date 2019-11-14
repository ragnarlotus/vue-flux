<template>
	<button type="button" class="flux-button" style="outline: 0" @click="$emit('click')">
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
		padding: 0;
		width: 6%;
		min-width: 15px;
		min-height: 15px;
		max-width: 40px;
		max-height: 40px;
	}

	.flux-button {
		border: 0;
		cursor: pointer;
		background-color: transparent;
		outline: 0;

		&:hover {
			> svg {
				line, polyline {
					stroke: yellow;
				}

				rect, polygon {
					fill: yellow;
				}
			}
		}

		> svg {
			& * {
				cursor: pointer;
			}

			> circle {
				fill: rgba(0, 0, 0, 0.7);
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
