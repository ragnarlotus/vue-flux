# FluxPagination

### Description

It is a default component to diplay a pagination of the images, good when it does not contain too many images.

### Component

The component can have the following attributes.

| Attribute | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| slider | Object | true | The VueFlux component |

**Example:**

```markup
<vue-flux :options="fluxOptions" :images="fluxImages" :transitions="fluxTransitions" ref="slider">
    <flux-pagination slot="pagination" :slider="$refs.slider"></flux-pagination>
</vue-flux>
```



