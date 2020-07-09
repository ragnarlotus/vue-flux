import Dom from '@/libraries/Dom';

describe('Dom', () => {
	let div, element;

	beforeEach(() => {
		window.getComputedStyle = jest.fn().mockReturnValue({
			width: '640px',
			height: '480px',
		});

		element = document.createElement('div');
		element.style.width = '640px';
		element.style.height = '480px';
		document.body.appendChild(element);

		div = new Dom(element);
	});

	afterEach(() => {
		document.body.removeChild(element);
	});

	test('gets the size', () => {
		expect(div.size).toEqual({
			width: 640,
			height: 480,
		});
	});

	test('gets size from static method', () => {
		expect(Dom.sizeFrom(div)).toEqual({
			width: 640,
			height: 480,
		});
	});

	test('gets width', () => {
		expect(div.getWidth()).toBe(640);
	});

	test('gets height', () => {
		expect(div.getHeight()).toBe(480);
	});

});
