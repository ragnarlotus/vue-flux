import { Component } from 'vue';
import Resource from '../../resources/Resource';

export interface Options {
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

export interface TransitionWithOptions {
	component: Component;
	options: object;
}

export interface Props {
	options?: Options;
	rscs: Resource[];
	transitions: (Component | TransitionWithOptions)[];
}

export interface Config {
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
