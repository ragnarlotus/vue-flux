<template>
	<nav v-if="slider !== undefined && slider.loaded">
		<ul>
			<li v-for="i in slider.imagesLoaded" :key="i" :class="getClass(i - 1)" @click="showImage(i - 1)" @touchend="showImage(i - 1, $event)" :title="getTitle(i - 1)">
				<span class="pagination-item"></span>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		props: {
			slider: { type: Object, required: false }
		},

		computed: {
			currentTransition: function() {
				return this.slider.transition.current;
			},

			currentImageIndex: function() {
				if (this.slider.currentImage === undefined)
					return undefined;

				return this.slider.currentImage.index;
			},

			nextImageIndex: function() {
				return this.slider.nextImage.index;
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
				return this.slider.captions[i] || '';
			},

			showImage(index, event) {
				this.slider.showImage(index);

				if (event)
					event.preventDefault();
			}
		}
	};
</script>

<style lang="scss" scoped>
	nav {
		position: absolute;
		left: 50px;
		right: 50px;
		bottom: 20px;
		z-index: 100;
	}

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
</style>
