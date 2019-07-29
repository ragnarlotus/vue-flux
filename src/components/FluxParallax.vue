<template>
	<div class="flux-parallax" :style="style" ref="parallax">
		<div v-if="chromeMobile" style="position: absolute; top: 0; left: 0; width: 100%; height: 300px; clip: rect(auto auto auto auto);">
			<div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;">
				<div ref="chromeFixChild" :style="fixChildStyle" style="height: 100%; top: 0; bottom: 0; left: 0; right: 0; position: fixed; background: url('slides/01.jpg') no-repeat;"></div>
			</div>
		</div>
		<img
			v-if="!loaded"
			:src="src"
			alt=""
			@load="setProperties"
			@error="setProperties"
			ref="image" />
		<slot />
	</div>
</template>

<script>
	export default {
		name: 'FluxParallax',

		data: () => ({
			loaded: false,

			view: {
				height: undefined,
			},

			parallax: {
				top: undefined,
				width: undefined,
				height: undefined,
			},

			background: {
				top: undefined,
				left: undefined,
				width: undefined,
				height: undefined,
			},

			image: {
				src: undefined,
				width: undefined,
				height: undefined,
			},

			style: {},
			fixParentStyle: {},
			fixChildStyle: {},

			chromeMobile: false,
		}),

		props: {
			src: {
				type: String,
				required: true,
			},

			holder: {
				default: () => window,
			},

			type: {
				type: String,
				default: 'relative',
			},

			height: {
				type: String,
				default: 'auto',
			},

			offset: {
				type: [Number, String],
				default: '100%',
			},
		},

		computed: {
			parallaxHeight() {
				if (/^[0-9]+px$/.test(this.height) === true)
					return parseFloat(this.height);

				return this.$refs.parallax.clientHeight;
			},

			offsetHeight() {
				let height = {
					px: 0
				};

				if (/^[0-9]+px$/.test(this.offset) === true)
					height.px = parseFloat(this.offset);

				if (/^[0-9]+%$/.test(this.offset) === true)
					height.px = Math.ceil(this.parallaxHeight * parseFloat(this.offset) / 100);

				height.pct = height.px * 100 / this.background.height;

				return height;
			},

			backgroundHeight() {
				let height = {
					px: this.parallaxHeight + this.offsetHeight.px
				};

				height.pct = height.px * 100 / this.background.height;

				return height;
			},

			remainderHeight() {
				let height = {
					px: this.background.height - this.backgroundHeight.px
				};

				height.pct = height.px * 100 / this.background.height;

				return height;
			},
		},

		created() {
			let ua = navigator.userAgent;
			let chrome = /Chrome|Chromium\W\d/.test(ua);
			let mobile = /iphone|ip[oa]d|android|mobile|tablet/i.test(ua);

			this.chromeMobile = true || (chrome && mobile);
		},

		mounted() {
			window.addEventListener('resize', this.resize, {
				passive: true,
			});

			if (this.type !== 'fixed') {
				this.holder.addEventListener('scroll', this.handleScroll, {
					passive: true,
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
					Object.assign(this.image, {
						src: img.src,
						width: img.naturalWidth || img.width,
						height: img.naturalHeight || img.height,
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
					height: this.parallaxHeight,
				});

				this.setCss({
					width: this.parallax.width,
					height: this.parallax.height +'px',
				});

				this.$nextTick(() => {
					Object.assign(this.parallax, {
						top: parallax.offsetTop,
						width: parallax.clientWidth,
					});

					let css = {
						width: this.parallax.width +'px',
						backgroundImage: `url("${this.image.src}")`,
						backgroundRepeat: 'no-repeat',
					};

					let image = {
						width: this.image.width,
						height: this.image.height,
					};

					if (this.type !== 'fixed') {
						this.background.top = 0;

						if (this.background.width < this.parallax.width) {
							this.background.width = this.parallax.width;
							this.background.height = Math.floor(this.parallax.width * image.height / image.width);

						} else {
							this.background.height = this.backgroundHeight.px;
							this.background.width = Math.floor(this.background.height * image.width / image.height);
						}

						Object.assign(css, {
							backgroundSize: `${this.background.width}px ${this.background.height}px`,
							backgroundPosition: `center ${this.background.top}px`,
						});

						this.handleScroll();

					} else if (this.chromeMobile) {
						this.setCss({
							position: 'relative',
							overflow: 'hidden',
							height: this.parallax.height +'px',
						});

						this.background.top = 0;

						let browserSize = {
							width: window.innerWidth,
							height: window.innerHeight,
						};

						if (image.height / image.width >= browserSize.height / browserSize.width) {
							this.background.height = browserSize.width * image.height / image.width;
							this.background.width = browserSize.width;
							this.background.top = (browserSize.height - image.height) / 2;

						} else {
							this.background.width = browserSize.height * image.width / image.height;
							this.background.height = browserSize.height;
							this.background.left = (browserSize.width - image.width) / 2;
						}

						Object.assign(this.fixChildStyle, {
							backgroundSize: `${this.background.width}px ${this.background.height}px`,
							backgroundPosition: `center ${this.background.top}px`,
						});

					} else {
						Object.assign(css, {
							backgroundPosition: 'center',
							backgroundAttachment: 'fixed',
							backgroundSize: 'cover',
						});
					}

					this.setCss(css);
				});
			},

			init() {
				if (!this.image.src)
					return;

				this.resize();
			},

			setCss(css) {
				this.style = {
					...this.style,
					...css,
				};
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

				if (this.type === 'visible')
					this.handleVisible(positionY);

				else if (this.type === 'relative')
					this.handleRelative(positionY);
			},

			handleVisible(positionY) {
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
			},
		},
	};
</script>

<style lang="scss">
	.flux-parallax img {
		position: absolute;
		visibility: hidden;
	}
</style>
