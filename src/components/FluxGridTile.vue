<template>
	<div :style="style" ref="tile"></div>
</template>

<script>
	export default {
		name: 'VueFluxTile',

		data: () => ({
			style: {},
		}),

		props: {
			css: Object
		},

		created() {
			this.style = Object.assign({}, this.css);
		},

		methods: {
			transform(css) {
				this.$refs.tile.clientHeight;

				this.$nextTick(() => {
					this.style = Object.assign({}, this.style, css);
				});
			}
		}
	};
</script>
