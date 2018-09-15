# FluxCaption

### Description

It is a default component to diplay image caption.

The slot can be overwritten with custom caption.

### Component

It will display the caption when no transition is active and is defined for current image.

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component |

**Example:**

```markup
<vue-flux :options="fluxOptions" :images="fluxImages" :transitions="fluxTransitions" :captions="fluxCaptions" ref="slider">
    <flux-caption slot="caption" :slider="$refs.slider"></flux-caption>
</vue-flux>
```

**Captions are passed to vue-flux component instead of this because they are used in multiple components and will be available even if this component is not used.**

### Properties

This are the component properties that you can access programatically.

| Name | Type | Description |
| :--- | :--- | :--- |
| captions | Array | Array of strings for image captions |
| caption | String | Returns the current image caption or empty string |

