import util from 'util';

export abstract class Id<T=any>{
    
    protected constructor(protected id: T)
    {}

    get value(){
        return this.id;
    }

    [util.inspect.custom](depth: any, options: any){
        return options.stylize(`${this.constructor.name}(${this.id})`, "special");
    };
}