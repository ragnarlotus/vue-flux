<template>
	<div :style="[style2,css]">
		<img :src="imageSrc" @load="loaded" style="display: none;">
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent.js';

	export default {
		name: 'FluxImage',

		mixins: [
			BaseComponent,
		],

		data: () => ({
			srcSize: undefined,
			style2: {
				visibilty: 'hidden'
			},
		}),

		props: {
			image: [ String, Object ],

			offset: {
				type: [ Number, String, Object ],
				default: 'auto',
			},
		},

		computed: {
			imageSrc() {
				if (!this.image)
					return;

				return this.image.src || this.image;
			},

			// imageOriginalSize() {
			// 	if (!this.image)
			// 		return;

			// 	return this.image.size || this.srcSize;
			// },

			// colorStyle() {
			// 	return {
			// 		backgroundColor: this.color,
			// 	};
			// },

			// imageStyle() {
			// 	if (!this.imageSrc) {
			// 		return {
			// 			backgroundImage: 'none',
			// 		};
			// 	}

			// 	let originalSize = this.imageOriginalSize;
			// 	let finalSize = this.finalSize;

			// 	if (!originalSize || !finalSize)
			// 		return {};

			// 	let image = {
			// 		...originalSize,
			// 		top: 0,
			// 		left: 0,
			// 		src: `url("${this.imageSrc}")`,
			// 	};

			// 	if (image.height / image.width >= finalSize.height / finalSize.width) {
			// 		image.height = finalSize.width * image.height / image.width;
			// 		image.width = finalSize.width;
			// 		image.top = (finalSize.height - image.height) / 2;

			// 	} else {
			// 		image.width = finalSize.height * image.width / image.height;
			// 		image.height = finalSize.height;
			// 		image.left = (finalSize.width - image.width) / 2;
			// 	}

			// 	['width', 'height'].forEach(prop => {
			// 		image[prop] = Math.ceil(image[prop]);
			// 	});

			// 	['top', 'left'].forEach(side => {
			// 		image[side] = Math.floor(image[side]);

			// 		let offset = 0;

			// 		if ((this.offset === 'auto' || this.offset[side] === 'auto'))
			// 			offset = /^-?[0-9]/.test(this.css[side])? -parseFloat(this.css[side]) : 0;

			// 		else if (typeof this.offset === 'number')
			// 			offset = this.offset;

			// 		else if (this.offset[side])
			// 			offset = this.offset[side];

			// 		image[side] += parseFloat(offset);
			// 	});

			// 	return {
			// 		top: 0,
			// 		left: 0,
			// 		backgroundImage: image.src,
			// 		backgroundSize: `${image.width}px ${image.height}px`,
			// 		backgroundPosition: `${image.left}px ${image.top}px`,
			// 		backgroundRepeat: this.css.backgroundRepeat || 'no-repeat',
			// 	};
			// },

			// style() {
			// 	return {
			// 		...this.baseStyle,
			// 		...this.sizeStyle,
			// 		...this.colorStyle,
			// 		...this.imageStyle,
			// 		...this.css,
			// 	};
			// },
		},

		methods: {
			
			loaded(){
				if (this.imageSrc){
					this.$set(this.style2, 'backgroundImage', 'url('+this.imageSrc+')')
					this.$set(this.style2, 'visibility', 'visible')
					this.$emit('ready')
				}
			}, 
			
			getProperties() {
				return {
					size: this.viewSize,
					image: {
						src: this.imageSrc,
						size: this.imageSize,
					},
				};
			},

			setSrcSize() {
				let img = this.$el.firstChild;

				if (img === undefined)
					return;

				this.srcSize = {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height,
				};
			},

			show() {
				this.setCss({
					visibility: 'visible'
				});
			},

			hide() {
				this.setCss({
					visibility: 'hidden'
				});
			},
		},
	};
</script>


	<style scoped>
	div {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		/*will-change: filter, opacity, transform;*/
		background-size: cover;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}
</style>

<style lang="scss" scoped>
img {
	position: absolute;
	display: none;
}
</style>

