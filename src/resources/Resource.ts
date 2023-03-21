import { ref, reactive, Ref } from 'vue';
import Size from '../shared/Size';
import { ResourceStatus } from '../types';
import ResizeCalculator from '../shared/ResizeCalculator';

export default abstract class Resource {
	src: string;
	loader: Promise<void | string> | null = null;
	errorMessage: string | null = null;
	status: Ref<ResourceStatus> = ref(ResourceStatus.notLoaded);

	realSize: Size | null = null;
	adaptedSize = reactive({ width: 0, height: 0 });
	adaptedPosition = reactive({ top: 0, left: 0 });
	caption: string | null;
	resizeType: 'fill' | 'fit';
	display: { component: any; props: {} };
	transition: { component: any; props: {} };

	constructor(
		src: string,
		caption: string | null = null,
		resizeType: 'fill' | 'fit' = 'fill'
	) {
		this.src = src;
		this.caption = caption;
		this.resizeType = resizeType;
	}

	isLoading = () => this.status.value === ResourceStatus.loading;

	isLoaded = () => this.status.value === ResourceStatus.loaded;

	isError = () => this.status.value === ResourceStatus.error;

	adaptToSize(displaySize: Size) {
		if (this.realSize === null) {
			return;
		}

		const resCalc = new ResizeCalculator(this.realSize);
		const { width, height, top, left } = resCalc.resizeTo(displaySize);

		Object.assign(this.adaptedSize, { width, height });
		Object.assign(this.adaptedPosition, { top, left });
	}

	getAdaptedProps() {
		const { adaptedSize, adaptedPosition } = this;

		return {
			...adaptedSize,
			...adaptedPosition,
		};
	}
}
