import { Size } from '../../shared';
import { ceil, floor } from '../../shared/Maths';
import GridTileCreator from './GridTileCreator';
import { GridProps, TileProps } from './types';

export default class GridCreator {
	static getTilesProps(props: GridProps) {
		const { rows, cols, size, color, colors, rsc, rscs, depth } = props;

		const numRows = ceil(rows!);
		const numCols = ceil(cols!);

		const grid = {
			numRows,
			numCols,
			numTiles: numRows * numCols,
			size,
			depth: depth!,
			color,
			colors,
			rsc,
			rscs,
		};

		const tile = {
			number: 0,
			size: new Size({
				width: floor(size.width.value! / numCols),
				height: floor(size.height.value! / numRows),
			}),
			css: props.tileCss,
		};

		const tilesProps: TileProps[] = [];

		for (let tileNumber = 0; tileNumber < grid.numTiles; tileNumber++) {
			tile.number = tileNumber;
			tilesProps.push(GridTileCreator.getProps(grid, tile));
		}

		return tilesProps;
	}
}
