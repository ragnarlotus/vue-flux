<template>
	<div :style="style" ref="cube">
		<flux-image
			v-for="side in sides"
			v-if="sideDefined(side)"
			:key="side"
			:size="getSize(side)"
			:image="getImage(side)"
			:color="getColor(side)"
			:css="getCss(side)"
			:ref="side">
		</flux-image>
	</div>
</template>

<script>
	import FluxImage from '@/components/FluxImage.vue';

	const SIDES = [ 'front', 'top', 'back', 'bottom', 'left', 'right' ];

	export default {
		name: 'FluxCube',

		components: {
			FluxImage,
		},

		data: () => ({
			sides: SIDES,
			style: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: 0,
				height: 0,
				overflow: 'visible',
				transformStyle: 'preserve-3d',
			},
		}),

		props: {
			size: {
				type: Object,
				required: false,
			},

			images: {
				type: Object,
				default: () => ({}),
			},

			color: {
				type: [ String, Object ],
				default: () => ({}),
			},

			css: {
				type: Object,
				default: () => ({}),
			},
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
				if (this.images[side] || this.color[side])
					return true;

				return false;
			},

			getSide(side) {
				return this.sideDefined(side)? this.$refs[side] : undefined;
			},

			getImage(side) {
				if (this.images[side])
					return this.images[side];

				return undefined;
			},

			getSize(side) {
				return this.size;
			},

			getColor(side) {
				if (this.color && typeof this.color === 'string')
					return this.color;

				if (this.color && this.color[side])
					return this.color[side];

				return undefined;
			},

			getCss(side) {
				let css = {};

				if (this.sideDefined(side)) {
					css.top = this.css.top;
					css.left = this.css.left;
				}

				side = side.charAt(0).toUpperCase() + side.slice(1);

				return this['get'+ side +'Css'](css);
			},

			getFrontCss(css) {
				return css;
			},

			getTopCss(css) {
				let t = {
					rx: '90deg',
					tx: '0',
					ty: '-50%',
					tz: (this.slider.size.height / 2) +'px',
				};

				css.transform = 'rotateX('+ t.rx +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';

				return css;
			},

			getBackCss(css) {
				css.transform = 'rotateY(180deg)';
				//css.backfaceVisibility = 'hidden';

				return css;
			},

			getBottomCss(css) {
				let t = {
					rx: '-90deg',
					tx: '0',
					ty: '50%',
					tz: (this.slider.size.height / 2) +'px',
				};

				css.transform = 'rotateX('+ t.rx +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';

				return css;
			},

			getLeftCss(css) {
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
					tz: (size.width / 2) +'px',
				};

				css.transform = 'rotateY('+ t.ry +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';

				return css;
			},

			getRightCss(css) {
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
					tz: (parseFloat(this.style.width) - size.width / 2) +'px',
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
				direction = direction.charAt(0).toUpperCase() + direction.slice(1);

				if (this['turn'+ direction])
					this['turn'+ direction](to);
			},

			turnTop() {
				let t = {
					rx: '90deg',
					ty: '-50%',
					tz: (this.size.height / 2) +'px',
				};

				this.transform({
					transform: 'rotateX('+ t.rx +') translate3d(0, '+ t.ty +', '+ t.tz +')',
				});
			},

			turnBack(to) {
				let deg = '180';

				if (to === 'left')
					deg = '-180';

				this.transform({
					transform: 'rotateY('+ deg +'deg)',
				});
			},

			turnBottom() {
				let t = {
					rx: '-90deg',
					ty: '50%',
					tz: (this.size.height / 2) +'px',
				};

				this.transform({
					transform: 'rotateX('+ t.rx +') translate3d(0, '+ t.ty +', '+ t.tz +')',
				});
			},

			turnLeft() {
				let t = {
					ry: '90deg',
					tx: '50%',
					tz: (this.size.width / 2) +'px',
				};

				this.transform({
					transform: 'rotateY('+ t.ry +') translate3d('+ t.tx +', 0, '+ t.tz +')',
				});
			},

			turnRight() {
				let t = {
					ry: '-90deg',
					tx: '-50%',
					tz: (this.size.width / 2) +'px',
				};

				this.transform({
					transform: 'rotateY('+ t.ry +') translate3d('+ t.tx +', 0, '+ t.tz +')',
				});
			},
		}
	};
</script>
