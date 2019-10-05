<template>
	<div ref="cube" :style="style">
		<flux-image
			v-for="side in sides"
			:ref="side.name"
			:key="side.name"
			:size="side.size"
			:image="side.img"
			:color="side.color"
			:offset="offset"
			:style="side.style"
		/>
	</div>
</template>

<script>
	import Dom from '@/libraries/Dom';
	import Img from '@/libraries/Img';
	import FluxImage from '@/components/FluxImage.vue';

	const rotate = {
		x: {
			top: '90',
			bottom: '-90',
		},

		y: {
			back: '180',
			left: '-90',
			right: '90',
		},
	};

	const translate = {
		x: {
			left: '-50',
			right: '50',
		},

		y: {
			top: '-50',
			bottom: '50',
		},
	};

	export default {
		name: 'FluxCube',

		components: {
			FluxImage,
		},

		props: {
			colors: {
				type: Object,
				default: () => ({}),
			},

			images: {
				type: Object,
				default: () => ({}),
			},

			size: {
				type: Object,
				required: true,
			},

			depth: Number,

			offset: Object,

			sidesCss: {
				type: Object,
				default: () => ({}),
			},
		},

		data: () => ({
			sideNames: [ 'front', 'back', 'top', 'bottom', 'left', 'right' ],

			baseStyle: {
				//overflow: 'hidden',
				transformStyle: 'preserve-3d',
			},

			imgs: {},
		}),

		computed: {
			sides() {
				let side;
				let sides = {};

				this.definedSides.forEach(sideName => {
					side = {
						name: sideName,
						img: this.imgs[sideName],
						color: this.colors[sideName],
						offset: this.offset,
					};

					side.size = {
						...this.size,
					};

					if (this.depth && ['left', 'right'].includes(sideName))
						side.size.width = this.depth;

					side.style = {
						...this.sidesCss[sideName],
						position: 'absolute',
						transform: this.getTransform(sideName),
						backfaceVisibility: 'hidden',
					};

					sides[sideName] = side;
				});

				return sides;
			},

			definedSides() {
				return this.sideNames.filter(side => this.sideDefined(side))
			},

			translateZ() {
				let { width, height } = this.size;
				let depthX = (this.depth || width) / 2;
				let depthY = height / 2

				return {
					top: depthY,
					bottom: depthY,
					left: depthX,
					right: width - depthX,
				};
			},

			sizeStyle() {
				let { width, height } = this.size;

				return {
					width: Dom.px(width),
					height: Dom.px(height),
				};
			},

			style() {
				return {
					...this.baseStyle,
					...this.sizeStyle,
					...this.css,
				};
			},
		},

		watch: {
			images() {
				this.init();
			},

			size() {
				for (let side in this.images)
					this.images[side].resizeToCover(this.size);
			},
		},

		created() {
			this.init();
		},

		methods: {
			init() {
				for (let side in this.images) {
					this.initSide(side);
				}
			},

			async initSide(side) {
				let image = this.images[side];

				if (image instanceof Img) {
					this.imgs[side] = image;
					return;
				}

				this.imgs[side] = new Img(this.images[side]);

				await this.imgs[side].load();

				this.imgs[side].resizeToCover(this.size);
			},

			sideDefined(side) {
				if (this.images[side] || this.colors[side])
					return true;

				return false;
			},

			getSide(side) {
				return this.sideDefined(side)? this.$refs[side] : undefined;
			},

			getTransform(side) {
				let rx = rotate.x[side] || 0;
				let ry = rotate.y[side] || 0;
				let tx = translate.x[side] || 0;
				let ty = translate.y[side] || 0;
				let tz = this.translateZ[side] || 0;

				return `rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}%, ${ty}%, ${tz}px)`;
			},

			turn(side) {
				this.transform({
					transform: this.getTransform(side),
				});
			},

			turnTop() {
				this.turn('top');
			},

			turnBack() {
				this.turn('back');
			},

			turnBottom() {
				this.turn('bottom');
			},

			turnLeft() {
				this.turn('left');
			},

			turnRight() {
				this.turn('right');
			},

			setCss(css) {
				this.baseStyle = {
					...this.baseStyle,
					...css,
				};
			},

			transform(css) {
				this.$el.clientHeight;
				this.setCss(css);
			},
		},
	};
</script>
