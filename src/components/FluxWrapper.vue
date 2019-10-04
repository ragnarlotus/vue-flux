<template>
	<div ref="wrapper" :style="style">
		<slot />
	</div>
</template>

<script>
	import Dom from '@/libraries/Dom';

	export default {
		name: 'FluxWrapper',

		props: {
			size: {
				type: Object,
				required: true,
			},
		},

		data: () => ({
			baseStyle: {
				overflow: 'hidden',
			},
		}),

		computed: {
			sizeStyle() {
				let { width, height } = this.size;

				return {
					width: Dom.px(width),
					height: Dom.px(height),
				};
			},

			style() {
				return {
					...this.baseStyle,
					...this.sizeStyle,
				};
			},
		}
	};
</script>
