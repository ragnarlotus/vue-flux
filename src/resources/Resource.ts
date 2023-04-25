import { computed, ref, Ref } from 'vue';
import Size from '../shared/Size';
import ResizeCalculator from '../shared/ResizeCalculator';
import Position from '../shared/Position';
import { Offset } from '../types';
import {
	DisplayParamenter,
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
	adaptedSize: Size = new Size();
	adaptedPosition: Position = new Position();
	caption: string | null;
	resizeType: ResizeType;
	display: DisplayParamenter;
	transition: TransitionParameter;

	constructor(
		src: string,
		caption: string | null = null,
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

	adaptToSize(displaySize: Size) {
		if (
			displaySize.isValid() === false ||
			this.realSize.isValid() === false
		) {
			return;
		}

		const resCalc = new ResizeCalculator(this.realSize);
		const { size, position } = resCalc.resizeTo(displaySize);

		this.adaptedSize.update(size.toRaw());
		this.adaptedPosition.update(position.toRaw());
	}

	adaptedPropsAreValid: Ref<boolean> = computed<boolean>(
		() =>
			![
				this.adaptedSize.valid.value,
				this.adaptedPosition.valid.value,
			].includes(false)
	);

	getAdaptedProps(offset?: Offset) {
		const { adaptedSize, adaptedPosition } = this;

		const adaptedProps = {
			...adaptedSize.toRaw(),
			...adaptedPosition.toRaw(),
		};

		if (offset !== undefined) {
			adaptedProps.top -= offset.top || 0;
			adaptedProps.left -= offset.left || 0;
		}

		return adaptedProps;
	}
}
