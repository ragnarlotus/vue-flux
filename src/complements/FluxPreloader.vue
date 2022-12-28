<script setup>
	import { computed } from 'vue';

	const props = defineProps({
		resources: {
			type: Object,
			required: true,
		},
	});

	const visible = computed(() => props.resources.loadProgress.value < 100);
</script>

<template>
	<div class="preloader">
		<slot name="spinner">
			<div v-if="visible" class="spinner">
				<div class="pct">{{ resources.loadProgress }}%</div>
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

		$spinner-size: 80px;

		.spinner {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -($spinner-size / 2);
			margin-left: -($spinner-size / 2);
			width: $spinner-size;
			height: $spinner-size;
			z-index: 14;

			.pct {
				position: absolute;
				right: 0;
				left: 0;
				height: $spinner-size;
				line-height: $spinner-size;
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
