<script setup lang="ts">
	import { shallowReactive } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import { VueFlux } from '../components';
	import { FluxPreloader } from '../complements';
	import { Img } from '../resources';
	import { Book, Zip } from '../transitions';

	const options = shallowReactive({
		autoplay: false,
	});

	const rscs = shallowReactive([
		new Img(`/images/01.jpg`, 'img 01'),
		new Img(`/images/02.jpg`, 'img 02'),
		new Img(`/images/03.jpg`, 'img 03'),
		new Img(`/images/04.jpg`, 'img 04'),
		new Img(`/images/05.jpg`, 'img 05'),
		new Img(`/images/06.jpg`, 'img 06'),
		new Img(`/images/07.jpg`, 'img 07'),
		new Img(`/images/08.jpg`, 'img 08'),
		new Img(`/images/09.jpg`, 'img 09'),
		new Img(`/images/10.jpg`, 'img 10'),
		new Img(`/images/11.jpg`, 'img 11'),
		new Img(`/images/12.jpg`, 'img 12'),
		new Img(`/images/13.jpg`, 'img 13'),
		new Img(`/images/14.jpg`, 'img 14'),
		new Img(`/images/15.jpg`, 'img 15'),
	]);

	const transitions = shallowReactive([Book, Zip]);
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<VueFlux :options="options" :rscs="rscs" :transitions="transitions">
			<template #preloader="preloaderProps">
				<FluxPreloader v-bind="preloaderProps" />
			</template>
		</VueFlux>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<VueFlux :options="options" :rscs="rscs" :transitions="transitions">
			<template #preloader="preloaderProps">
				<FluxPreloader v-bind="preloaderProps">
					<template #default="props">
						<div v-if="props.preloading" class="custom-spinner">
							{{ props.pct }} %
						</div>
					</template>
				</FluxPreloader>
			</template>
		</VueFlux>

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>

<style lang="scss">
	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}

	.custom-spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		text-align: center;
		line-height: 50px;
		margin-top: -25px;
		margin-left: -25px;
		width: 50px;
		height: 50px;
		z-index: 14;

		&:before {
			content: '';
			box-sizing: border-box;
			position: absolute;
			top: 50%;
			left: 50%;
			width: 50px;
			height: 50px;
			margin-top: -25px;
			margin-left: -25px;
			border-radius: 50%;
			border: 1px solid #ccc;
			border-top-color: #07d;
			animation: spinner 0.6s linear infinite;
		}
	}
</style>
