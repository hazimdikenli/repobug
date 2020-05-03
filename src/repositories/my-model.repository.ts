import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MyModel, MyModelRelations} from '../models';

export class MyModelRepository extends DefaultCrudRepository<
  MyModel,
  typeof MyModel.prototype.rowid,
  MyModelRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(MyModel, dataSource);
  }
}
