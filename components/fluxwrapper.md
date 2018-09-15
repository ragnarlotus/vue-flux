# FluxWrapper

### Description

A wrapper component used in some transitions to contain single or multiple images.

### Component

Just renders the content wrapped into this component so it is easier to manage and operate some transitions.

**Example:**

```markup
<flux-wrapper ref="wrapper">
   <flux-image :slider="slider" :index="0" ref="image0"></flux-image>
   <flux-image :slider="slider" :index="1" ref="image1"></flux-image>
</flux-wrapper>
```

### Methods

| Method | Parameters | Description |
| :--- | :--- | :--- |
| setCss | css | Object with the style to be applied directly |
| transform | css | Object with the style to be applied rendering, used to perform the transitions |

