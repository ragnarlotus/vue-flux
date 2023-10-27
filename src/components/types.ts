import { CSSProperties } from 'vue';
import Resource from '../resources/Resource';
import Size from '../shared/Size';
import { Position } from '../shared';

export interface ComponentProps {
	color?: string;
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
