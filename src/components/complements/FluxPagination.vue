<template>
	<nav v-if="display" class="flux-pagination">
		<ul>
			<li v-for="i in vf.Images.srcs.length" :key="i">
				<slot item="getItem(i - 1)">
					<span :title="getTitle(i - 1)" @click="showImage(i - 1)" @touchend="showImage(i - 1, $event)" :class="getClass(i - 1)" class="pagination-item"></span>
				</slot>
			</li>
		</ul>
	</nav>
</template>

<script>
	import BaseComplement from '@/mixins/BaseComplement.js';

	export default {
		name: 'FluxPagination',

		mixins: [
			BaseComplement,
		],

		computed: {
			display() {
				if (!this.vf)
					return false;

				return true;
			},

			currentTransition() {
				return this.vf.Transitions.current;
			},

			currentImageIndex() {
				let currentImage = this.vf.Images.current;

				if (currentImage === undefined)
					return undefined;

				return currentImage.index;
			},

			nextImageIndex() {
				let nextImage = this.vf.Images.next;

				return nextImage.index;
			},
		},

		methods: {
			getItem(i) {
				return {
					index: i,
					title: this.getTitle(i),
					onClick: this.showImage,
					active: this.getClass(i) === 'active',
				};
			},

			getClass(i) {
				if (this.currentTransition !== undefined && this.vf.Images.previousIndex === i)
					return 'active';

				if (this.currentTransition === undefined && this.vf.Images.currentIndex === i)
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
			},
		},
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

			span.pagination-item {
				display: inline-block;
				width: 16px;
				height: 16px;
				border: 2px solid #fff;
				border-radius: 50%;
				background-color: rgba(0, 0, 0, 0.7);
				transition: background-color 0.2s ease-in, border 0.2s ease-in;

				&:hover {
					border: 2px solid black;
					background-color: white;
				}

				&.active {
					background-color: white;
				}
			}
		}
	}
</style>
