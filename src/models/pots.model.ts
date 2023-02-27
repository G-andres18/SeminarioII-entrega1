import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Pots extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Detalle: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pots>) {
    super(data);
  }
}

export interface PotsRelations {
  // describe navigational properties here
}

export type PotsWithRelations = Pots & PotsRelations;
