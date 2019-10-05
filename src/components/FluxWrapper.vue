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

			css: undefined,
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
					...this.css,
				};
			},
		},

		methods: {
			setCss(css) {
				this.css = {
					...this.css,
					...css,
				};
			},

			transform(css) {
				this.$el.clientHeight;
				this.setCss(css);
			},
		},
	};
</script>
