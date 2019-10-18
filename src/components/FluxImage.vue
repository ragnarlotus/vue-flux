<template>
	<div :style="style" />
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

			loaded() {
				let { status = this.img.status } = this;

				return this.img && status === 'loaded';
			},

			imageStyle() {
				if (!this.loaded)
					return {};

				let { size, position } = this.img.getCoverProps(this.size || this.domSize);

				if (this.offset) {
					for (let side of ['top', 'left'])
						position[side] -= this.offset[side] || 0;
				}

				return {
					backgroundImage: `url(${this.img.src})`,
					backgroundSize: `${size.width}px ${size.height}px`,
					backgroundPosition: `${position.left}px ${position.top}px`,
					backgroundRepeat: 'no-repeat',
				};
			},
		},
	};
</script>
