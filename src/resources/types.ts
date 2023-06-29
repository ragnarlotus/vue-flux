import { Component } from 'vue';

/* eslint-disable no-unused-vars */
export type ResizeType = 'fill' | 'fit';

export interface ResizedProps {
	width: number;
	height: number;
	top: number;
	left: number;
}

export enum ResourceStatus {
	notLoaded = 'notLoaded',
	loading = 'loading',
	loaded = 'loaded',
	error = 'error',
}

export interface DisplayParamenter {
	component: Component;
	props: {};
}

export interface TransitionParameter {
	component: Component;
	props: {};
}
