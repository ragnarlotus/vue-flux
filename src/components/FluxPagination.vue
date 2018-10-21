<template>
	<nav v-if="vf !== undefined" class="flux-pagination">
		<ul>
			<li v-for="i in vf.properties.length" :key="i" :class="getClass(i - 1)" @click="showImage(i - 1)" @touchend="showImage(i - 1, $event)" :title="getTitle(i - 1)">
				<span class="pagination-item"></span>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		props: {
			slider: { type: Object }
		},

		computed: {
			vf: function() {
				if (this.slider)
					return this.slider;

				if (this.$parent.$options.name === 'VueFlux')
					return this.$parent.loaded? this.$parent : undefined;

				console.warn('slider not referenced, check https://github.com/deulos/vue-flux/wiki/FluxPagination for help');

				return undefined;
			},

			currentTransition: function() {
				return this.vf.transition.current;
			},

			currentImageIndex: function() {
				let currentImage = this.vf.currentImage();

				if (currentImage === undefined)
					return undefined;

				return currentImage.index;
			},

			nextImageIndex: function() {
				let nextImage = this.vf.nextImage();

				return nextImage.index;
			}
		},

		methods: {
			getClass(i) {
				if (this.currentTransition !== undefined && this.nextImageIndex === i)
					return 'active';

				if (this.currentTransition === undefined && this.currentImageIndex === i)
					return 'active';

				return '';
			},

			getTitle(i) {
				return this.vf.captions[i] || '';
			},

			showImage(index, event) {
				this.vf.showImage(index);

				if (event)
					event.preventDefault();
			}
		}
	};
</script>

<style lang="scss">
	.vue-flux .flux-pagination {
		position: absolute;
		left: 50px;
		right: 50px;
		bottom: 20px;
		z-index: 100;

		ul {
			display: block;
			margin: 0;
			padding: 0;
			list-style-type: none;
			text-align: center;
		}

		li {
			display: inline-block;
			margin: 0 8px;
			cursor: pointer;
		}

		li span.pagination-item {
			display: inline-block;
			width: 16px;
			height: 16px;
			border: 2px solid #fff;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.7);
			transition: background-color 0.2s ease-in, border 0.2s ease-in;
		}

		li span.pagination-item:hover {
			border: 2px solid black;
			background-color: white;
		}

		li.active span.pagination-item {
			background-color: white;
		}
	}
</style>
