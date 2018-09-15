# FluxCube

### Description

Component composed by FluxImages that form a cube.

### Component

Represents a set of images that renders as a 6 sides cube.

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component responsible of this cube |
| index | Object | true | An object containing the sides indexes |
| css | Object | false | Initial CSS style, by default sets top 0 and left 0 |

**Example:**

```markup
<flux-cube
   :slider="slider"
   :index="{front: 1, top: 2, left: '#ccc', right: '#ccc'}"
   :css="{width: '300px', height: '300px'}">
</flux-cube>
```

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| setCss | css | Object with the style to be applied directly |
| transform | css | Object with the style to be applied rendering, used to perform the transitions |
| turn | direction, to | Turns the cube to specified direction \(top, back, bottom, left, right\) with to side \(left or right\) |
| turnTop |  | Turns the cube to top |
| turnBack | to | Turns the cube back side, to left or to right |
| turnBottom |  | Turns the cube to bottom |
| turnLeft |  | Turns the cube to left |
| turnRight |  | Turns the cube to right |

