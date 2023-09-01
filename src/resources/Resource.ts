import { computed, ref, Ref } from 'vue';
import Size from '../shared/Size';
import ResizeCalculator from '../shared/ResizeCalculator';
import Position from '../shared/Position';
import {
	DisplayParamenter,
	ResizedProps,
	ResizeType,
	ResourceStatus,
	TransitionParameter,
} from './types';

export default abstract class Resource {
	src: string;
	loader: Promise<void> | null = null;
	errorMessage: string;
	status: Ref<ResourceStatus> = ref(ResourceStatus.notLoaded);

	realSize: Size = new Size();
	displaySize: Size = new Size();
	caption: string = '';
	resizeType: ResizeType;
	display: DisplayParamenter;
	transition: TransitionParameter;

	constructor(
		src: string,
		caption: string,
		resizeType: ResizeType = 'fill',
		display: DisplayParamenter,
		transition: TransitionParameter,
		errorMessage: string
	) {
		this.src = src;
		this.caption = caption;
		this.resizeType = resizeType;
		this.display = display;
		this.transition = transition;
		this.errorMessage = errorMessage;
	}

	isLoading = () => this.status.value === ResourceStatus.loading;

	isLoaded = () => this.status.value === ResourceStatus.loaded;

	isError = () => this.status.value === ResourceStatus.error;

	abstract load(): Promise<void>;

	// eslint-disable-next-line no-unused-vars
	abstract onLoad(el: any, resolve: Function): void;

	// eslint-disable-next-line no-unused-vars
	abstract onError(reject: Function): void;

	setDisplaySize(size: Size) {
		this.displaySize = size;
	}

	fillDisplayProps = computed(() => {
		if (
			[this.displaySize.isValid(), this.realSize.isValid()].includes(false)
		) {
			return {};
		}

		const resCalc = new ResizeCalculator(this.realSize);
		const { size, position } = resCalc.resizeTo(this.displaySize);

		return {
			...size.toRaw(),
			...position.toRaw(),
		};
	});

	getResizeProps(size: Size, offset?: Position) {
		const resizedProps: ResizedProps = {
			width: 0,
			height: 0,
			top: 0,
			left: 0,
		};

		if (size.equals(this.displaySize)) {
			Object.assign(resizedProps, this.fillDisplayProps.value);
		} else {
			const resCalc = new ResizeCalculator(this.realSize);
			const { size: resizedSize, position: resizedPosition } =
				resCalc.resizeTo(size);

			Object.assign(resizedProps, {
				...resizedSize.toRaw(),
				...resizedPosition.toRaw(),
			});
		}

		if (offset !== undefined) {
			resizedProps.top -= offset.top.value || 0;
			resizedProps.left -= offset.left.value || 0;
		}

		return resizedProps;
	}
}
