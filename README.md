# vue-flux

> A vue image slider inspired in [Flux Slider](http://joelambert.co.uk/flux/) using CSS3 hardware accceleration.

Supports all major browsers.
You can add custom transitions.
Hightly customizable.

### Installation

``` bash
npm install --save vue-flux
```

### Usage

``` html
<vue-flux
	:options="fluxOptions"
	:images="fluxImages"
	:transitions="fluxTransitions"
	ref="slider">
</vue-flux>

<button @click="$refs.slider.showImage('next')">NEXT</button>
```

``` javascript
import { VueFlux, Transitions } from 'vue-flux';
import 'vue-flux/dist/vue-flux.css';

export default {
	components: {
		'vue-flux': VueFlux
	},

	data: () => ({
		fluxOptions: {
			autoplay: true
		},
		fluxImages: [
			'URL1',
			'URL2',
			'URL3'
		],
		fluxTransitions: {
			transitionTurn3d: Transitions.transitionTurn3d
		}
	})
}
```

### Options

| Property | Default | Description
|----------|---------|------------|
| autoplay | false | Start displaying the images |
| fullscreen | false | Indicates if it should take all the screen |
| delay | 5000 | Delay between images in ms |
| showPagination | false | Show or hide pagination |
| paginationContent | 'index' | Pagination content |
| showControls | false | Show or hide controls to stop, play, next, prev and index |
| width | '100%' | The width of the slider |
| height | 'auto' | The height of the slider. If set to auto and height not defined then will take a 16:9 ratio height |

### Images
Just pass an array of image URLs

### Transitions
You need to pass an object with the transitions components.
This are the existing transitions and you can add you own:
- transitionFade
- transitionSwipe
- transitionConcentric
- transitionBars2d
- transitionBars3d
- transitionBlinds2d
- transitionBlinds3d
- transitionBlocks2d1
- transitionBlocks2d2
- transitionBlocks3d
- transitionSlide2d
- transitionSlide3d
- transitionTurn3d
- transitionCamera
- transitionWarp
- transitionZip
