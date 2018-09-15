# FluxGrid

### Description

Component to make an image grid.

### Component

Draws and composes a grid of cubes.

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component responsible of this cube |
| numRows | Number | true | The number of rows |
| numCols | Number | true | The number of cols |
| index | Object | true | An object containing the indexes of images to apply to the tile cubes |
| tileCss | Object | false | Initial tile CSS style |

**Example:**

```markup
<flux-grid :slider="slider" :num-rows="5" :num-cols="5" :index="2"></flux-grid>
```

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| setCss | css | Object with the style to be applied to grid container |
| transform | func | Runs a transform function for each tile, receiving as parameter the cube and number |

