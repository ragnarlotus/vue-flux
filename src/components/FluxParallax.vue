<template>
	<div :style="style" ref="parallax">
		<div v-if="type === 'fixed'" :style="fixedParentStyle">
			<div :style="fixedChildStyle" />
		</div>
		<img
			v-if="type !== 'fixed' && !loaded"
			:src="src"
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

			style: {
				position: 'relative',
			},

			fixedParentStyle: {
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				clip: 'rect(auto auto auto auto)',
			},
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

			offset: {
				type: [Number, String],
				default: '100%',
			},
		},

		computed: {
			parallaxSize() {
				return {
					width: this.$refs.parallax.clientWidth,
					height: this.$refs.parallax.clientHeight,
				};
			},

			offsetHeight() {
				let height;

				if (/^[0-9]+px$/.test(this.offset)) {
					height = {
						px: parseFloat(this.offset),
						pct: height.px * 100 / this.background.height,
					};

				} else if (/^[0-9]+%$/.test(this.offset)) {
					height = {
						px: Math.ceil(this.parallaxSize.height * parseFloat(this.offset) / 100),
						pct: parseFloat(parseFloat(this.offset)),
					};
				}

				return height;
			},

			backgroundHeight() {
				return this.parallaxSize.height + this.offsetHeight.px;
			},

			remainderHeight() {
				return this.background.height - this.backgroundHeight;
			},

			fixedChildStyle() {
				return {
					position: 'fixed',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					background: `url("${this.src}") no-repeat center center fixed`,
				};
			}
		},

		mounted() {
			if (this.type === 'fixed')
				return;

			this.setCss({
				background: `url("${this.src}") no-repeat`,
			});

			window.addEventListener('resize', this.resize, {
				passive: true,
			});

			setTimeout(() => {
				this.holder.addEventListener('scroll', this.handleScroll, {
					passive: true,
				});
			});
		},

		beforeDestroy() {
			if (this.type === 'fixed')
				return;

			window.removeEventListener('resize', this.resize);
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
				this.resize();
			},

			resize() {
				this.view.height = this.holder.scrollHeight || this.holder.innerHeight;

				this.parallax = {
					...this.parallax,
					...this.parallaxSize,
					top: this.$refs.parallax.offsetTop,
				};

				let imageRatio = this.image.height / this.image.width;
				let parallaxRatio = this.parallax.height / this.parallax.width;

				if (imageRatio >= parallaxRatio) {
					this.background.width = this.parallax.width;
					this.background.height = Math.floor(this.parallax.width * this.image.height / this.image.width);

				} else {
					this.background.height = this.backgroundHeight;
					this.background.width = Math.floor(this.background.height * this.image.width / this.image.height);
				}

				this.setCss({
					backgroundSize: `${this.background.width}px ${this.background.height}px`,
					backgroundPosition: `center 0`,
				});

				this.handleScroll();
			},

			setCss(css) {
				this.style = {
					...this.style,
					...css,
				};
			},

			moveBackgroundByPct(pct) {
				if (this.remainderHeight > 0)
					pct = pct * this.offsetHeight.pct / 100 + 50 - this.offsetHeight.pct / 2;

				this.setCss({
					backgroundPositionY: pct.toFixed(2) +'%'
				});
			},

			handleScroll() {
				if (this.loaded === false)
					return;

				let scrollTop = this.holder.scrollY || this.holder.scrollTop || this.holder.pageYOffset || 0;

				if (this.holder !== window)
					return this.handleRelative(scrollTop);

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

				if (this.holder === window)
					pct = positionY * 100 / (this.view.height + this.parallax.height);

				else
					pct = positionY * 100 / (this.view.height - this.holder.clientHeight);

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
