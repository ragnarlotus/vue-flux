<template>
	<!-- eslint-disable -->
	<div id="app">
		<div class="container mx-auto">
			<!--<flux-image :image="vfImages[0]" :size="{width:300, height: 150}" />
			<flux-cube :images="{ front: vfImages[0], right: vfImages[1], left: vfImages[2]}" :size="{width:300, height: 150}" />
			<flux-grid :image="vfImages[0]" :size="{width:300, height: 150}" />-->

			<h1 class="my-4">
				Vue flux
			</h1>

			<p>You can use arrow keys to show next image (when no transition running). Double click to switch full screen mode.</p>

			<div class="block sm:block md:block lg:flex">
				<div class="lg:w-3/4 px-2 mb-4">
					<vue-flux
						ref="slider"
						:options="vfOptions"
						:images="vfImages"
						:transitions="vfTransitions"
						:captions="vfCaptions"
					>
						<template v-slot:controls>
							<flux-controls />
						</template>

						<template v-slot:preloader>
							<flux-preloader />
						</template>

						<template v-slot:caption>
							<flux-caption v-slot="captionProps" />
						</template>

						<template v-slot:controls>
							<flux-controls />
						</template>

						<template v-slot:pagination>
							<flux-pagination />
						</template>

						<template v-slot:index>
							<flux-index />
						</template>
					</vue-flux>
				</div>

				<div class="lg:w-1/4 px-2 mb-4">
					<div>
						Transition: <select v-model="selectedTransition">
							<option
								v-for="transition in transitions"
								:key="transition"
							>{{ transition }}</option>
						</select>
					</div>

					<button @click="loadImages()">Update images</button>
				</div>
			</div>

			<vc-paragraph v-for="i of 12" :key="'a'+ i" mode="fill" style="margin-top: 24px;" />

			<h2>Relative</h2>

			<flux-parallax src="slides/01.jpg" class="flux-parallax" style="height: 200px;">
				<div>CONTENT</div>
			</flux-parallax>

			<h2 class="mt-4">
				Visible
			</h2>

			<flux-parallax src="slides/01.jpg" class="flux-parallax" type="visible" style="height: 200px;">
				<div>CONTENT</div>
			</flux-parallax>

			<h2 class="mt-4">
				Fixed
			</h2>

			<flux-parallax src="slides/01.jpg" class="flux-parallax" type="fixed" style="height: 200px;">
				<div>CONTENT</div>
			</flux-parallax>

			<vc-paragraph v-for="i of 12" :key="'b'+ i" mode="fill" style="margin-top: 24px;" />
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import * as components from '@/components';
	import { VcParagraph } from 'vue-cosk';

	export default {
		name: 'App',

		components: {
			...components,
			VcParagraph,
		},

		data: () => ({
			rendered: false,
			transitions: [
				'fade', 'kenburn',
				'swipe', 'slide',
				'waterfall', 'zip', 'blinds2d',
				'blocks1', 'blocks2',
				'concentric', 'warp', 'camera',
				'cube', 'book', 'fall',
				'wave', 'blinds3d',
				'round1', 'round2', 'explode',
			],
			selectedTransition: 'fade',
			vfOptions: {
				autohideTime: 0,
				autoplay: false,
				enableGestures: true,
				delay: 1500,
				bindKeys: true,
				allowFullscreen: true,
				lazyLoadAfter: 30,
			},
			vfImages: [],
			vfCaptions: [],
		}),

		computed: {
			vfTransitions() {
				return [this.selectedTransition];
			},
		},

		created() {
			this.loadImages();
		},

		methods: {
			loadImages() {
				// https://unsplash.com/t/nature

				let srcs = [];
				for (let i = 1; i <= 32; i++) {
					srcs.push(`slides/${i.toString().padStart(2, '0')}.jpg`);
				}

				this.vfImages = [];
				this.vfCaptions = [];

				let index, src;

				for (let i = 0; i < 12; i++) {
					index = Math.floor(Math.random() * srcs.length);

					src = srcs.splice(index, 1)[0];
					//src = srcs[i];

					this.vfImages.push(src);
					this.vfCaptions.push(src);
				}
			},

			addImage(url, author, location) {
				this.vfImages.push(url);
				this.vfCaptions.push(location +' - '+ author);
			},

			showNext(transition) {
				this.$refs.slider.show('next', transition);
			},
		}
	};
</script>

<style lang="scss" scoped>
	.vue-flux {
		box-shadow: 0 0 12px 2px rgba(34,36,38,.85);
	}

	.flux-parallax {
		display: flex;
		position: relative;
		font-size: 3rem;
		color: white;
		font-weight: bold;
		justify-content: center;
		align-items: center;
		text-shadow:
			-2px -2px 0 black,
			2px -2px 0 black,
			-2px  2px 0 black,
			2px  2px 0 black;
	}

	p {
		margin: 24px 0;
	}
</style>
