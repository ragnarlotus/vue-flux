<template>
	<flux-grid v-if="css" :num-rows="numRows" :num-cols="numCols" :size="size" :css="css" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '../grid.vue';

	export default {
		data: () => ({
			numRows: 0,
			numCols: 0,
			duration: 600,
			easing: 'ease-in',
			tileDelay: 80,
			size: {},
			css: undefined
		}),

		components: {
			FluxGrid
		},

		methods: {
			run(slider, direction) {
				this.size = slider.size;
				this.numRows = 1;
				this.numCols = parseInt(this.size.width / 70);
				this.css = Object.assign({}, slider.frontImage.style);

				slider.frontImage.style.visibility = 'hidden';

				this.$nextTick(() => {
					setTimeout(() => {
						this.$refs.grid.$refs.tiles.forEach((tile, index) => {
							Object.assign(tile.style, {
								transition: 'all '+ this.duration +'ms '+ this.easing +' '+ (this.tileDelay * (direction === 'right'? index : this.numCols - index - 1)) +'ms',
								opacity: '0.1',
								transform: 'translateY('+ (index % 2 === 0? '-' : '') + slider.size.height +'px)'
							});
						});
					}, 20);
				});

				return this.tileDelay * this.numCols + this.duration;
			},

			reset(slider) {
				slider.rearImage.style.visibility = 'visible';
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
