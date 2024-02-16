import { mount } from '@vue/test-utils';
import { type Component, markRaw } from 'vue';
import { FluxComponent, FluxImage } from '../../components';
import { Img } from '../../resources';
import { Size } from '../../shared';

const size = markRaw(
	new Size({
		width: 640,
		height: 360,
	})
);

const from = new Img('from');
const to = new Img('to');

const maskStyle = {
	overflow: 'hidden',
	perspective: 'none',
	zIndex: 3,
};

const displayComponent = mount(markRaw(FluxImage), {
	props: {
		color: '#ccc',
		size: size,
	},
});

export default (component: Component, options: object = {}) => {
	return mount(component, {
		props: {
			size,
			from,
			to,
			options,
			maskStyle,
			displayComponent: displayComponent.vm as FluxComponent,
		},
	});
};
