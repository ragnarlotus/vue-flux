<template>
	<div v-if="display" class="flux-index">
		<transition name="fade">
			<flux-button v-if="displayButton" class="toggle bottom left" @click="showIndex($event)">
				<rect
					v-for="(coord, i) in coords"
					:key="i"
					:x="coord.x"
					:y="coord.y"
					:width="buttonRectSize +'px'"
					:height="buttonRectSize +'px'"
				/>
			</flux-button>
		</transition>

		<nav :class="listClass" @click="hideIndex()">
			<ul ref="index">
				<li
					v-for="(image, i) in images"
					:key="i"
					:class="thumbClass(i)"
					@click="showImage(i)"
				>
					<flux-image ref="thumbs" :image="images[i]" :size="thumbSize" :title="getCaptionText(image.initIndex)" />
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import BaseComplement from '@/mixins/BaseComplement';
	import FluxButton from '@/components/FluxButton';
	import FluxImage from '@/components/FluxImage';

	export default {
		name: 'FluxIndex',

		components: {
			FluxButton,
			FluxImage,
		},

		mixins: [
			BaseComplement,
		],

		props: {
			buttonRows: {
				type: Number,
				default: 3,
			},

			buttonCols: {
				type: Number,
				default: 3,
			},

			buttonRectSize: {
				type: Number,
				default: 12,
			},

			buttonPadding: {
				type: Number,
				default: 6,
			},
		},

		data: () => ({
			visible: false,
			rectSize: 14,
			delay: 500,
			coords: [],
		}),

		computed: {
			images() {
				if (!this.vf)
					return [];

				return this.Images.imgs;
			},

			display() {
				return this.vf && this.vf.loaded;
			},

			displayButton() {
				return this.vf.mouseOver;
			},

			listClass() {
				let listClass = '';

				if (this.visible)
					listClass += 'visible';

				if (this.vf.mouseOver)
					listClass += ' mouse-over';

				return listClass;
			},

			thumbSize() {
				let { width, height } = this.vf.size;

				width = width / 4.2;
				height = height / 4.2;

				if (width > 160) {
					const [ arWidth, arHeight ] = this.vf.config.aspectRatio.split(':');

					width = 160;
					height = width * arHeight / arWidth;
				}

				return {
					width,
					height,
				};
			}
		},

		created() {
			let rowsGap = (100 - this.buttonPadding * 2 - this.rectSize * this.buttonRows) / (this.buttonRows + 1);
			let colsGap = (100 - this.buttonPadding * 2 - this.rectSize * this.buttonCols) / (this.buttonCols + 1);

			for (let r = 0; r < this.buttonRows; r++) {
				for (let c = 0; c < this.buttonCols; c++) {
					this.coords.push({
						x: this.buttonPadding + rowsGap + rowsGap * r + this.rectSize * r,
						y: this.buttonPadding + colsGap + colsGap * c + this.rectSize * c,
					});
				}
			}
		},

		methods: {
			showIndex() {
				this.vf.stop();
				this.visible = true;

				let { index } = this.$refs;

				this.$nextTick(() => {
					index.clientHeight;
					index.style.marginTop = 0;
				});
			},

			hideIndex(imageIndex) {
				let { index } = this.$refs;

				index.clientHeight;
				index.style.marginTop = '100%';

				setTimeout(() => {
					this.visible = false;

					if (imageIndex !== undefined)
						this.showImage(imageIndex);
				}, this.delay);
			},

			thumbClass(imageIndex) {
				return this.Images.current && this.Images.current.index === imageIndex? 'current' : '';
			},

			showImage(imageIndex) {
				if (this.visible) {
					this.hideIndex(imageIndex);
					return;
				}

				if (this.Images.current.index !== imageIndex)
					this.vf.show(imageIndex);
			},
		},
	};
</script>

<style lang="scss">
	.vue-flux .flux-index {
		flex: none;
		margin-bottom: 2%;
		font-size: 0;
		text-align: center;

		.fade-enter, .fade-leave-to {
			opacity: 0;
		}

		.fade-enter-active, .fade-leave-active {
			transition: opacity 0.3s ease-in;
		}

		nav {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: block;
			margin: 0;
			overflow: hidden;
			visibility: hidden;
		}

		nav.visible {
			z-index: 101;
			visibility: visible;
		}

		ul {
			display: block;
			height: 100%;
			margin: 0;
			margin-top: 100%;
			padding: 24px 0 0 24px;
			list-style-type: none;
			text-align: center;
			overflow-y: auto;
			background-color: black;
			transition: all 0.5s linear;
			font-size: 0;
		}

		li {
			position: relative;
			display: inline-block;
			box-sizing: content-box;
			margin: 0 24px 24px 0;
			cursor: pointer;
			transition: all 0.3s ease;

			&:hover {
				box-shadow: 0px 0px 3px 2px rgba(255,255,255,0.6);
			}

			&.current {
				cursor: auto;
				border: 1px solid white;
				box-shadow: none;
			}
		}
	}
</style>
