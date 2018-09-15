# FluxThumb

### Description

Component to display a miniature of an image.

### Component

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component responsible of this cube |
| index | Number, String | true | If a number represents the image index of slider and if string of hexadecimal will just paint it with the defined color |
| css | Object | false | Style rules to be applied |

**Example:**

```markup
<flux-thumb :slider="slider" :index="1"></flux-thumb>
```

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| setCss | css | Object with the style to be applied to the thumb |

