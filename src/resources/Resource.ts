import { computed, ref, Ref } from 'vue';
import { Size, Position, ResizeCalculator } from '../shared';
import {
	DisplayParameter,
	ResizedProps,
	ResizeType,
	TransitionParameter,
} from './types';
import { Statuses, ResizeTypes } from './';

export default abstract class Resource {
	src: string;
	loader: Promise<void> | null = null;
	errorMessage: string;
	status: Ref<Statuses> = ref(Statuses.notLoaded);

	realSize: Size = new Size();
	displaySize: Size = new Size();
	caption: string = '';
	resizeType: ResizeType;
	backgroundColor: null | string = null;
	display: DisplayParameter;
	transition: TransitionParameter;

	constructor(
		src: string,
		caption: string,
		resizeType: ResizeType = ResizeTypes.fill,
		backgroundColor: null | string = null,
		display: DisplayParameter,
		transition: TransitionParameter,
		errorMessage: string
	) {
		this.src = src;
		this.caption = caption;
		this.resizeType = resizeType;
		this.backgroundColor = backgroundColor;
		this.display = display;
		this.transition = transition;
		this.errorMessage = errorMessage;
	}

	isLoading = () => this.status.value === Statuses.loading;

	isLoaded = () => this.status.value === Statuses.loaded;

	isError = () => this.status.value === Statuses.error;

	abstract load(): Promise<void>;

	// eslint-disable-next-line no-unused-vars
	abstract onLoad(el: unknown, resolve: () => void): void;

	// eslint-disable-next-line no-unused-vars
	abstract onError(reject: (message: string) => void): void;

	calcResizeProps(displaySize: Size) {
		if ([displaySize.isValid(), this.realSize.isValid()].includes(false)) {
			return {};
		}

		const resCalc = new ResizeCalculator(this.realSize);
		const { size, position } = resCalc.resizeTo(displaySize, this.resizeType);

		return {
			...size.toValue(),
			...position.toValue(),
		};
	}

	resizeProps = computed<{
		top?: number;
		left?: number;
		width?: number;
		height?: number;
	}>(() => this.calcResizeProps(this.displaySize));

	getResizeProps(size: Size, offset?: Position) {
		const resizedProps: ResizedProps = {
			width: 0,
			height: 0,
			top: 0,
			left: 0,
		};

		if (!this.displaySize.isValid()) {
			this.displaySize.update(size.toValue());
		}

		Object.assign(
			resizedProps,
			size.equals(this.displaySize)
				? this.resizeProps.value
				: this.calcResizeProps(size)
		);

		if (offset !== undefined) {
			resizedProps.top -= offset.top.value || 0;
			resizedProps.left -= offset.left.value || 0;
		}

		return resizedProps;
	}
}
