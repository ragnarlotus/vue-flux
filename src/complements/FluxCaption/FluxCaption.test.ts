import { VueFluxConfig, VueFluxEmits } from '../../components';
import { Player, Timers } from '../../controllers';
import FluxCaption from './FluxCaption.vue';
import { mount } from '@vue/test-utils';

vi.mock('../../controllers/Player/Player.ts');

describe('complements: FluxCaption', () => {
	const config = {
		allowFullscreen: false,
		allowToSkipTransition: true,
		aspectRatio: '16:9',
		autohideTime: 2500,
		autoplay: false,
		bindKeys: false,
		delay: 5000,
		enableGestures: false,
		infinite: true,
		lazyLoad: true,
		lazyLoadAfter: 5,
	} as VueFluxConfig;

	const timers = new Timers();

	const emit = {} as VueFluxEmits;

	it.skip('should mount properly without slot', () => {
		const player = new Player(config, timers, emit);

		const wrapper = mount(FluxCaption, {
			props: {
				player,
			},
		});

		expect(
			wrapper.html().includes('<polyline points="36,18 78,50 36,82"')
		).toBeTruthy();
	});
});
