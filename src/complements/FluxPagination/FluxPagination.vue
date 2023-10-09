<script setup lang="ts">
	import { computed } from 'vue';
	import { Resources } from '../../repositories';
	import { ResourceIndex } from '../../repositories/Resources/types';
	import { TransitionIndex } from '../../repositories/Transitions/types';
	import { ResourceWithOptions } from '../../components';

	export interface Props {
		displayReady: boolean;
		resources: Resources;
		currentResource: null | ResourceIndex;
		currentTransition: null | TransitionIndex;
		show: Function;
	}

	const props = defineProps<Props>();

	const visible = computed<boolean>(
		() => props.displayReady === true && props.resources.list.length > 0
	);

	const getTitle = (rsc: ResourceWithOptions) => {
		return rsc.resource.caption;
	};

	const getCssClass = (index: number) => {
		const classes = ['pagination-item'];

		let active = props.currentResource?.index === index;

		if (props.currentTransition !== null) {
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
			<li v-for="(rsc, index) in resources.list" :key="index">
				<span
					:title="getTitle(rsc)"
					:class="getCssClass(index)"
					@click="show(index)"
				/>
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
