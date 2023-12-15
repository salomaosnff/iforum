import { Entity } from '@/@shared/entity';
import { Model } from 'objection';

export class BaseModel extends Model{
  id: string;
  created_at: Date;
  updated_at: Date;

  static get idColumn() {
    return 'id';
  }

  static get timestamps() {
    return true;
  }

  static get entity() {
    return Entity;
  }

  $beforeInsert(){
    this.created_at ??= new Date();
    this.updated_at ??= new Date();
  } 

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  constructor(data: object = {}) {
    super();
    Object.assign(this, data);
  }
}