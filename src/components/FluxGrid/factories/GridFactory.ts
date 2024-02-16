import { Size } from '../../../shared';
import GridTileFactory from './GridTileFactory';
import { FluxGridProps, FluxGridTileProps } from '../types';

export default class GridFactory {
	static getTilesProps(props: FluxGridProps) {
		const { rows, cols, size, color, colors, rsc, rscs, depth } = props;

		const numRows = Math.ceil(rows!);
		const numCols = Math.ceil(cols!);

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
				width: Math.floor(size.width.value! / numCols),
				height: Math.floor(size.height.value! / numRows),
			}),
			css: props.tileCss,
		};

		const tilesProps: FluxGridTileProps[] = [];

		for (let tileNumber = 0; tileNumber < grid.numTiles; tileNumber++) {
			tile.number = tileNumber;
			tilesProps.push(GridTileFactory.getProps(grid, tile));
		}

		return tilesProps;
	}
}
