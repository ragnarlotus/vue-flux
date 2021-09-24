<template>
	<div class="flux-image" :style="style">
		<picture>
			<source :srcset="webpify_extension(image)" type="image/webp">
			<img :src="image" alt=""/>
		</picture>
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent';

	export default {
		name: 'FluxImage',

		mixins: [
			BaseComponent,
		],

		data: () => ({
			baseStyle: {
				overflow: 'hidden',
			},
		}),

		computed: {
			colorStyle() {
				if (!this.color)
					return {};

				return {
					backgroundColor: this.color,
				};
			},

			imageStyle() {
				let { img } = this;

				if (!img || img.status !== 'loaded')
					return {};

				let { size, position } = img.getCoverProps(this.size || this.domSize);

				if (this.offset) {
					for (let side of ['top', 'left'])
						position[side] -= this.offset[side] || 0;
				}

				return {
					// backgroundImage: `url(${this.img.src})`,
					backgroundSize: `${size.width}px ${size.height}px`,
					backgroundPosition: `${position.left}px ${position.top}px`,
					// backgroundRepeat: 'no-repeat',
				};
			},
		},
		methods: {
			webpify_extension: function(filename) {
				console.log(filename);
				const src= filename.src;
				console.log(src);
				const pngJpgOrJPEG = src.substring(src.length - 4);
				console.log(pngJpgOrJPEG);
				if(pngJpgOrJPEG === '.jpg'){
					const allBut = src.substr(0, src.length - 4);
					return allBut + '.webp'
				} else if(pngJpgOrJPEG === '.png'){
					const allBut = src.substr(0, src.length - 4);
					return allBut + '.webp'
				} else if(pngJpgOrJPEG ==='jpeg') {
					const allBut = src.substr(0, src.length - 5);
					return allBut + '.webp'
				} else{
					return filename
				}
			},
		}
	};
</script>

<style scoped>
img{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
