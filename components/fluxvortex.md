# FluxVortex

### Description

Component to make an image formed by concentric circles.

### Component

Makes an image to be divided in concentric circles.

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component responsible of this cube |
| numCircles | Number | true | The number of circles to be divided into |
| index | Number, String | true | If a number represents the image index of slider and if string of hexadecimal will just paint it with the defined color |

**Example:**

```markup
<flux-vortex :slider="slider" :num-circles="5" :index="1"></flux-vortex>
```

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| setCss | css | Object with the style to be applied to vortex container |
| transform | func | Runs a transform function for each circle, receiving as parameter the circle and number |

