import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UnibookDataSource} from '../datasources';
import {Pots, PotsRelations} from '../models';

export class PotsRepository extends DefaultCrudRepository<
  Pots,
  typeof Pots.prototype.Id,
  PotsRelations
> {
  constructor(
    @inject('datasources.unibook') dataSource: UnibookDataSource,
  ) {
    super(Pots, dataSource);
  }
}
