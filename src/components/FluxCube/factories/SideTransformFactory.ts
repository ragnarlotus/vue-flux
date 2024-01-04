import { Ref, computed } from 'vue';
import { Size } from '../../../shared';
import { Side, Turn } from '../types';

const rotate: {
	x: {
		[key: string]: string;
	};
	y: {
		[key: string]: string;
	};
} = {
	x: {
		top: '90',
		bottom: '-90',
	},

	y: {
		back: '180',
		backr: '180',
		backl: '-180',
		left: '-90',
		right: '90',
	},
};

const translate: {
	x: {
		[key: string]: string;
	};
	y: {
		[key: string]: string;
	};
} = {
	x: {
		left: '-50',
		right: '50',
	},

	y: {
		top: '-50',
		bottom: '50',
	},
};

export default class SideTransformFactory {
	depth: number;
	size: Size;
	viewSize: Size;
	translateZ: Ref<{ [key: string]: number }> = computed(() => {
		const halfDepth = this.depth / 2;

		const { width, height } = this.size.toValue();
		const { width: viewWidth, height: viewHeight } = this.viewSize.toValue();

		return {
			front: 0,
			back: this.depth,
			backr: this.depth,
			backl: this.depth,
			left: halfDepth,
			right: (viewWidth ?? width!) - halfDepth,
			top: halfDepth,
			bottom: (viewHeight ?? height!) - halfDepth,
		};
	});

	constructor(depth: number, size: Size, viewSize: Size) {
		this.depth = depth;
		this.size = size;
		this.viewSize = viewSize;
	}

	public getRotate(turn: Side | Turn) {
		const rx = rotate.x[turn] ?? '0';
		const ry = rotate.y[turn] ?? '0';

		return `rotateX(${rx}deg) rotateY(${ry}deg)`;
	}

	public getTranslate(side: Side | Turn) {
		const tx = translate.x[side] ?? '0';
		const ty = translate.y[side] ?? '0';
		const tz = this.translateZ.value[side].toString();

		return `translate3d(${tx}%, ${ty}%, ${tz}px)`;
	}

	public getSideCss(side: Side | Turn) {
		return `${this.getRotate(side)} ${this.getTranslate(side)}`;
	}
}
