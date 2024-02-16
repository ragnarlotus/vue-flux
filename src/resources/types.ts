import { Component } from 'vue';
import { Resource } from '.';
import ResizeTypes from './ResizeTypes';

/* eslint-disable no-unused-vars */
export type ResizeType = keyof typeof ResizeTypes;

export interface ResizedProps {
	width: number;
	height: number;
	top: number;
	left: number;
}

export interface DisplayParameter {
	component: Component;
	props: object;
}

export interface TransitionParameter {
	component: Component;
	props: object;
}

export interface ResourceWithOptions {
	resource: Resource;
	options: {
		delay?: number;
		stop?: boolean;
	};
}
