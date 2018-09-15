# FluxIndex

### Description

It is a default component to diplay an index of all images so it is a good resource when the slider contains many images.

You can place it inside the vue-flux component or outside and give it any style you want, meaning horizontal, vertical, with arrows, with scroll, etc. The default style is only applied if located inside and can be easily overwritten.

The slot can be used with custom index component.

### Component

It will display a button when no transition is active and mouse over. Will not be displayed in touchable screens but will appear dragging up inside the slider.

The index will auto hide after choosing an image with default styles.

The current image will have class current.

Placing the mouse over will display de caption if defined.

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component |

**Example:**

```markup
<vue-flux :options="fluxOptions" :images="fluxImages" :transitions="fluxTransitions" ref="slider">
    <flux-index slot="index" :slider="$refs.slider"></flux-index>
</vue-flux>
```

