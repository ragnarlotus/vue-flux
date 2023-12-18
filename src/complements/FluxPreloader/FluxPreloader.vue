<script setup lang="ts">
	import { Ref } from 'vue';
	import { ResourceLoader } from '../../shared';

	export interface Props {
		loader: Ref<null | ResourceLoader>;
	}

	defineProps<Props>();
</script>

<template>
	<div class="preloader">
		<slot
			:loader="loader"
			:preloading="loader.value?.preLoading.length"
			:lazyloading="loader.value?.lazyLoading.length"
			:pct="loader.value?.progress"
		>
			<div v-if="loader.value?.preLoading.length" class="spinner">
				<div class="pct">{{ loader.value?.progress }}%</div>
				<div class="border" />
			</div>
		</slot>
	</div>
</template>

<style lang="scss">
	.vue-flux .preloader {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;

		.spinner {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -40px;
			margin-left: -40px;
			width: 80px;
			height: 80px;
			z-index: 14;

			.pct {
				position: absolute;
				right: 0;
				left: 0;
				height: 80px;
				line-height: 80px;
				text-align: center;
				font-weight: bold;
				z-index: 1;
			}

			.border {
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				border: 14px solid #f3f3f3;
				border-top-color: #3498db;
				border-bottom-color: #3498db;
				border-radius: 50%;
				background-color: #f3f3f3;
				animation: spin 2s linear infinite;
			}
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
</style>
