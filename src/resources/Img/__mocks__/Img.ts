import { vi } from 'vitest';
import { ResizeTypes, Statuses, Resource } from '../../';
import { FluxImage } from '../../../components';

export default class Img extends Resource {
	constructor() {
		super(
			'',
			'',
			ResizeTypes.fill,
			null,
			{ component: FluxImage, props: {} },
			{ component: FluxImage, props: {} },
			''
		);
	}

	load = vi.fn().mockImplementation(() => {
		return new Promise<void>((resolve) => {
			this.status.value = Statuses.loading;
			setTimeout(resolve, 50);
		});
	});

	onLoad = vi
		.fn()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.mockImplementation((_el: unknown, _resolve: () => void) => {});

	onError = vi
		.fn()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.mockImplementation((_reject: (message: string) => void) => {});
}
