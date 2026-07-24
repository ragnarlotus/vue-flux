import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import type { Ref, Component } from 'vue';
import Display from './Display';

const createNodeRef = (): Ref<HTMLElement | Component | null> => ({
        value: document.createElement('div'),
}) as Ref<HTMLElement | Component | null>;

describe('Display.updateSize', () => {
        let getComputedStyleMock: ReturnType<typeof vi.spyOn>;

        beforeEach(() => {
                getComputedStyleMock = vi.spyOn(window, 'getComputedStyle');
        });

        afterEach(() => {
                vi.restoreAllMocks();
        });

        it('calculates height from aspect ratio when height is auto/zero', async () => {
                getComputedStyleMock.mockReturnValue({
                        width: '200px',
                        height: 'auto',
                } as CSSStyleDeclaration);

                const display = new Display(createNodeRef(), { aspectRatio: '2:1' } as never, null);

                await display.updateSize();

                expect(display.size.height.value).toBeCloseTo(100);
        });

        it('preserves explicit height when provided', async () => {
                getComputedStyleMock.mockReturnValue({
                        width: '200px',
                        height: '150px',
                } as CSSStyleDeclaration);

                const display = new Display(createNodeRef(), { aspectRatio: '2:1' } as never, null);

                await display.updateSize();

                expect(display.size.height.value).toBeCloseTo(150);
        });
});
