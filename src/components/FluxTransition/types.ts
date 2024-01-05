import { type Component, Ref } from 'vue';
import { Resource } from '../../resources';
import { Size } from '../../shared';
import { FluxComponent } from '../types';

export interface FluxTransitionProps {
	size: Size;
	transition: object;
	from: Resource;
	to: Resource;
	displayComponent?: null | FluxComponent;
	options?: object;
}

export type TransitionComponent = Ref<
	| null
	| (Component & {
			totalDuration: number;
			onPlay: () => void;
	  })
>;
