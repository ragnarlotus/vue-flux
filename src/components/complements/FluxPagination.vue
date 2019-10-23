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
		margin-bottom: 0.5%;

		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin: 0;
			padding: 0;
			list-style-type: none;
			text-align: center;
			position: relative;
		}

		li {
			display: block;
			margin: 0 1% 1.5% 1%;
			cursor: pointer;
			width: 2%;
			height: 0;
			min-width: 10px;
			min-height: 10px;
			padding-bottom: 2%;
			position: relative;
			box-sizing: border-box;
		}

		.pagination-item {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			box-sizing: border-box;
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
		}
	}
</style>
