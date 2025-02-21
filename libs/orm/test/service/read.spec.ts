import 'reflect-metadata';
import { keys, Keys } from '@puq/type';
import { DataSource, Repository } from 'typeorm';
import { Dto } from '@puq/property';
import { plainToInstance } from 'class-transformer';

import {
  Entity,
  BaseEntity,
  Column,
  CreateQueryManyDto,
  CreateQueryOneDto,
  EntityReadService,
  CreateQueryCountDto,
  TableNamingStrategy,
} from '../../src/index.js';
import { toWhereQueryString, QueryOperator } from '@puq/query';

@Entity()
class Sample extends BaseEntity {
  @Column({ type: 'string', databaseType: 'sqlite' }) string: string;
  @Column({ type: 'number', databaseType: 'sqlite' }) number: number;
  @Column({ type: 'integer', databaseType: 'sqlite' }) integer: number;
  @Column({ type: 'boolean', databaseType: 'sqlite' }) boolean: boolean;
  @Column({ type: 'date', databaseType: 'sqlite' }) date: Date;
}

const SAMPLE_COLUMNS: Keys<Sample> = keys(new Sample());

@Dto()
class QueryManySampDto extends CreateQueryManyDto<Sample>({
  columns: SAMPLE_COLUMNS,
  defaultTake: 20,
  isSelectRequired: false,
}) {}

@Dto()
class QueryOneSampleDto extends CreateQueryOneDto<Sample>({
  columns: SAMPLE_COLUMNS,
  isSelectRequired: false,
}) {}

@Dto()
class QueryCountSampleDto extends CreateQueryCountDto<Sample>({
  columns: SAMPLE_COLUMNS,
}) {}

describe('EntityReadService', () => {
  let ds: DataSource;
  let repo: Repository<Sample>;
  let service: EntityReadService<Sample>;

  beforeAll(async () => {
    ds = await new DataSource({
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [Sample],
      namingStrategy: new TableNamingStrategy(),
      synchronize: true,
      dropSchema: true,
    }).initialize();

    repo = ds.getRepository(Sample);
    service = new EntityReadService(repo);

    await repo.save({
      string: 'string 2',
      number: 200,
      integer: 200,
      boolean: true,
      date: new Date(),
    });

    await repo.save({
      string: 'string 3',
      number: 300,
      integer: 300,
      boolean: true,
      date: new Date(),
    });
  });

  it('should initialize', () => {
    expect(ds).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should read', async () => {
    const query = plainToInstance(QueryManySampDto, {});
    const result = await service.find(query);
    expect(result.length).toBeGreaterThan(1);

    expect(result[0].id).toBeDefined();
    expect(result[0].createdAt).toBeDefined();
    expect(result[0].updatedAt).toBeDefined();
    expect(result[0].deletedAt).toBeFalsy();
    expect(result[0].string).toBeDefined();
    expect(result[0].boolean).toBeDefined();
    expect(result[0].date).toBeDefined();
  });

  it('should readOne by ', async () => {
    const query = plainToInstance(QueryOneSampleDto, {
      select: ['id'],
      where: toWhereQueryString([
        { property: 'id', operator: QueryOperator.EQUAL, query: '2' },
      ]),
    });

    const found = await service.findOne(query);
    expect(found?.id).toEqual(2);
  });

  it('should count', async () => {
    const query = plainToInstance(QueryCountSampleDto, {
      where: toWhereQueryString([
        { property: 'id', operator: QueryOperator.EQUAL, query: '1' },
      ]),
    });
    const result = await service.count(query);
    expect(result.count).toBeGreaterThan(0);
  });
});
