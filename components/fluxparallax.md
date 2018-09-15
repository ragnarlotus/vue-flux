# FluxParallax

### Description

Creates a parallax effect given an image. It can recreate 3 types, relative, fixed and static.

**Relative**

This type is the default and moves the image with the defined offset when scrolling until reaches the edge.

**Fixed**

This is works pretty like the relative except because the image will not start moving until the whole image is visible.

**Static**

Creates window effect where the image remains static and can be viewed on scrolling, seeing the piece of the image revealed depding on the position of the scroll.

### Component

It has the CSS defined with display flex, position relative and overflow hidden.

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| src | String | true | The image URL to be displayed |
| holder | Object | false | Represents the object that should be watched for scrolling. By default is window |
| type | String | false | Depending on the type the effect will differ. Values can be relative, static and fixed, by default the type is relative |
| height | String | false | The height the image should have in pixels, by default is auto which means that will auto detect size by content or defined by CSS |
| offset | String | false | Is the amount of image hidden that will be displayed when scrolling. If set in percentage the amount of pixels will be calculated in reference of height. Default is 60% |

**Example:**

```markup
<flux-parallax src="slides/1.jpg" height="300px" offset="80%">
    <div>CONTENT</div>
</flux-parallax>
```

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| setCss | css | Object with the style to be applied directly |
| resize |  | Recalculates the sizes |



