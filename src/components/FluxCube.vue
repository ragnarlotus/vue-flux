<template>
	<div :style="style" ref="cube">
		<flux-image :slider="slider" :index="index.front" :css="getFrontSideCss()" ref="front"></flux-image>
		<flux-image v-if="sideSet('top')" :slider="slider" :index="index.top" :css="getTopSideCss()" ref="top"></flux-image>
		<flux-image v-if="sideSet('back')" :slider="slider" :index="index.back" :css="getBackSideCss()" ref="back"></flux-image>
		<flux-image v-if="sideSet('bottom')" :slider="slider" :index="index.bottom" :css="getBottomSideCss()" ref="bottom"></flux-image>
		<flux-image v-if="sideSet('left')" :slider="slider" :index="index.left" :css="getLeftSideCss()" ref="left"></flux-image>
		<flux-image v-if="sideSet('right')" :slider="slider" :index="index.right" :css="getRightSideCss()" ref="right"></flux-image>
	</div>
</template>

<script>
	import FluxImage from './FluxImage.vue';

	export default {
		name: 'FluxCube',

		components: {
			FluxImage
		},

		data: () => ({
			style: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				overflow: 'visible',
				transformStyle: 'preserve-3d'
			}
		}),

		props: {
			slider: { type: Object, required: true },
			index: { type: Object, required: true },
			css: { type: Object, default: () => ({
				top: 0,
				left: 0
			})}
		},

		computed: {
			front: function() {
				return this.$refs.front;
			},

			top: function() {
				return this.$refs.top;
			},

			back: function() {
				return this.$refs.back;
			},

			bottom: function() {
				return this.$refs.bottom;
			},

			left: function() {
				return this.$refs.left;
			},

			right: function() {
				return this.$refs.right;
			}
		},

		created() {
			let css = this.css;

			if (!css.width)
				css.width = this.slider.size.width +'px';

			if (!css.height)
				css.height = this.slider.size.height +'px';

			this.setCss(css);
		},

		methods: {
			sideSet(side) {
				return this.index[side] !== undefined;
			},

			setCss(css) {
				this.style = Object.assign({}, this.style, css);
			},

			getBasicSideCss(side) {
				let css = {};

				if (typeof this.index[side] === 'number') {
					css.top = this.css.top;
					css.left = this.css.left;
				}

				return css;
			},

			getFrontSideCss() {
				let css = this.getBasicSideCss('front');

				return css;
			},

			getTopSideCss() {
				let css = this.getBasicSideCss('top');

				let t = {
					rx: '90',
					tx: '0',
					ty: '-'+ Math.ceil(this.slider.size.height / 2),
					tz: Math.ceil(this.slider.size.height / 2)
				};

				css.transform = 'rotateX('+ t.rx +'deg) translate3d('+ t.tx +'px, '+ t.ty +'px, '+ t.tz +'px)';

				return css;
			},

			getBackSideCss() {
				let css = this.getBasicSideCss('back');

				css.transform = 'rotateY(180deg)';
				css.backfaceVisibility = 'hidden';

				return css;
			},

			getBottomSideCss() {
				let css = this.getBasicSideCss('bottom');

				let t = {
					rx: '-90',
					tx: '0',
					ty: Math.ceil(this.slider.size.height / 2),
					tz: Math.ceil(this.slider.size.height / 2)
				};

				css.transform = 'rotateX('+ t.rx +'deg) translate3d('+ t.tx +'px, '+ t.ty +'px, '+ t.tz +'px)';

				return css;
			},

			getLeftSideCss() {
				let css = this.getBasicSideCss('left');

				let size = {
					width: parseInt(typeof this.index.left === 'number'? this.style.width : this.style.height),
					height: parseInt(this.style.height)
				};

				css.width = size.width +'px';
				css.height = size.height +'px';

				let t = {
					ry: '-90',
					tx: -Math.ceil(size.width / 2),
					ty:'0',
					tz: Math.ceil(size.width / 2)
				};

				css.transform = 'rotateY('+ t.ry +'deg) translate3d('+ t.tx +'px, '+ t.ty +'px, '+ t.tz +'px)';

				return css;
			},

			getRightSideCss() {
				let css = this.getBasicSideCss('right');

				let size = {
					width: parseInt(typeof this.index.right === 'number'? this.style.width : this.style.height),
					height: parseInt(this.style.height)
				};

				css.width = size.width +'px';
				css.height = size.height +'px';

				let t = {
					ry: '90',
					tx: Math.ceil(size.width / 2),
					ty: '0',
					tz: Math.ceil(parseInt(this.style.width) - size.width / 2)
				};

				css.transform = 'rotateY('+ t.ry +'deg) translate3d('+ t.tx +'px, '+ t.ty +'px, '+ t.tz +'px)';

				return css;
			},

			transform(css) {
				this.$refs.cube.clientHeight;

				this.$nextTick(() => {
					this.setCss(css);
				});
			},

			turn(direction, to) {
				if (direction === 'top')
					this.turnTop();

				else if (direction === 'back')
					this.turnBack(to);

				else if (direction === 'bottom')
					this.turnBottom();

				else if (direction === 'left')
					this.turnLeft();

				else if (direction === 'right')
					this.turnRight();
			},

			turnTop() {
				let height = parseInt(this.style.height);

				let t = {
					rx: 90,
					ty: -Math.ceil(height / 2),
					tz: Math.ceil(height / 2)
				};

				this.transform({
					transform: 'rotateX('+ t.rx +'deg) translate3d(0, '+ t.ty +'px, '+ t.tz +'px)'
				});
			},

			turnBack(to) {
				let deg = 180;

				if (to === 'left')
					deg = -180;

				this.transform({
					transform: 'rotateY('+ deg +'deg)'
				});
			},

			turnBottom() {
				let height = parseInt(this.style.height);

				let t = {
					rx: -90,
					ty: Math.ceil(height / 2),
					tz: Math.ceil(height / 2)
				};

				this.transform({
					transform: 'rotateX('+ t.rx +'deg) translate3d(0, '+ t.ty +'px, '+ t.tz +'px)'
				});
			},

			turnLeft() {
				let width = parseInt(this.style.width);

				let t = {
					ry: 90,
					tx: Math.ceil(width / 2),
					tz: Math.ceil(width / 2)
				};

				this.transform({
					transform: 'rotateY('+ t.ry +'deg) translate3d('+ t.tx +'px, 0, '+ t.tz +'px)'
				});
			},

			turnRight() {
				let width = parseInt(this.style.width);

				let t = {
					ry: -90,
					tx: -Math.ceil(width / 2),
					tz: Math.ceil(width / 2)
				};

				this.transform({
					transform: 'rotateY('+ t.ry +'deg) translate3d('+ t.tx +'px, 0, '+ t.tz +'px)'
				});
			}
		}
	};
</script>
