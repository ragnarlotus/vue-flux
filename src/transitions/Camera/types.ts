import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface CameraProps extends TransitionProps {}

export interface CameraConf extends TransitionConf {
	circles: number;
	backgroundColor: CSSProperties['color'];
}
