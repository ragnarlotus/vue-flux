import { CSSProperties } from 'vue';
import { Resource } from '../../../resources';
import { Size, Position } from '../../../shared';
import { SidesColors, SidesResources } from '../../FluxCube/types';
import { FluxGridTileProps } from '../types';

export function getRowNumber(tileNumber: number, numCols: number) {
	return Math.floor(tileNumber / numCols);
}

export function getColNumber(tileNumber: number, numCols: number) {
	return tileNumber % numCols;
}

export default class GridTileFactory {
	static getProps(
		grid: {
			numRows: number;
			numCols: number;
			numTiles: number;
			size: Size;
			depth: number;
			color?: CSSProperties['color'];
			colors?: SidesColors;
			rsc?: Resource;
			rscs?: SidesResources;
		},
		tile: {
			number: number;
			size: Size;
			css?: CSSProperties;
		}
	) {
		let { width, height } = tile.size.toValue();

		const row = getRowNumber(tile.number, grid.numCols);
		const col = getColNumber(tile.number, grid.numCols);

		const props: FluxGridTileProps = {
			color: grid.color,
			colors: grid.colors,
			rsc: grid.rsc,
			rscs: grid.rscs,
			size: grid.size,
			depth: grid.depth,
			offset: new Position({
				top: row * height!,
				left: col * width!,
			}),
		};

		if (row + 1 === grid.numRows) {
			height = grid.size.height.value! - row * height!;
		}

		if (col + 1 === grid.numCols) {
			width = grid.size.width.value! - col * width!;
		}

		props.viewSize = new Size({
			width,
			height,
		});

		props.css = {
			...tile.css,
			position: 'absolute',
			...props.offset.toPx(),
			zIndex:
				tile.number + 1 < grid.numTiles / 2
					? tile.number + 1
					: grid.numTiles - tile.number,
		};

		return props;
	}
}
