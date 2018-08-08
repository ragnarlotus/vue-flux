<template>
	<div :style="style" ref="parallax">
		<img v-if="loaded === false" :src="src" alt="" @load="setProperties" @error="setProperties" ref="image">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			view: {
				height: undefined
			},
			parallax: {
				top: undefined,
				width: undefined,
				height: undefined
			},
			background: {
				top: undefined,
				left: undefined,
				width: undefined,
				height: undefined
			},
			properties: {
				src: undefined,
				width: undefined,
				height: undefined
			},
			style: {
				display: 'flex',
				position: 'relative',
				overflow: 'hidden'
			}
		}),

		props: {
			src: {
				type: String,
				required: true
			},

			type: {
				type: String,
				default: () => 'relative'
			},

			height: {
				type: String,
				default: () => 'auto'
			},

			holder: {
				default: () => window
			}
		},

		computed: {
			finalHeight: function() {
				if (/[0-9]+px$/.test(this.height) === false)
					return this.$refs.parallax.offsetHeight;

				return parseInt(this.height);
			}
		},

		mounted() {
			if (this.type !== 'fixed') {
				window.addEventListener('resize', this.resize);
				this.holder.addEventListener('scroll', this.handleScroll);
			}
		},

		beforeDestroy() {
			if (this.type !== 'fixed') {
				window.removeEventListener('resize', this.resize);
				this.holder.removeEventListener('scroll', this.handleScroll);
			}
		},

		methods: {
			setProperties() {
				let img = this.$refs.image;

				if (img.naturalWidth || img.width) {
					Object.assign(this.properties, {
						src: img.src,
						width: img.naturalWidth || img.width,
						height: img.naturalHeight || img.height
					});
				}

				this.loaded = true;
				this.init();
			},

			resize() {
				let image = {
					width: this.properties.width,
					height: this.properties.height
				};

				this.view.height = this.holder.innerHeight;

				let parallax = this.$refs.parallax;

				Object.assign(this.parallax, {
					top: parallax.offsetTop,
					width: parallax.offsetWidth,
					height: this.finalHeight
				});

				if (image.height / image.width >= this.parallax.height / this.parallax.width) {
					this.background.height = Math.floor(this.parallax.width * image.height / image.width);
					this.background.width = this.parallax.width;
					this.background.top = Math.floor((this.parallax.height - image.height) / 2);

				} else {
					this.background.width = Math.floor(this.parallax.height * image.width / image.height);
					this.background.height = this.parallax.height;
					this.background.left = Math.floor((this.parallax.width - image.width) / 2);
				}

				let css = {
					width: this.parallax.width +'px',
					height: this.parallax.height +'px',
					backgroundImage: 'url("'+ this.properties.src +'")',
					backgroundSize: this.background.width +'px '+ this.background.height +'px',
					backgroundPosition: this.background.top +'px '+ this.background.left +'px',
					backgroundRepeat: 'no-repeat'
				};

				if (this.type === 'fixed') {
					css = Object.assign(css, {
						backgroundPosition: 'center',
						backgroundAttachment: 'fixed',
						backgroundSize: 'cover',
					});
				}

				this.setCss(css);

				this.handleScroll();
			},

			init() {
				if (!this.properties.src)
					return;

				this.resize();
			},

			setCss(css) {
				this.style = Object.assign({}, this.style, css);
			},

			moveBackgroundByPct(pct) {
				this.setCss({
					backgroundPositionY: pct +'%'
				});
			},

			handleScroll() {
				if (this.loaded === false)
					return;

				let scrollTop = this.holder.scrollY || this.holder.scrollTop || 0;

				if (scrollTop + this.view.height < this.parallax.top)
					return;

				if (scrollTop > this.parallax.top + this.parallax.height)
					return;

				let positionY = scrollTop - this.parallax.top + this.view.height;

				if (this.type === 'static') {
					this.handleStatic(positionY);
					return;
				}

				if (this.type === 'relative') {
					this.handleRelative(positionY);
					return;
				}
			},

			handleStatic(positionY) {
				let pct = 0;

				if (positionY < this.parallax.height)
					pct = 0;

				else if (positionY > this.view.height)
					pct = 100;

				else
					pct = Math.floor((positionY - this.parallax.height) * 100 / (this.view.height - this.parallax.height));

				this.moveBackgroundByPct(pct);
			},

			handleRelative(positionY) {
				let pct = 0;

				pct = Math.floor(positionY * 100 / (this.view.height + this.parallax.height));

				this.moveBackgroundByPct(pct);
			}
		}
	};
</script>

<style lang="scss" scoped>
	img {
		position: absolute;
		visibility: hidden;
	}
</style>