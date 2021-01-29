import { ref, reactive, computed, watch } from 'vue';
import Img from '@/libraries/Img';

export const useProps = () => ({
	color: String,

	colors: {
		type: Object,
		default: () => ({}),
	},

	image: [ String, Object ],

	images: Object,

	size: {
		type: Object,
	},

	viewSize: {
		type: Object,
		default: () => ({}),
	},

	offset: Object,

	offsets: {
		type: Object,
		default: () => ({}),
	},

	css: Object,
});


export function useSizeStyle(props) {
	return computed(() => {
		if (!props.size) {
			return {};
		}

		const size = props.size;

		const {
			width = size.width,
			height = size.height,
		} = props.viewSize;

		return {
			width: width +'px',
			height: height +'px',
		};
	});
}

export function useStyle(sizeStyle, colorStyle, imageStyle, props, baseStyle) {
	return computed(() => ({
		...sizeStyle,
		...colorStyle,
		...imageStyle,
		...props.css,
		...baseStyle,
	}));
}

export const useMethods = ($el, baseStyle) => {
	const setCss = css => {
		baseStyle = {
			...baseStyle,
			...css,
		};
	};

	const transform = css => {
		$el.clientHeight;
		setCss(css);
	};

	const show = () => {
		setCss({
			visibility: 'visible'
		});
	};

	const hide = () => {
		setCss({
			visibility: 'hidden'
		});
	};

	return {
		setCss,
		transform,
		show,
		hide,
	};
}




export function BaseComponent($el, props, baseStyle, colorStyle, imageStyle) {
	if (!baseStyle) {
		baseStyle = reactive({});
	}

	const sizeStyle = computed(() => {
		if (!props.size) {
			return {};
		}

		const size = props.size;

		const {
			width = size.width,
			height = size.height,
		} = props.viewSize;

		return {
			width: width +'px',
			height: height +'px',
		};
	})

	const style = computed(() => ({
		...sizeStyle,
		...colorStyle,
		...imageStyle,
		...props.css,
		...baseStyle,
	}));

	const img = ref();

	const initImg = () => {
		if (!props.image) {
			img.value = undefined;
			return;
		}

		if (props.image instanceof Img) {
			img.value = props.image;
			return;
		}

		img.value = new Img(props.image);
		img.value.load();
	};

	watch(props.image, () => {
		initImg();
	});

	let imgs;

	const initImgs = () => {
		if (!props.images) {
			imgs = undefined;
			return;
		}

		imgs = reactive({});

		for (const side in props.images) {
			let imgSide = props.images[side];

			if (!imgSide.src) {
				imgSide = new Img(imgSide);
				img.load();
			}

			imgs[side] = imgSide;
		}
	};

	watch(props.images, () => {
		initImgs();
	});

	const setCss = css => {
		baseStyle = {
			...baseStyle,
			...css,
		};
	};

	const transform = css => {
		$el.clientHeight;
		setCss(css);
	};

	const show = () => {
		setCss({
			visibility: 'visible'
		});
	};

	const hide = () => {
		setCss({
			visibility: 'hidden'
		});
	};

	initImg();
	initImgs();

	return {
		img,
		imgs,
		style,
		setCss,
		transform,
		show,
		hide,
	};
}
