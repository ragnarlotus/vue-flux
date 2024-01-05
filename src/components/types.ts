import { CSSProperties, type Component } from 'vue';
import { Resource } from '../resources';
import { Size, Position } from '../shared';

export interface ComponentProps {
	color?: CSSProperties['color'];
	rsc?: Resource;
	size: Size;
	viewSize?: Size;
	offset?: Position;
	css?: CSSProperties;
}

export interface ComponentStyles {
	base?: CSSProperties;
	color?: CSSProperties;
	rsc?: CSSProperties;
	size?: CSSProperties;
}

export type FluxComponent = Component & {
	setCss: (s: CSSProperties) => void;
	transform: (s: CSSProperties) => void;
	show: () => void;
	hide: () => void;
};
