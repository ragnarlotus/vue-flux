## Overview

This is an image slider developed with [Vuejs](https://vuejs.org/) 2 which comes with 20 cool transitions out of the box.

## Demo

You can view a [demo here](https://deulos.github.io/vue-flux/).

## Features
| Feature | Description |
|---------|-------------|
| Responsive | The slider and the images are adapted to container to fill it always |
| Compatibility | Supported by all major browsers |
| Expandable | You can add your custom transitions very easily |
| Customization | Total customizable to suit most needs |
| Gestures | Mobile friendly by gestures |
| Functionality | You can use arrow keys to navigate. Switch to full screen |
| Parallax | It includes a parallax component very easy to set up |

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

export default {
   components: {
      VueFlux
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
         transitionBook: Transitions.transitionBook
      }
   })
}
```

## Performance

Weight is just 77KB so is pretty light having only the essential CSS. It also does not require a high end computer as animations are performed with CSS3 hardware acceleration.

## Included transitions

#### 2D transitions
* Fade: fades from one image to next.
* Kenburn: fades, zoom and moves current image to next.
* Swipe: swipes the image to display next like uncovered with a curtain.
* Slide: slides the image horizontally revealing the next.
* Waterfall: divides the image in bars and drops them down in turns.
* Zip: divides the image in bars and slides them up and down alternately like a zip.
* Blinds 2D: divides the image in vertical bars that blinds and fades out.
* Blocks 1: the image is splited in blocks that shrink and fade out randomly.
* Blocks 2: the image is splited in blocks that shrink and fade out in wave from a corner to the opposite.
* Concentric: a concentric effect is performed by rotating the image converted into circles.
* Warp: a concentric effect is performed by rotating the image converted into circles in alternate direction.
* Camera: from outside to inside the image is being cropped like in a camera lens.

#### 3D transitions
* Cube: turns the image to a side like if place in a cube.
* Book: makes the effect of turning a page to display next image.
* Fall: The image falls in front displaying next image.
* Wave: makes the image 3D and divides it in slices that turn vertically to display the next image.
* Blinds 3D: divides the image in vertical bars that blinds 180 deg to form the next image.
* Round 1: the image is splited in blocks that turn 180 deg horizontally to form next image.
* Round 2: the image is splited in blocks that round vertically until disappear.
* Explode: the image is splited in blocks that explode revealing the next image.

## Parallax

``` html
<flux-parallax src="slides/1.jpg" height="300px" offset="80%" type="relative">
   <div>CONTENT</div>
</flux-parallax>
```

## Troubleshooting

If you find yourself running into issues during installation or running the slider, please check our [Wiki](https://github.com/deulos/vue-flux/wiki). If still needs help open an [issue](https://github.com/deulos/vue-flux/issues/new). We would be happy to discuss how they can be solved.

## Documentation

You can view the full documentation at the project's [Wiki](https://github.com/deulos/vue-flux/wiki) with examples and detailed information.

## Inspiration

This slider was inspired by [Flux Slider](http://joelambert.co.uk/flux/).

## Contributing

Contributions, questions and comments are all welcome and encouraged.
