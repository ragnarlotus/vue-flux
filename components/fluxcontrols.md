# FluxControls

### Description

It is a default component to diplay controls with buttons to display previous, next, play and pause.

The slot can be overwritten with custom controls.

### Component

It will display the buttons when no transition is active and mouse over. Will not be displayed in touchable screens.

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component |

**Example:**

```markup
<vue-flux :options="fluxOptions" :images="fluxImages" :transitions="fluxTransitions" ref="slider">
    <flux-controls slot="controls" :slider="$refs.slider"></flux-controls>
</vue-flux>
```



