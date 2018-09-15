# FluxImage

### Description

The FluxImage component represents the smallest part of the slider and displays an image, part of it or a color.

### Component

It renders what have to be displayed calculating its size and position automatically.

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component responsible of this image |
| index | Number, String | true | If a number represents the image index of slider and if string of hexadecimal will just paint it with the defined color |
| css | Object | false | Initial CSS style, by default sets top 0 and left 0 |

**Example:**

```markup
<flux-image :slider="slider" :index="1"></flux-image>
<flux-image :slider="slider" :index="'#cccccc'" :css="{opacity: 0.5}"></flux-image>
```

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| setCss | css | Object with the style to be applied directly |
| transform | css | Object with the style to be applied rendering, used to perform the transitions |
| show |  | Shows the image if hidden |
| hide |  | Hides the image |

