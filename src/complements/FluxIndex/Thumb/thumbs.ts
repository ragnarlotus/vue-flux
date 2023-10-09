import { computed } from 'vue';
import { Player } from '../../../controllers';
import Size from '../../../shared/Size';

export default function useThumbs(displaySize: Size, player: Player) {
	const size = computed<Size>(() => {
		let { width, height } = displaySize.toRaw();

		width = width! / 4.2;
		height = (width * 90) / 160;

		if (width > 160) {
			width = 160;
			height = 90;
		}

		return new Size({
			width,
			height,
		});
	});

	function getClass(index: number) {
		const { current } = player.resource;

		if (current === null) {
			return '';
		}

		if (current.index !== index) {
			return '';
		}

		return 'current';
	}

	return { size, getClass };
}
