import Resource from '../resources/Resource';

enum Sides {
	front = 'front',
	back = 'back',
	top = 'top',
	bottom = 'bottom',
	left = 'left',
	right = 'right',
}

interface Offsets {
	[Sides.front]?: number;
	[Sides.back]?: number;
	[Sides.top]?: number;
	[Sides.bottom]?: number;
	[Sides.left]?: number;
	[Sides.right]?: number;
}

type Offset = number | Offsets;

interface VueFluxConfig {
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

interface ResourceIndex {
	index: number;
	rsc: Resource;
}

enum ResourceStatus {
	notLoaded = 'notLoaded',
	loading = 'loading',
	loaded = 'loaded',
	error = 'error',
}
