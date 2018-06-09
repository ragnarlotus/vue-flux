## Overview

This is an image slider developed with [Vuejs](https://vuejs.org/) 2 which comes with 16 cool transitions out of the box.

## Demo

You can view a [demo here](https://deulos.github.io/vue-flux/).

### Features
| Feature | Description |
|---------|-------------|
| Responsive | The slider and the images are adapted to container to fill it always |
| Compatibility | Supported by all major browsers |
| Expandable | You can add your custom transitions very easily |
| Customization | Many customizations to suit most needs |

## Quickstart

``` bash
npm install --save vue-flux
```

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

## Performance

Weight is just 44KB so is pretty light having only the essential CSS. It also does not require a high end computer as animations are performed with CSS3 hardware acceleration.

## Included transitions
* Fade: fades from one image to next.
* Swipe: swipes the image to display next like uncovered with a curtain.
* Slide 2D: slides the image horizontally revealing the next.
* Slide 3D: turns the image to a side like if place in a cube.
* Bars 2D: divides the image in bars and drops them down in turns.
* Bars 3D: makes the image 3D and divides it in slices that turn vertically to display the next image.
* Zip: divides the image in bars and slides them up and down alternately like a zip.
* Blinds 2D: divides the image in vertical bars that blinds and fades out.
* Blinds 3D: divides the image in vertical bars that blinds 180 deg to form the next image.
* Turn 3D: makes the effect of turning a page to display next image.
* Blocks 2D 1: the image is splited in blocks that shrink and fade out randomly.
* Blocks 2D 2: the image is splited in blocks that shrink and fade out in wave from a corner to the opposite.
* Blocks 3D: the image is splited in blocks that turn 180 deg horizontally to form next image.
* Concentric: a concentric effect is performed by rotating the image converted into circles.
* Warp: a concentric effect is performed by rotating the image converted into circles in alternate direction.
* Camera: from outside to inside the image is being cropped like in a camera lens.

## Troubleshooting

If you find yourself running into issues during installation or running the slider, please check our [Wiki](https://github.com/deulos/vue-flux/wiki). If still needs help open an [issue](https://github.com/deulos/vue-flux/issues/new). We would be happy to discuss how they can be solved.

## Documentation

You can view the full documentation at the project's [Wiki](https://github.com/deulos/vue-flux/wiki) with examples and detailed information.

## Inspiration

This slider was inspired by [Flux Slider](http://joelambert.co.uk/flux/).

## Contributing

Contributions, questions and comments are all welcome and encouraged.
