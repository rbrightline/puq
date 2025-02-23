import { DataSource, Repository } from 'typeorm';
import {
  Department,
  DepartmentView,
  CreateDepartmentDto,
  sqliteTestDataSource,
} from '../../src/index.js';
import { faker } from '@faker-js/faker';

/**
 * Generate {@link CreateDepartmentDto} data
 * @returns
 */
export function category(): CreateDepartmentDto {
  return {
    name: faker.string.alpha(10),
  };
}

describe('Department Entity', () => {
  let ds: DataSource;
  let repo: Repository<Department>;
  let viewRepo: Repository<DepartmentView>;
  let saved: Department;

  beforeAll(async () => {
    ds = await sqliteTestDataSource([Department, DepartmentView]);

    repo = ds.getRepository(Department);
    viewRepo = ds.getRepository(DepartmentView);
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
