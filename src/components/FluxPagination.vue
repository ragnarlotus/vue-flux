<template>
	<nav>
		<ul>
			<li v-for="i in slider.imagesLoaded" :key="i" :class="getClass(i - 1)" @click="slider.showImage(i - 1);" :title="getTitle(i - 1)">
				<slot paginationItem name="paginationItem" :index="i">
					<span class="pagination-item"></span>
				</slot>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		props: {
			slider: { type: Object, required: true }
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	nav {
		position: absolute;
		left: 0;
		right: 0;
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
		background-color: #ffffa8;
	}

	li.active span.pagination-item {
		background-color: white;
	}
</style>
