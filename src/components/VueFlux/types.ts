/* eslint-disable no-unused-vars */
import { Component } from 'vue';
import { Resource, ResourceWithOptions } from '../../resources';
import { TransitionWithOptions } from '../../transitions';
import {
	Direction,
	PlayerResource,
	PlayerTransition,
} from '../../controllers/Player';

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
	(e: 'options-updated'): void;
	(e: 'transitions-updated'): void;
	(e: 'resources-preload-start'): void;
	(e: 'resources-preload-end'): void;
	(e: 'resources-lazyload-start'): void;
	(e: 'resources-lazyload-end'): void;
	(e: 'fullscreen-enter'): void;
	(e: 'fullscreen-exit'): void;
	(
		e: 'transition-start',
		resource: PlayerResource,
		transition: PlayerTransition
	): void;
	(
		e: 'transition-cancel',
		resource: PlayerResource,
		transition: PlayerTransition
	): void;
	(
		e: 'transition-end',
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
