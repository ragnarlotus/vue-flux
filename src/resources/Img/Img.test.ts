/* eslint-disable vitest/no-hooks */
import { FluxImage } from '../../components';
import ResizeTypes from '../ResizeTypes';
import Statuses from '../Statuses';
import { DisplayParameter, ResizeType, TransitionParameter } from '../types';
import Img from './Img';

describe('resources: Img', () => {
	let img,
		src: string,
		caption: string,
		resizeType: ResizeType,
		backgroundColor: string,
		promise: Promise<void>,
		resolve: () => void,
		reject: (message: string) => void;

	beforeEach(() => {
		src = 'src';
		caption = 'caption';
		resizeType = ResizeTypes.fill;
		backgroundColor = '#ccc';
	});

	it('creates the instance properly with default params', () => {
		img = new Img(src);

		expect(img.src).toBe(src);
		expect(img.caption).toBe('');
		expect(img.resizeType).toBe(ResizeTypes.fill);
		expect(img.backgroundColor).toBeNull();
	});

	it('creates the instance properly with custom params', () => {
		img = new Img(src, caption, resizeType, backgroundColor);

		expect(img.src).toBe(src);
		expect(img.caption).toBe(caption);
		expect(img.resizeType).toBe(resizeType);
		expect(img.backgroundColor).toBe(backgroundColor);
	});

	it('creates the instance with the required parameters of abstract Resource', () => {
		img = new Img(src);

		expect(img.display).toStrictEqual({
			component: FluxImage,
			props: {},
		} as DisplayParameter);

		expect(img.transition).toStrictEqual({
			component: FluxImage,
			props: {},
		} as TransitionParameter);

		expect(img.errorMessage).toBe(`Image ${src} could not be loaded`);
	});

	it('returns a promise and sets it to property loader', () => {
		img = new Img(src);

		promise = img.load();
		expect(promise).toBeTypeOf('object');
		expect(img.loader).toBe(promise);
	});

	it('changes the status to loading', () => {
		img = new Img(src);
		img.load();

		expect(img.status.value).toBe(Statuses.loading);
	});

	it('returns the loader if already request to load', () => {
		img = new Img(src);
		promise = img.load();

		expect(img.load()).toBe(promise);
	});

	it.todo('calls onLoad when load success');

	it('sets reals size on load', () => {
		src = '/imgs/pixel.png';
		img = new Img(src);

		const htmlImage = new Image();
		htmlImage.width = 640;
		htmlImage.height = 480;

		resolve = vi.fn();
		img.onLoad(htmlImage, resolve);

		expect(img.realSize.toValue()).toStrictEqual({ width: 640, height: 480 });
	});

	it('sets status loaded on load', () => {
		src = '/imgs/pixel.png';
		img = new Img(src);

		const htmlImage = new Image();
		htmlImage.width = 640;
		htmlImage.height = 480;

		resolve = vi.fn();
		img.onLoad(htmlImage, resolve);

		expect(img.status.value).toBe(Statuses.loaded);
	});

	it('calls promise resolve on load', () => {
		src = '/imgs/pixel.png';
		img = new Img(src);

		const htmlImage = new Image();
		htmlImage.width = 640;
		htmlImage.height = 480;

		resolve = vi.fn();
		img.onLoad(htmlImage, resolve);

		expect(resolve).toHaveBeenCalledOnce();
	});

	it.todo('calls onError when load fails');

	it('sets the status to error on error', () => {
		img = new Img(src);

		reject = vi.fn();
		img.onError(reject);

		expect(img.status.value).toBe(Statuses.error);
	});

	it('performs promise reject on error', () => {
		img = new Img(src);

		reject = vi.fn();
		img.onError(reject);

		expect(reject).toHaveBeenCalledWith(img.errorMessage);
	});
});
