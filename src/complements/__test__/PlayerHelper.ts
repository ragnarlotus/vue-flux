import { VueFluxConfig } from '../../components/VueFlux/types';
import { Player } from '../../controllers/Player';
import { ResourceIndex } from '../../repositories/Resources/types';
import { TransitionIndex } from '../../repositories/Transitions/types';
import { Img } from '../../resources';
import { Blinds2D } from '../../transitions';

export const vueFluxConfig = {
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

export function setCurrentResource(player: Player, caption?: string) {
	player.resource.current = {
		index: 0,
		rsc: new Img('url', caption),
		options: {},
	} as ResourceIndex;
}

export function setCurrentTransition(player: Player) {
	player.transition.current = {
		index: 0,
		component: Blinds2D,
		options: {},
	} as TransitionIndex;
}
