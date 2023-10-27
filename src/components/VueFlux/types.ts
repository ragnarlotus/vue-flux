import { Component } from 'vue';
import { Resource } from '../../resources';
import { ResourceWithOptions } from '../../resources';
import { TransitionWithOptions } from '../../transitions';

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

export interface Props {
	options?: Options;
	rscs: (Resource | ResourceWithOptions)[];
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
