<script setup lang="ts">
	import { ref, computed, nextTick } from 'vue';
	import FluxButton from '@/components/FluxButton.vue';

	const $list = ref(null);

	const props = defineProps({
		mouseOver: {
			type: Object,
			required: true,
		},

		displaySize: {
			type: Object,
			required: true,
		},

		resources: {
			type: Object,
			required: true,
		},

		player: {
			type: Object,
			required: true,
		},
	});

	const visible = computed(() => props.resources.list.length > 0);

	const button = {
		rectSize: 12,
		rectangles: [],
		visible: computed(() => props.mouseOver.value),

		setup: () => {
			const rows = 3;
			const cols = 3;
			const padding = 6;

			let rowsGap =
				(100 - padding * 2 - button.rectSize * rows) / (rows + 1);

			let colsGap =
				(100 - padding * 2 - button.rectSize * cols) / (cols + 1);

			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					button.rectangles.push({
						x: padding + rowsGap + rowsGap * r + button.rectSize * r,
						y: padding + colsGap + colsGap * c + button.rectSize * c,
					});
				}
			}
		},
	};

	const buttonVisible = button.visible;

	const list = {
		animationTime: 500,
		visible: ref(false),

		class: computed(() => {
			const htmlClass = [];

			if (list.visible.value) {
				htmlClass.push('visible');
			}

			if (props.mouseOver.value) {
				htmlClass.push('mouse-over');
			}

			return htmlClass;
		}),

		show: () => {
			props.player.stop();
			list.visible.value = true;

			nextTick(() => {
				$list.value.clientHeight;
				$list.value.style.marginTop = 0;
			});
		},

		hide: (index = null) => {
			$list.value.clientHeight;
			$list.value.style.marginTop = '100%';

			setTimeout(() => {
				list.visible.value = false;

				if (index !== null) {
					props.player.show(index);
				}
			}, list.animationTime);
		},
	};

	const listClass = list.class;

	const thumbs = {
		size: computed(() => {
			let { width, height } = props.displaySize;

			width = width / 4.2;
			height = (width * 90) / 160;

			if (width > 160) {
				width = 160;
				height = 90;
			}

			return {
				width,
				height,
			};
		}),

		getClass: (index) => {
			return props.player.resource.current !== null &&
				props.player.resource.current.index === index
				? 'current'
				: '';
		},
	};

	const thumbsSize = thumbs.size;

	const showResource = (index) => {
		if (list.visible.value) {
			list.hide(index);
			return;
		}

		props.player.show(index);
	};

	button.setup();
</script>

<template>
	<div v-if="visible" class="flux-index">
		<transition name="fade">
			<FluxButton
				v-if="buttonVisible"
				class="toggle bottom left"
				@click="list.show()"
			>
				<rect
					v-for="(coord, i) in button.rectangles"
					:key="i"
					:x="coord.x"
					:y="coord.y"
					:width="button.rectSize + 'px'"
					:height="button.rectSize + 'px'"
				/>
			</FluxButton>
		</transition>

		<nav :class="listClass" @click="list.hide()">
			<ul ref="$list">
				<li
					v-for="(rsc, index) in resources.list"
					:key="index"
					:class="thumbs.getClass(index)"
					@click="showResource(index)"
				>
					<component
						:is="rsc.display.component"
						:rsc="rsc"
						:size="thumbsSize"
						:title="rsc.caption"
					/>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style lang="scss">
	.vue-flux .flux-index {
		flex: none;
		margin-bottom: 2%;
		font-size: 0;
		text-align: center;

		.fade-enter,
		.fade-leave-to {
			opacity: 0;
		}

		.fade-enter-active,
		.fade-leave-active {
			transition: opacity 0.3s ease-in;
		}

		nav {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: block;
			margin: 0;
			overflow: hidden;
			visibility: hidden;
		}

		nav.visible {
			z-index: 101;
			visibility: visible;
		}

		ul {
			display: block;
			height: 100%;
			margin: 0;
			margin-top: 100%;
			padding: 24px 0 0 24px;
			list-style-type: none;
			text-align: center;
			overflow-y: auto;
			background-color: black;
			transition: all 0.5s linear;
			font-size: 0;
		}

		li {
			position: relative;
			display: inline-block;
			box-sizing: content-box;
			margin: 0 24px 24px 0;
			cursor: pointer;
			transition: all 0.3s ease;

			&:hover {
				box-shadow: 0px 0px 3px 2px rgba(255, 255, 255, 0.6);
			}

			&.current {
				cursor: auto;
				border: 1px solid white;
				box-shadow: none;
			}
		}
	}
</style>
