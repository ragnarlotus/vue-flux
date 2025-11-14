import { nextTick, type Ref, type Component } from 'vue';
import { Size } from '../../shared';
import type { VueFluxConfig, VueFluxEmits } from '../../components';

/**
 * Display
 * - Manages the DOM node used as display surface.
 * - Tracks current size and emits updates.
 * - Handles fullscreen enter/exit.
 * - Registers a stable window.resize listener and cleans it up.
 */
export default class Display {
	node: Ref<null | HTMLElement | Component>;
	config: VueFluxConfig | null;
	emit: null | VueFluxEmits = null;
	size: Size = new Size();

	// Stable listener (arrow property keeps `this` bound and reference constant)
	private onResize = () => {
		// fire-and-forget in case updateSize() is async
		void this.updateSize();
	};

	constructor(
		node: Ref<null | HTMLElement | Component>,
		config: VueFluxConfig | null = null,
		emit: null | VueFluxEmits = null,
	) {
		this.node = node;
		this.config = config;
		this.emit = emit;
	}

	/**
	 * Call once when the display becomes active/visible.
	 * Attaches the resize listener and performs an initial measurement.
	 */
	async mount() {
		// Attach with a stable reference and matching options
		window.addEventListener('resize', this.onResize, { passive: true });
		await nextTick();
		await this.updateSize();
	}

	/**
	 * Call when the display is being destroyed/hidden to avoid zombie listeners.
	 */
	unmount() {
		window.removeEventListener('resize', this.onResize);
	}

	/**
	 * Resolve the underlying HTMLElement if the Ref points to a Vue component.
	 */
	private getElement(): HTMLElement | null {
		const target = this.node?.value as any;

		if (!target) return null;

		// If it's already an HTMLElement
		if (target instanceof HTMLElement) return target;

		// If it's a Vue component instance, try common $el access
		if (target.$el instanceof HTMLElement) return target.$el as HTMLElement;

		// Vue 3 Functional refs sometimes expose .$el or .$?.subTree.el; be defensive.
		if (target.$?.subTree?.el instanceof HTMLElement) return target.$?.subTree?.el as HTMLElement;

		return null;
	}

	/**
	 * Measure the current size of the display surface.
	 */
	private measure(): { width: number; height: number } {
		const el = this.getElement();
		if (el) {
			const rect = el.getBoundingClientRect();
			const width = Math.max(0, Math.floor(rect.width));
			const height = Math.max(0, Math.floor(rect.height));
			return { width, height };
		}
		// Fallback to viewport size
		return { width: window.innerWidth, height: window.innerHeight };
	}

	/**
	 * Update the stored Size and notify listeners.
	 * Safe to call multiple times; debouncing is usually unnecessary for resize.
	 */
	async updateSize() {
		await nextTick();
		const { width, height } = this.measure();

		// Accommodate unknown Size API: try .set(w,h), else set fields.
		const s: any = this.size;
		if (typeof s.set === 'function') {
			s.set(width, height);
		} else {
			s.width = width;
			s.height = height;
		}

		if (this.emit) {
			try {
				// Emit a generic 'resize' event if available
				(this.emit as any)('resize', { width, height });
			} catch {
				// no-op if consumer doesn't support this event
			}
		}
	}

	/**
	 * Enter fullscreen on the display element.
	 */
	async enterFullScreen() {
		const el = this.getElement();
		if (!el) return;
		await el.requestFullscreen();

		if (this.emit !== null) {
			this.emit('fullscreenEnter');
		}
	}

	/**
	 * Exit fullscreen.
	 */
	async exitFullScreen() {
		await document.exitFullscreen();

		if (this.emit !== null) {
			this.emit('fullscreenExit');
		}
	}
}
