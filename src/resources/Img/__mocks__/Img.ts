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
			this.onLoad(null, resolve);
		});
	});

	onLoad = vi
		.fn()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.mockImplementation((_el: unknown, resolve: () => void) => {
			this.status.value = Statuses.loaded;
			resolve();
		});

	onError = vi
		.fn()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.mockImplementation((_reject: (message: string) => void) => {});
}
