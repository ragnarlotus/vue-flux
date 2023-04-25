/* eslint-disable no-unused-vars */
export type ResizeType = 'fill' | 'fit';

export enum ResourceStatus {
	notLoaded = 'notLoaded',
	loading = 'loading',
	loaded = 'loaded',
	error = 'error',
}

export interface DisplayParamenter {
	component: Object;
	props: {};
}

export interface TransitionParameter {
	component: Object;
	props: {};
}
