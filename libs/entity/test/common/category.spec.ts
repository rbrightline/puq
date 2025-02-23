import { DataSource, Repository } from 'typeorm';
import {
  Category,
  CategoryView,
  CreateCategoryDto,
  sqliteTestDataSource,
} from '../../src/index.js';
import { faker } from '@faker-js/faker';

/**
 * Generate {@link CreateCategoryDto} data
 * @returns
 */
export function category(): CreateCategoryDto {
  return {
    name: faker.string.alpha(10),
  };
}

describe('Category Entity', () => {
  let ds: DataSource;
  let repo: Repository<Category>;
  let viewRepo: Repository<CategoryView>;
  let saved: Category;

  beforeAll(async () => {
    ds = await sqliteTestDataSource([Category, CategoryView]);

    repo = ds.getRepository(Category);
    viewRepo = ds.getRepository(CategoryView);
    saved = await repo.save(category());
  });

  it('should establish the connection', () => {
    expect(ds).toBeTruthy();
  });

  it('should intitialize the repository', () => {
    expect(repo).toBeTruthy();
    expect(viewRepo).toBeTruthy();
  });

  it('should create', async () => {
    expect(saved).toBeTruthy();
    expect(saved.id).toBeDefined();
  });

  it('should read', async () => {
    expect(await viewRepo.findOneBy({ id: saved.id })).contain({
      id: saved.id,
      name: saved.name,
    });
  });
});
