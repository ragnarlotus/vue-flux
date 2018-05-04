<template>
	<div :style="style" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data: () => ({
			style: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				zIndex: 12
			}
		}),

		methods: {
			setCss(css) {
				this.style = Object.assign({}, this.style, css);
			},

			transform(css) {
				this.$refs.wrapper.clientHeight;

				this.$nextTick(() => {
					this.setCss(css);
				});
			}
		}
	};
</script>
