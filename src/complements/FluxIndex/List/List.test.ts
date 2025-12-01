import { Ref, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { Player, Timers } from '../../../controllers';
import List from './List.vue';
import { Size } from '../../../shared';
import emit from '../../../components/VueFlux/__test__/emit';
import { vueFluxConfig, setCurrentResource } from '../../__test__/PlayerHelper';
import Thumb from '../Thumb/Thumb.vue';
import ResourceFactory from '../../../resources/__test__/ResourceFactory';

vi.mock('../../../resources/Img/Img');
vi.mock('../../../shared/ResourceLoader/ResourceLoader');
vi.mock('../../../controllers/Player/Player');

describe('complements: FluxIndex List', () => {
	const timers = new Timers();
	const displaySize: Size = new Size({ width: 640, height: 360 });
	const mouseOver: Ref<boolean> = ref(false);

	beforeEach(() => {
		mouseOver.value = false;
	});

	it('mounts properly', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		expect(() => {
			mount(List, {
				props: {
					displaySize,
					player,
					mouseOver,
				},
			});
		}).not.toThrow();
	});

	it('is not visible by default', async () => {
		mouseOver.value = true;
		const player = new Player(vueFluxConfig, timers, emit);

		const wrapper = mount(List, {
			props: {
				displaySize,
				player,
				mouseOver,
			},
		});

		expect(wrapper.html().includes('nav class=""')).toBeTruthy();
	});

	it('shows the list when button clicked', async () => {
		mouseOver.value = true;
		const player = new Player(vueFluxConfig, timers, emit);

		const wrapper = mount(List, {
			props: {
				displaySize,
				player,
				mouseOver,
			},
		});

		await wrapper.vm.show();

		expect(wrapper.html().includes('nav class="visible"')).toBeTruthy();
	});

	it('does nothing if clicked resource is the same as current resource', async () => {
		mouseOver.value = true;
		const player = new Player(vueFluxConfig, timers, emit);
		const resources = ResourceFactory.create(10);
		await player.resources.update(resources, 10, displaySize);

		setCurrentResource(player);

		const wrapper = mount(List, {
			props: {
				displaySize,
				player,
				mouseOver,
			},
		});

		await wrapper
			.find({ ref: '$list' })
			.findAllComponents(Thumb)[0]
			.trigger('click');

		expect(player.show).not.toHaveBeenCalled();
	});
});
