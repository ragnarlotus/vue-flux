<template>
	<div :style="style" ref="cube">
		<flux-image
			v-for="side in sides"
			v-if="sideDefined(side)"
			:key="side"
			:slider="slider"
			:display-size="displaySize"
			:image-src="getSideSrc(side)"
			:image-size="getSideSize(side)"
			:color="getSideColor(side)"
			:css="getSideCss(side)"
			:ref="side">
		</flux-image>
	</div>
</template>

<script>
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxCube',

		components: {
			FluxImage
		},

		data: () => ({
			sides: [
				'front',
				'top',
				'back',
				'bottom',
				'left',
				'right'
			],

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
			slider: {
				type: Object,
				required: false,
			},

			displaySize: {
				type: Object,
				required: false,
			},

			images: {
				type: Object,
				required: false,
			},

			imageSrc: {
				type: Object,
				required: false,
			},

			imageSize: {
				type: Object,
				required: false,
			},

			color: {
				type: String,
				required: false,
			},

			css: {
				type: Object,
				default: () => ({
					top: 0,
					left: 0
				})
			},
		},

		computed: {
			front: function() {
				return this.$refs.front[0];
			},

			top: function() {
				return this.$refs.top[0];
			},

			back: function() {
				return this.$refs.back[0];
			},

			bottom: function() {
				return this.$refs.bottom[0];
			},

			left: function() {
				return this.$refs.left[0];
			},

			right: function() {
				return this.$refs.right[0];
			},

			size: function() {
				return {
					width: parseFloat(this.style.width),
					height: parseFloat(this.style.height),
				};
			}
		},

		created() {
			let css = this.css;

			if (this.slider) {
				if (!css.width)
					css.width = this.slider.size.width +'px';

				if (!css.height)
					css.height = this.slider.size.height +'px';
			}

			this.setCss(css);
		},

		methods: {
			sideDefined(side) {
				if (this.imageSrc && this.imageSrc[side] !== undefined)
					return true;

				if (this.images[side] && (this.images[side].src !== undefined || this.images[side].color !== undefined))
					return true;

				if (this.color && this.color[side] !== undefined)
					return true;

				return false;
			},

			getSideSrc(side) {
				if (this.imageSrc && this.imageSrc[side])
					return this.imageSrc[side];

				if (this.images[side] && this.images[side].src)
					return this.images[side].src;

				return undefined;
			},

			getSideSize(side) {
				if (this.imageSize && this.imageSize[side])
					return this.imageSize[side];

				if (this.images[side] && this.images[side].size)
					return this.images[side].size;

				return undefined;
			},

			getSideColor(side) {
				if (this.color && typeof this.color === 'string')
					return this.color;

				if (this.color && this.color[side])
					return this.color[side];

				if (this.images[side] && this.images[side].color)
					return this.images[side].color;

				return undefined;
			},

			getSideCss(side) {
				let css = {
					top: this.css.top,
					left: this.css.left,
				};

				side = side.charAt(0).toUpperCase() + side.slice(1);

				return this['get'+ side +'SideCss'](css);
			},

			getFrontSideCss(css) {
				return css;
			},

			getTopSideCss(css) {
				let t = {
					rx: '90deg',
					tx: '0',
					ty: '-50%',
					tz: (this.slider.size.height / 2) +'px'
				};

				css.transform = 'rotateX('+ t.rx +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';

				return css;
			},

			getBackSideCss(css) {
				css.transform = 'rotateY(180deg)';
				//css.backfaceVisibility = 'hidden';

				return css;
			},

			getBottomSideCss(css) {
				let t = {
					rx: '-90deg',
					tx: '0',
					ty: '50%',
					tz: (this.slider.size.height / 2) +'px'
				};

				css.transform = 'rotateX('+ t.rx +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';

				return css;
			},

			getLeftSideCss(css) {
				let size = {
					width: this.sideDefined('left')? this.size.width : this.size.height,
					height: this.size.height,
				};

				css.width = size.width +'px';
				css.height = size.height +'px';

				let t = {
					ry: '-90deg',
					tx: '-50%',
					ty: '0',
					tz: (size.width / 2) +'px'
				};

				css.transform = 'rotateY('+ t.ry +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';

				return css;
			},

			getRightSideCss(css) {
				let size = {
					width: this.sideDefined('right')? this.size.width : this.size.height,
					height: this.size.height,
				};

				css.width = size.width +'px';
				css.height = size.height +'px';

				let t = {
					ry: '90deg',
					tx: '50%',
					ty: '0',
					tz: (parseFloat(this.style.width) - size.width / 2) +'px'
				};

				css.transform = 'rotateY('+ t.ry +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';

				return css;
			},

			setCss(css) {
				this.style = {
					...this.style,
					...css,
				};
			},

			transform(css) {
				this.$nextTick(() => {
					this.$refs.cube.clientHeight;
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
				let t = {
					rx: '90deg',
					ty: '-50%',
					tz: (this.size.height / 2) +'px',
				};

				this.transform({
					transform: 'rotateX('+ t.rx +') translate3d(0, '+ t.ty +', '+ t.tz +')'
				});
			},

			turnBack(to) {
				let deg = '180';

				if (to === 'left')
					deg = '-180';

				this.transform({
					transform: 'rotateY('+ deg +'deg)'
				});
			},

			turnBottom() {
				let t = {
					rx: '-90deg',
					ty: '50%',
					tz: (this.size.height / 2) +'px',
				};

				this.transform({
					transform: 'rotateX('+ t.rx +') translate3d(0, '+ t.ty +', '+ t.tz +')'
				});
			},

			turnLeft() {
				let t = {
					ry: '90deg',
					tx: '50%',
					tz: (this.size.width / 2) +'px',
				};

				this.transform({
					transform: 'rotateY('+ t.ry +') translate3d('+ t.tx +', 0, '+ t.tz +')'
				});
			},

			turnRight() {
				let t = {
					ry: '-90deg',
					tx: '-50%',
					tz: (this.size.width / 2) +'px'
				};

				this.transform({
					transform: 'rotateY('+ t.ry +') translate3d('+ t.tx +', 0, '+ t.tz +')'
				});
			},
		}
	};
</script>
