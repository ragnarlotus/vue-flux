import { CSSProperties } from 'vue';
import { Size } from '../../shared';
import { floor } from '../../shared/Maths';
import GridTileCreator from './GridTileCreator';
import { TileProps } from './types';
import { SidesColors, SidesResources } from '../FluxCube/types';
import { Resource } from '../../resources';

export function getRowNumber(row: number, numCols: number) {
	return floor(row / numCols);
}

export function getColNumber(col: number, numCols: number) {
	return col % numCols;
}

export default class GridCreator {
	static getTilesProps({
		numRows,
		numCols,
		size,
		depth,
		color,
		colors,
		rsc,
		rscs,
		tileCss,
	}: {
		numRows: number;
		numCols: number;
		size: Size;
		depth: number;
		color?: string;
		colors?: SidesColors;
		rsc?: Resource;
		rscs?: SidesResources;
		tileCss?: CSSProperties;
	}) {
		const numTiles = numRows * numCols;

		const tileSize = new Size({
			width: floor(size.width.value! / numCols),
			height: floor(size.height.value! / numRows),
		});

		const props: TileProps[] = [];

		for (let i = 0; i < numTiles; i++) {
			const row = getRowNumber(i, numCols);
			const col = getColNumber(i, numCols);

			const tileProps = GridTileCreator.getProps({
				tile: i,
				numTiles,
				row,
				numRows,
				col,
				numCols,
				gridSize: size,
				size: tileSize,
				depth,
				color,
				colors,
				rsc,
				rscs,
				css: tileCss,
			});

			props.push(tileProps);
		}

		return props;
	}
}
