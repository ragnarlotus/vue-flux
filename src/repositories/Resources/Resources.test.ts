import { Directions } from '../../controllers';
import { Resource } from '../../resources';
import { Size } from '../../shared';
import { default as ResourcesRepository } from './Resources';
import ResourceFactory from '../../resources/__test__/ResourceFactory';
import emit from '../../components/VueFlux/__test__/emit';

vi.mock('../../resources/Img/Img');
vi.mock('../../shared/ResourceLoader/ResourceLoader');

describe('repositories: Resources', () => {
	let repo: ResourcesRepository;
	let resources: Resource[];
	const size: Size = new Size({
		width: 640,
		height: 360,
	});

	describe('width preloading', () => {
		beforeEach(async () => {
			vi.clearAllMocks();

			repo = new ResourcesRepository(emit);

			resources = ResourceFactory.create(5);
			await repo.update(resources, 5, size);
		});

		it('updates the repository transitions', () => {
			expect(repo.list).toHaveLength(5);
		});

		it('emits when preload starts', () => {
			expect(emit).toHaveBeenCalledWith('resourcesPreloadStart');
		});

		it('emits when preload ends', () => {
			expect(emit).toHaveBeenCalledWith('resourcesPreloadEnd');
		});

		it('gets the first resource', () => {
			expect(repo.getFirst().rsc).toBe(resources[0]);
		});

		it('gets the last resource', () => {
			expect(repo.getLast().rsc).toBe(resources[4]);
		});

		it('get resource by index', () => {
			expect(repo.getByIndex(2).rsc).toBe(resources[2]);
		});

		it('throws error because the requested index does not exist', () => {
			const index = resources.length + 1;

			expect(() => repo.getByIndex(index)).toThrow(
				`Resource index ${index} not found`
			);
		});

		it('get resource by order next', () => {
			expect(
				repo.getByOrder(Directions.next, resources.length - 1).rsc
			).toBe(resources[0]);
		});

		it('get resource by order prev', () => {
			expect(repo.getByOrder(Directions.prev, 0).rsc).toBe(
				resources[resources.length - 1]
			);
		});

		it('throws an error when trying to find a resource by order without passing the current index', () => {
			expect(() => repo.find(Directions.next)).toThrow(
				'Missing currentIndex parameter'
			);
		});
	});

	describe('with lazy loading', () => {
		const numResources = 10;
		const resourcesToPreload = 5;

		beforeEach(async () => {
			vi.clearAllMocks();

			repo = new ResourcesRepository(emit);

			resources = ResourceFactory.create(numResources);
			await repo.update(resources, resourcesToPreload, size);
		});

		it('emits resourcesLazyloadStart when start lazy loading', () =>
			new Promise<void>((done) => {
				expect(emit).toHaveBeenCalledWith('resourcesLazyloadStart');
				done();
			}));

		it('emits resourcesLazyloadStart when start lazy loading', () =>
			new Promise<void>((done) => {
				expect(repo.list).toHaveLength(numResources);
				expect(emit).toHaveBeenCalledWith('resourcesLazyloadEnd');
				done();
			}));
	});
});
