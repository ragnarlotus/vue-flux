import { CSSProperties } from 'vue';
import { Resource } from '../../resources';
import { Size, Position } from '../../shared';
import { SidesColors, SidesResources } from '../FluxCube/types';
import { TileProps } from './types';

export default class GridTileCreator {
	static getProps({
		tile,
		numTiles,
		row,
		numRows,
		col,
		numCols,
		gridSize,
		size,
		depth,
		color,
		colors,
		rsc,
		rscs,
		css,
	}: {
		tile: number;
		numTiles: number;
		row: number;
		numRows: number;
		col: number;
		numCols: number;
		gridSize: Size;
		size: Size;
		depth: number;
		color?: string;
		colors?: SidesColors;
		rsc?: Resource;
		rscs?: SidesResources;
		css?: CSSProperties;
	}) {
		let { width, height } = size.toRaw();

		const props: TileProps = {
			color: color,
			colors: colors,
			rsc: rsc,
			rscs: rscs,
			size: size,
			offset: new Position({
				top: row * height!,
				left: col * width!,
			}),
			depth: depth,
		};

		if (row + 1 === numRows) {
			height = gridSize.height.value! - row * height!;
		}

		if (col + 1 === numCols) {
			width = gridSize.width.value! - col * width!;
		}

		props.viewSize = new Size({
			width,
			height,
		});

		props.css = {
			...css,
			position: 'absolute',
			...props.offset.toPx(),
			zIndex: tile + 1 < numTiles / 2 ? tile + 1 : numTiles - tile,
		};

		return props;
	}
}
