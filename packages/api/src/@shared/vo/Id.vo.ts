import util from 'util';

export abstract class Id<T=string>{
    
  protected constructor(protected id: T) {}

  get value(){
    return this.id;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [util.inspect.custom](depth: number, options: any){
    return options.stylize(`${this.constructor.name}(${this.id})`, 'special');
  }
}