<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '../FluxGrid.vue';

	export default {
		components: {
			FluxGrid
		},

		data: () => ({
			index: {},
			numRows: 1,
			numCols: 0,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'ease-out',
			tileDelay: 150,
		}),

		props: {
			slider: Object,
			direction: String
		},

		computed: {
			grid: function() {
				return this.$refs.grid;
			}
		},

		created() {
			this.index = {
				front: this.slider.currentImage.index,
				left: '#333',
				right: '#333'
			};

			if (this.direction === 'right')
				this.index.top = this.slider.nextImage.index;

			else
				this.index.bottom = this.slider.nextImage.index;

			this.numCols = parseInt(this.slider.size.width / 90);
			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;
		},

		mounted() {
			this.slider.currentImage.hide();
			this.slider.nextImage.hide();

			this.grid.setCss({
				perspective: '1200px'
			});

			this.grid.transform((tile, i) => {
				let delay = this.tileDelay * (this.direction === 'right'? i : this.numCols - i - 1);

				let t;

				if (this.direction === 'right') {
					t = {
						rx: '-90',
						ty: Math.ceil(this.slider.size.height / 2),
						tz: Math.ceil(this.slider.size.height / 2)
					};

				} else {
					t = {
						rx: '90',
						ty: '-'+ Math.ceil(this.slider.size.height / 2),
						tz: Math.ceil(this.slider.size.height / 2)
					};
				}

				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ delay +'ms',
					transform: 'rotateX('+ t.rx +'deg) translate3d(0, '+ t.ty +'px, '+ t.tz +'px)'
				});
			});
		},

		destroyed() {
			this.slider.currentImage.show();
			this.slider.nextImage.show();
		}
	};
</script>
