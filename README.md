## Documentation and demos

**[Version 5 documentation](https://ragnarlotus.github.io/vue-flux-docs/documentation/v5/overview)**

**[Version 6 documentation](https://ragnarlotus.github.io/vue-flux-docs/documentation/v6/overview)**

**[Version 7 documentation](https://ragnarlotus.github.io/vue-flux-docs/documentation/v7/overview)**

**[Version 7 demos](https://ragnarlotus.github.io/vue-flux-docs/demos/demos)**

# Overview

This is an image slider developed with [vue](https://vuejs.org/) 3 which comes with 20 cool transitions out of the box.

![npm](https://img.shields.io/npm/v/vue-flux/latest.svg?style=flat-square)
![npm](https://img.shields.io/npm/dt/vue-flux.svg?style=flat-square)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/vue-flux/latest.svg?style=flat-square)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/vue-flux/latest.svg?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues-raw/ragnarlotus/vue-flux.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)

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

## Quick start

Install and save the package.

``` bash
npm install --save vue-flux@latest
```

Add component. This one has all the complements, so you can remove the ones you don't want.

``` html
<script setup>
   import { ref, shallowReactive } from 'vue';
   import {
      VueFlux,
      FluxCaption,
      FluxControls,
      FluxIndex,
      FluxPagination,
      FluxPreloader,
      Img,
      Book,
      Zip,
   } from 'vue-flux';
   import 'vue-flux/style.css';

   const $vueFlux = ref();

   const vfOptions = shallowReactive({
      autoplay: true,
   });

   const vfRscs = shallowReactive([
      new Img('URL1' 'img 1'),
      new Img('URL2' 'img 2'),
      new Img('URL3' 'img 3'),
   ]);

   const vfTransitions = shallowReactive([Book, Zip]);
</script>

<template>
   <VueFlux
      :options="vfOptions"
      :rscs="vfRscs"
      :transitions="vfTransitions"
      ref="$vueFlux">

      <template #preloader="preloaderProps">
         <FluxPreloader v-bind="preloaderProps" />
      </template>

      <template #caption="captionProps">
         <FluxCaption v-bind="captionProps" />
      </template>

      <template #controls="controlsProps">
         <FluxControls v-bind="controlsProps" />
      </template>

      <template #pagination="paginationProps">
         <FluxPagination v-bind="paginationProps" />
      </template>

      <template #index="indexProps">
         <FluxIndex v-bind="indexProps" />
      </template>
   </VueFlux>

   <button @click="$vueFlux.show('next')">NEXT</button>
</template>
```

## Performance

Weight is about 60 KB so is pretty light having only the essential CSS. It also does not require a high end computer as animations are performed with CSS3 hardware acceleration.

## Included transitions

#### 2D transitions

* Fade: fades from one image to next.
* Kenburn: fades, zoom and moves current image to next.
* Swipe: swipes the image to display next like uncovered with a curtain.
* Slide: slides the image horizontally revealing the next.
* Waterfall: divides the image in bars and drops them down in turns.
* Zip: divides the image in bars and slides them up and down alternately like a zip.
* Blinds 2D: divides the image in vertical bars that blinds and fades out.
* Blocks 1: the image is split in blocks that shrink and fade out randomly.
* Blocks 2: the image is split in blocks that shrink and fade out in wave from a corner to the opposite.
* Concentric: a concentric effect is performed by rotating the image converted into circles.
* Warp: a concentric effect is performed by rotating the image converted into circles in alternate direction.
* Camera: from outside to inside the image is being circled in black like a camera.

#### 3D transitions

* Cube: turns the image to a side like if place in a cube.
* Book: makes the effect of turning a page to display next image.
* Fall: the image falls in front displaying next image.
* Wave: makes the image 3D and divides it in slices that turn vertically to display the next image.
* Blinds 3D: divides the image in vertical bars that blinds 180 deg to form the next image.
* Round 1: the image is split in blocks that turn 180 deg horizontally to form next image.
* Round 2: panels start to round vertically revealing the next image in upper arrow form leaving trail.
* Explode: the image starts to explode from the center to outside.

## Parallax

As simple as this.

``` html
<script setup>
   import { FluxParallax, Img } from 'vue-flux';

   const rsc = new Img('URL1' 'img 1');
</script>

<template>
   <FluxParallax :rsc="rsc" style="height: 300px;">
      <div>CONTENT</div>
   </FluxParallax>
</template>
```

## Troubleshooting

If you find yourself running into issues during installation or running the slider, please check our [documentation](https://ragnarlotus.github.io/vue-flux-docs/documentation/v7/overview). If still needs help open an [issue](https://github.com/ragnarlotus/vue-flux/issues/new). I will be happy to discuss how they can be solved.

## Documentation

You can view the full documentation at the project's [documentation](https://ragnarlotus.github.io/vue-flux-docs/documentation/v7/overview) with examples and detailed information.

## Changelog

Check the [changelog](https://ragnarlotus.github.io/vue-flux-docs/documentation/v7/changelog) for update info.

## Inspiration

This slider was inspired by [Flux Slider](http://joelambert.co.uk/flux/).

## Contributing

Contributions, questions and comments are all welcome and encouraged.

Do not hesitate to send me your own transitions to add them to the slider.
