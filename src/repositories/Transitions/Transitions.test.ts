import { Directions } from '../../controllers';
import { default as TransitionsRepository } from './Transitions';

function transitionsFactory(numTransitions: number) {
	return new Array(numTransitions).fill({});
}

describe('repositories: Transitions', () => {
	let repo: TransitionsRepository;
	let transitions: object[];

	beforeEach(() => {
		repo = new TransitionsRepository();
	});

	it('updates the repository transitions', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.list).toHaveLength(5);
	});

	it('removes the previous transitions on update', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.list).toHaveLength(5);

		transitions = transitionsFactory(2);
		repo.update(transitions);
		expect(repo.list).toHaveLength(2);
	});

	it('gets the first transition', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.getFirst().component).toBe(transitions[0]);
	});

	it('gets the last transition', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.getLast().component).toBe(
			transitions[transitions.length - 1]
		);
	});

	it('gets the transition by an index number', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.getByIndex(2).component).toBe(transitions[2]);
	});

	it('gets the transition by order next', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.getByOrder(Directions.next, 2).component).toBe(
			transitions[3]
		);
	});

	it('gets fist the transition by order next', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.getByOrder(Directions.next, 4).component).toBe(
			transitions[3]
		);
	});

	it('gets the transition by order previous', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.getByOrder(Directions.prev, 2).component).toBe(
			transitions[1]
		);
	});

	it('gets the last transition by order previous', () => {
		transitions = transitionsFactory(5);
		repo.update(transitions);

		expect(repo.getByOrder(Directions.prev, 0).component).toBe(
			transitions[1]
		);
	});
});
