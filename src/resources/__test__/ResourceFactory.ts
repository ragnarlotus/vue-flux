import { Img } from '../';

export default class ResourceFactory {
	static create(amount: number) {
		return new Array(amount).fill(new Img(''));
	}
}
