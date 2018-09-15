# VueFlux

### Description

This is the main component of the slider and will be the view that display the images.

### Component

The slider preloads all images to make transitions smooth, so depending on size and quantity of images can take a while to begin.

The component is build as a container, having a mask that renders and display the images. The mask contains the transition component and two FluxImages that are used to be shown before and after transitions.

In touchable screens you can slide right and left to show previous or next image. Will also display index if defined sliding up.

The component has the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| options | Object | false | An object containing the slider options |
| transitions | Object | true | An object defined with the wanted transitions |
| transitionOptions | Object | false | The options for each transition |
| path | String | false | Base path of the images |
| images | Array | false | An array with the images URL |
| captions | Array | false | An array with captions to be displayed on each image |

**Example:**

```markup
<vue-flux
   :options="fluxOptions"
   :images="fluxImages"
   :transitions="fluxTransitions"
   :captions="fluxCaptions"
   ref="slider">
</vue-flux>

<button @click="$refs.slider.showImage('next')">NEXT</button>
```

### Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| autoplay | Boolean | false | Autoplay images when loaded |
| fullscreen | Boolean | false | Allows the lisder to be displayed in full screen |
| bindKeys | Boolean | false | Binds the arrow keys to show next or previous |
| delay | Integer | 5000 | The time in ms that an image will be displayed before changing to next |
| width | String | 100% | Defines the slider width |
| height | String | auto | Defines the slider height, if auto then will resize to have 16:9 ratio |

### Transitions

This is an object that will own the transitions to be used between images. The object is build using the transition name and its component.

The transitions will be run in the order defined and then will begin again from the first.

The transitions have a direction being 'right' by default and using 'left' when next image is previous so different transitions can be run depending on direction.

Slider will ignore any interaction while a transition is running.

Refer to [Transitions](https://github.com/deulos/vue-flux/wiki/Current-Transitions) to know more about included transitions.

**Example:**

```javascript
import { VueFlux, Transitions } from 'vue-flux';

let fluxTransitions: {
   transitionFade: Transitions.transitionFade,
   transitionBook: Transitions.transitionBook,
   transitionBlocks2: Transitions.transitionBlocks2
}
```

### Transition options

This is an object with the options that will overwrite the default of transitions.

**Example:**

```javascript
let transitionOptions: {
   transitionFade: {
      totalDuration: 500,
      easing: 'ease'
   },
   transitionBlocks2d2: {
      numRows: 5,
      numCols: 5,
      tileDelay: 150
   }
}
```

### Path

Is the base path of the images. For example if all the images are located in /img/slide/example you can set it and then in the images array just use the file names.

### Images

The array containing the image URLs to be displayed.

### Properties

This are the component properties that you can access programatically.

| Name | Type | Description |
| :--- | :--- | :--- |
| config | Object | Set of slider options |
| size | Object | Size in pixels having width and height |
| loaded | Boolean | Determines if the images have been loaded and slider is initialized |
| transition | Object | Manages current and last transition |
| imagesLoaded | Number | Number of images loaded |
| loaded | Boolean | Indicates when all the images have been preloaded |
| properties | Array | Array of objects that have the images properties |
| touchable | Boolean | Returns if the screen is touchable |
| caption | Component | The caption component |
| controls | Component | The controls component |
| index | Component | The index component |
| pagination | Component | The pagination component |
| mask | HTML | References the slider mask container where the images are displayed |
| sizePx | Object | An object having width and height in pixels with the 'px' unit |
| loadPct | Number | Porcentage of images already loaded |
| currentImage | FluxImage | Image component being displayed currently |
| nextImage | FluxImage | Image component that will be displayed next |
| nextTransition | String | Name of the next transition |
| direction | String | By default is 'right', and 'left' when next image is before the current |

### References

| Name | Element | Description |
| :--- | :--- | :--- |
| container | div | Container of all the slider |
| mask | div | Wrapper having the transition and control images |
| transition | component | Transition component that runs to change image |
| image1 | FluxImage | Image to be displayed before or after the transition |
| image2 | FluxImage | Image to be displayed before or after the transition |

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| setOptions | options | Object with options to be set |
| setTransitions | transitions | Object with transitions to be set |
| resize |  | Call to recalculate the sizes of the slider |
| inFullscreen |  | Returns if slider is currently in full screen |
| requestFullscreen |  | Sets the slider in full screen |
| exitFullscreen |  | Leaves the full screen mode |
| toggleFullscreen |  | Toggles full screen mode |
| play | index | Will start displaying the images by the interval specified in config. The index is the image number to start with, and can also be 'previous' and 'next' |
| stop |  | Stops playing images and remains in the current |
| toggleAutoplay |  | Toggles auto play |
| getIndex | index | Will return the position in the array given a number or a string \('next' or 'previous'\) |
| showImage | index, transition | Displays the image specified by image index \(or 'next' or 'previous'\) and using the specified transition. If no index specified will display next and if no transition specified will use the next defined in transitions |



