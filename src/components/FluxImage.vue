<template>
	<div ref="image" class="flux-image" :style="style" />
</template>

<script>
	import { ref, reactive, computed } from 'vue';
	import Dom from '@/models/Dom.js';
	import { baseProps } from '@/mixins/BaseComponent.js';

	export default {
		name: 'FluxImage',

		props: baseProps,

		setup(props) {
			const image = ref(undefined);

			const baseStyle = reactive({
				overflow: 'hidden',
			});

			const colorStyle = computed(() => {
				if (!props.color.value)
					return {};

				return {
					backgroundColor: props.color.value,
				};
			}) ;

			return {
				image,
				baseStyle,
				colorStyle,
			};
		},


		computed: {
			imageStyle() {
				let { img } = this;

				if (!img || img.status !== 'loaded')
					return {};

				let { size, position } = img.getCoverProps(this.size || Dom.sizeFrom(this.$el));

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
