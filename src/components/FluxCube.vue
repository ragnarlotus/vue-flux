<template>
	<div ref="cube" :style="style">
		<flux-image
			v-for="side in sides"
			:ref="side.name"
			:key="side.name"
			:size="side.size"
			:view-size="side.viewSize"
			:image="side.img"
			:color="side.color"
			:offset="side.offset"
			:style="side.style"
		/>
	</div>
</template>

<script>
	import FluxImage from '@/components/FluxImage.vue';
	import BaseComponent from '@/mixins/BaseComponent';

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

		mixins: [
			BaseComponent,
		],

		props: {
			depth: Number,

			sidesCss: {
				type: Object,
				default: () => ({}),
			},
		},

		data: () => ({
			sideNames: [ 'front', 'back', 'top', 'bottom', 'left', 'right' ],

			baseStyle: {
				transformStyle: 'preserve-3d',
			},
		}),

		computed: {
			sides() {
				let side;
				let sides = {};

				for (let sideName of this.definedSides) {
					side = {
						name: sideName,
						img: this.imgs[sideName],
						color: this.colors[sideName] || this.color,
						offset: this.offsets[sideName] || this.offset,
					};

					side.size = {
						...this.size,
					};

					side.viewSize = {
						...this.viewSize,
					};

					if (this.depth && ['left', 'right'].includes(sideName))
						side.viewSize.width = this.depth;

					if (this.depth && ['top', 'bottom'].includes(sideName))
						side.viewSize.height = this.depth;

					side.style = {
						...this.sidesCss[sideName],
						position: 'absolute',
						transform: this.getTransform(sideName),
						backfaceVisibility: 'hidden',
					};

					sides[sideName] = side;
				}

				return sides;
			},

			definedSides() {
				return this.sideNames.filter(side => this.sideDefined(side))
			},

			translateZ() {
				let {
					width,
					height
				} = this.size;

				let { width: viewWidth } = this.viewSize;

				let depthX = (this.depth || width) / 2;
				let depthY = height / 2;

				return {
					top: depthY,
					bottom: depthY,
					left: depthX,
					right: viewWidth? viewWidth - depthX : depthX,
				};
			},
		},

		methods: {
			sideDefined(side) {
				if (this.images[side] || this.colors[side])
					return true;

				return false;
			},

			getSide(side) {
				return this.$refs[side];
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
		},
	};
</script>
