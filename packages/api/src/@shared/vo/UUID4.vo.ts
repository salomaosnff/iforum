import { randomUUID } from 'crypto';
import { Id } from './Id.vo';

export class UUID4 extends Id<string>{
  static of(id: string){
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)){
      throw new Error('UUID invalido');
    }
    return new UUID4(id);
  }

  static generate(){
    return this.of(randomUUID());
  }
}