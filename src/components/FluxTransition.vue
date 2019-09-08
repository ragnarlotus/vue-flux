<template>
	<div class="mask" ref="mask">
		<component
			ref="transition"
			v-if="componentName && fullInit"
			:is="componentName"
			:size="size"
			:from="from"
			:to="to"
			:options="transition.options"
			@ready="transitionReady"

		/>
	</div>
</template>

<script>
	import * as transitions from '@/transitions';

	export default {
		name: 'FluxTransition',

		components: {
			...transitions,
		},

		data: () => ({
			baseStyle: {
				position: 'relative',
				overflow: 'hidden',
				perspective: 'none',
				zIndex: 1,
				ready: false,
				mounted: false,
				playing: false
			},
		}),

		props: {
			size: {
				type: Object,
				required: false,
			},

			transition: {
				type: [ String, Object ],
				required: true,
			},

			from: {
				type: [ String, Object ],
				required: true,
			},

			to: {
				type: [ String, Object ],
				required: true,
			},

			options: {
				type: Object,
				required: false,
			},
			
			bgReady: {
				type: Boolean,
				required: true,
			},
		},
		
		watch: {
			bgReady: {
				immediate: true, 
				handler (val, oldVal) {
					if (this.fullInit())
						this.play()
				}
			}
		},

		computed: {
			maskStyle() {
				let size = this.size;

				return {
					...this.baseStyle,
					width: size.width? size.width +'px' : '100%',
					height: size.height? size.height +'px' : '100%',
				};
			},

			componentName() {
				if (this.transition.component) {
					if (this.transition.name)
						return this.transition.name;

					let vfURL= 'https://deulos.github.com/vue-flux-docs/documentation-6/Components/VueFlux';

					throw new ReferenceError(`Transition undefined, check ${vfURL}`);
				}

				let name = this.transition.name || this.transition;
				name = 'Transition'+ name[0].toUpperCase() + name.slice(1);

				if (name in transitions === false) {
					name = this.transition.name || this.transition;
					throw new ReferenceError (`Transition ${name} does not exist`);
				}

				return name;
			},
		},

		created() {
			if (this.transition.component)
				this.$options.components[this.componentName] = this.transition.component;
		},

		mounted() {
			this.mounted = true
			
			if (this.fullInit())
				this.play()
		},

		methods: {
			
			transitionReady(){
				this.ready = true
				this.$emit('start');
				
				if (this.fullInit())
					this.play()
			}, 
			
			fullInit(){
				return this.ready && this.bgReady && this.mounted 
			},
			
			play() {

				if (!this.playing){
					this.playing = true
					this.$emit('startAlt');
					this.$refs.transition.play()
					
					setTimeout(() => {
						this.$emit('endAlt');
					}, this.getDuration());
					
				}
			},

			getDuration() {
				if (!this.$refs.transition)
					return 1;

				return this.$refs.transition.totalDuration;
			},
		}
	}
</script>

	<style scoped>
	.mask {
		transform: translate3d(0, 0, 0);
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		overflow: hidden;
		perspective: none;
		z-index: 1;
		width: 100%;
		height: 100%;
	}
</style>