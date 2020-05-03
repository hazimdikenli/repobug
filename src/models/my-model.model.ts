import {Entity, model, property} from '@loopback/repository';

@model({name: 'mymodel'})
export class MyModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  rowid?: number;

  @property({
    type: 'string',
  })
  col1?: string;

  constructor(data?: Partial<MyModel>) {
    super(data);
  }
}

export interface MyModelRelations {
  // describe navigational properties here
}

export type MyModelWithRelations = MyModel & MyModelRelations;
