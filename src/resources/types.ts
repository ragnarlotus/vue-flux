import { Component } from 'vue';
import { Resource } from '.';

/* eslint-disable no-unused-vars */
export type ResizeType = 'fill' | 'fit';

export interface ResizedProps {
	width: number;
	height: number;
	top: number;
	left: number;
}

export interface DisplayParameter {
	component: Component;
	props: {};
}

export interface TransitionParameter {
	component: Component;
	props: {};
}

export interface ResourceWithOptions {
	resource: Resource;
	options: {
		delay?: number;
		stop?: boolean;
	};
}
