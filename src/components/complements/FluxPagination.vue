<template>
	<nav v-if="display" class="flux-pagination">
		<ul>
			<li v-for="i in Images.srcs.length" :key="i">
				<slot item="getItem(i - 1)">
					<span
						:title="getCaptionText(i - 1)"
						class="pagination-item"
						:class="getClass(i - 1)"
						@click="show(i - 1)"
						@touchend="show(i - 1, $event)"
					/>
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
		},

		methods: {
			getItem(i) {
				return {
					index: i,
					title: this.getCaptionText(i),
					onClick: this.show,
					active: this.getClass(i) === 'active',
				};
			},

			getClass(i) {
				if (this.Transitions.current !== undefined && this.Transitions.from.index === i)
					return 'active';

				if (this.Transitions.current === undefined && this.Images.current.index === i)
					return 'active';

				return '';
			},

			show(index, event) {
				this.vf.show(index);

				if (event)
					event.preventDefault();
			},
		},
	};
</script>

<style lang="scss">
	.vue-flux .flux-pagination {
		margin-bottom: 1%;

		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin: 0;
			padding: 0;
			list-style-type: none;
			text-align: center;
		}

		li {
			margin: 1% 2%;
			cursor: pointer;
			font-size: 0;
			flex: none;
		}

		$size: 16px;
		$smSize: $size * 0.60;
		$mdSize: $size * 0.75;
		$lgSize: $size * 0.90;

		.pagination-item {
			display: inline-block;
			width: $size;
			height: $size;
			border: 2px solid #fff;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.7);
			transition: background-color 0.2s ease-in, border 0.2s ease-in;

			&:hover {
				border-color: black;
				background-color: white;
			}

			&.active {
				border-color: white;
				background-color: white;
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
		}
	}
</style>
