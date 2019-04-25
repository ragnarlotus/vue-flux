<template>
	<div :style="style" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'FluxWrapper',

		data: () => ({
			style: {
				position: 'absolute',
				overflow: 'hidden',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			},
		}),

		props: {
			css: {
				type: Object,
				default: () => ({}),
			},
		},

		watch: {
			css() {
				this.setCss(this.css);
			},
		},

		created() {
			this.setCss(this.css);
		},

		methods: {
			setCss(css) {
				this.style = {
					...this.style,
					...css,
				};
			},

			transform(css) {
				this.$nextTick(() => {
					this.$refs.wrapper.clientHeight;
					this.setCss(css);
				});
			},
		},
	};
</script>
