<template>
	<div class="flux-parallax" :style="style" ref="parallax">
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
			style: {}
		}),

		props: {
			src: {
				type: String,
				required: true
			},

			holder: {
				default: () => window
			},

			type: {
				type: String,
				default: () => 'relative'
			},

			height: {
				type: String,
				default: () => 'auto'
			},

			offset: {
				type: [Number, String],
				default: () => '60%'
			}
		},

		computed: {
			parallaxHeight: function() {
				if (/^[0-9]+px$/.test(this.height) === true)
					return parseInt(this.height);

				return this.$refs.parallax.clientHeight;
			},

			offsetHeight: function() {
				let height = {
					px: 0
				};

				if (/^[0-9]+px$/.test(this.offset) === true)
					height.px = parseInt(this.offset);

				if (/^[0-9]+%$/.test(this.offset) === true)
					height.px = Math.ceil(this.parallaxHeight * parseInt(this.offset) / 100);

				height.pct = height.px * 100 / this.background.height;

				return height;
			},

			backgroundHeight: function() {
				let height = {
					px: this.parallaxHeight + this.offsetHeight.px
				};

				height.pct = height.px * 100 / this.background.height;

				return height;
			},

			remainderHeight: function() {
				let height = {
					px: this.background.height - this.backgroundHeight.px
				};

				height.pct = height.px * 100 / this.background.height;

				return height;
			}
		},

		mounted() {
			window.addEventListener('resize', this.resize, {
				passive: true
			});

			if (this.type !== 'fixed') {
				this.holder.addEventListener('scroll', this.handleScroll, {
					passive: true
				});
			}
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.resize);

			if (this.type !== 'fixed')
				this.holder.removeEventListener('scroll', this.handleScroll);
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
				let parallax = this.$refs.parallax;

				this.view.height = this.holder.innerHeight;

				Object.assign(this.parallax, {
					width: 'auto',
					height: this.parallaxHeight
				});

				this.setCss({
					width: this.parallax.width,
					height: this.parallax.height +'px'
				});

				this.$nextTick(() => {
					Object.assign(this.parallax, {
						top: parallax.offsetTop,
						width: parallax.clientWidth
					});

					let css = {
						width: this.parallax.width +'px',
						backgroundImage: 'url("'+ this.properties.src +'")',
						backgroundRepeat: 'no-repeat'
					};

					if (this.type === 'fixed') {
						Object.assign(css, {
							backgroundPosition: 'center',
							backgroundAttachment: 'fixed',
							backgroundSize: 'cover'
						});

					} else {
						let image = {
							width: this.properties.width,
							height: this.properties.height
						};

						this.background.height = this.backgroundHeight.px;
						this.background.width = Math.floor(this.background.height * image.width / image.height);
						this.background.top = 0;

						if (this.background.width < this.parallax.width) {
							this.background.width = this.parallax.width;
							this.background.height = Math.floor(this.parallax.width * image.height / image.width);
						}

						Object.assign(css, {
							backgroundSize: this.background.width +'px '+ this.background.height +'px',
							backgroundPosition: 'center '+ this.background.top +'px'
						});
					}

					this.setCss(css);

					this.handleScroll();
				});
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
				if (this.remainderHeight.px > 0)
					pct = pct * this.offsetHeight.pct / 100 + 50 - this.offsetHeight.pct / 2;

				this.setCss({
					backgroundPositionY: pct.toFixed(2) +'%'
				});
			},

			handleScroll() {
				if (this.loaded === false)
					return;

				let scrollTop = this.holder.scrollY || this.holder.scrollTop || this.holder.pageYOffset || 0;

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
					pct = (positionY - this.parallax.height) * 100 / (this.view.height - this.parallax.height);

				this.moveBackgroundByPct(pct);
			},

			handleRelative(positionY) {
				let pct;

				pct = positionY * 100 / (this.view.height + this.parallax.height);

				this.moveBackgroundByPct(pct);
			}
		}
	};
</script>

<style lang="scss">
	.flux-parallax img {
		position: absolute;
		visibility: hidden;
	}
</style>
