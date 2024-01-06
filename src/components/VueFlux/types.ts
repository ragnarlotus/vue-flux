/* eslint-disable no-unused-vars */
import { Resource, ResourceWithOptions } from '../../resources';
import { TransitionWithOptions } from '../../transitions';
import {
	Direction,
	PlayerResource,
	PlayerTransition,
} from '../../controllers/Player';
import { type Component } from 'vue';

export interface VueFluxOptions {
	allowFullscreen?: boolean;
	allowToSkipTransition?: boolean;
	aspectRatio?: string;
	autohideTime?: number;
	autoplay?: boolean;
	bindKeys?: boolean;
	delay?: number;
	enableGestures?: boolean;
	infinite?: boolean;
	lazyLoad?: boolean;
	lazyLoadAfter?: number;
}

export interface VueFluxProps {
	options?: VueFluxOptions;
	rscs: (Resource | ResourceWithOptions)[];
	transitions: (Component | TransitionWithOptions)[];
}

export interface VueFluxEmits {
	(e: 'created'): void;
	(e: 'mounted'): void;
	(e: 'unmounted'): void;
	(e: 'play', resourceIndex: number | Direction, delay?: number): void;
	(e: 'stop'): void;
	(e: 'show', resource: PlayerResource, transition: PlayerTransition): void;
	(e: 'optionsUpdated'): void;
	(e: 'transitionsUpdated'): void;
	(e: 'resourcesPreloadStart'): void;
	(e: 'resourcesPreloadEnd'): void;
	(e: 'resourcesLazyloadStart'): void;
	(e: 'resourcesLazyloadEnd'): void;
	(e: 'fullscreenEnter'): void;
	(e: 'fullscreenExit'): void;
	(
		e: 'transitionStart',
		resource: PlayerResource,
		transition: PlayerTransition
	): void;
	(
		e: 'transitionCancel',
		resource: PlayerResource,
		transition: PlayerTransition
	): void;
	(
		e: 'transitionEnd',
		resource: PlayerResource,
		transition: PlayerTransition
	): void;
}

export interface VueFluxConfig {
	allowFullscreen: boolean;
	allowToSkipTransition: boolean;
	aspectRatio: string;
	autohideTime: number;
	autoplay: boolean;
	bindKeys: boolean;
	delay: number;
	enableGestures: boolean;
	infinite: boolean;
	lazyLoad: boolean;
	lazyLoadAfter: number;
}
