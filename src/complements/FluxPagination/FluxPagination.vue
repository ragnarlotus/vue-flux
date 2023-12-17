<script setup lang="ts">
	import { computed } from 'vue';
	import { ResourceWithOptions } from '../../resources';
	import { Player } from '../../controllers';

	export interface Props {
		player: Player;
	}

	const props = defineProps<Props>();

	const {
		player: { resources, resource, transition },
	} = props;

	const visible = computed<boolean>(() => resources.list.length > 0);

	const getTitle = (rsc: ResourceWithOptions) => {
		return rsc.resource.caption;
	};

	const getCssClass = (index: number, itemCLass: string) => {
		const classes = [itemCLass];

		let active = resource.current?.index === index;

		if (transition.current !== null) {
			active = false;
		}

		if (active === true) {
			classes.push('active');
		}

		return classes;
	};
</script>

<template>
	<nav v-if="visible" class="flux-pagination">
		<ul>
			<li v-for="(rsc, index) in player.resources.list" :key="index">
				<slot
					:index="index"
					:rsc="rsc"
					:title="getTitle(rsc)"
					:css-class="getCssClass(index, 'custom-pagination-item')"
				>
					<span
						:title="getTitle(rsc)"
						:class="getCssClass(index, 'pagination-item')"
						@click="player.show(index)"
					/>
				</slot>
			</li>
		</ul>
	</nav>
</template>

<style lang="scss">
	.vue-flux .flux-pagination {
		flex: none;

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
			transition:
				background-color 0.2s ease-in,
				border 0.2s ease-in;

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
