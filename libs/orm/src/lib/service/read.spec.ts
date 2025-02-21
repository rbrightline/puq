import 'reflect-metadata';

import { DataSource, Repository } from 'typeorm';
import { Entity } from '../decorator/entity.js';
import { BaseEntity } from '../entity/base.js';
import { Column } from '../decorator/column.js';
import { Dto } from '@puq/property';
import { CreateQueryManyDto } from '../query/create-query-many-dto.js';
import { CreateQueryOneDto } from '../query/create-query-one-dto.js';
import { EntityReadService } from './read.js';
import { plainToInstance } from 'class-transformer';
import { CreateQueryCountDto } from '../query/create-query-count-dto.js';
import { QueryOperator, toWhereQueryString } from '@puq/query';
import { keys, Keys } from '@puq/type';

@Entity()
class Sample extends BaseEntity {
  @Column({ type: 'string' }) string: string;
  @Column({ type: 'number' }) number: number;
  @Column({ type: 'integer' }) integer: number;
  @Column({ type: 'boolean' }) boolean: boolean;
  @Column({ type: 'date' }) date: Date;
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

describe('read service', () => {
  let ds: DataSource;
  let repo: Repository<Sample>;
  let service: EntityReadService<Sample>;

  beforeAll(async () => {
    ds = await new DataSource({
      type: 'better-sqlite3',
      database: 'tmp/database/read-service.sqlite',
      entities: [Sample],
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
    const result = await service.read(query);
    expect(result).toHaveLength(3);

    expect(result[0].id).toBeDefined();
    expect(result[0].createdAt).toBeDefined();
    expect(result[0].updatedAt).toBeDefined();
    expect(result[0].deletedAt).toBeFalsy();
    expect(result[0].string).toBeDefined();
    expect(result[0].boolean).toBeDefined();
    expect(result[0].date).toBeDefined();
  });

  it('should read by take', async () => {});

  it('should readOne by ', async () => {
    const query = plainToInstance(QueryOneSampleDto, {
      select: ['id'],
      where: toWhereQueryString([
        { property: 'id', operator: QueryOperator.EQUAL, query: '2' },
      ]),
    });

    const found = await service.readOne(query);
    expect(found?.id).toEqual(2);
  });

  it('should count', async () => {
    const query = plainToInstance(QueryCountSampleDto, {
      where: toWhereQueryString([
        { property: 'id', operator: QueryOperator.EQUAL, query: '1' },
      ]),
    });
    const result = await service.count(query);
    expect(result).toEqual(1);
  });
});
