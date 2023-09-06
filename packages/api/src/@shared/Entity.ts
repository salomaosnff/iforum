import { Id } from "./vo/Id.vo";
import { UUID4 } from "./vo/UUID4.vo";

export interface EntityFields{
    id?: Id;
    createdAt?: Date;
    updatedAt?: Date;
}

export abstract class Entity{
    id: Id;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: any){
        data.id ??= UUID4.generate();
        data.createdAt ??= new Date();
        data.updatedAt ??= new Date();

        Object.assign(this, data);
        console.log(data,this);
        this.validate();
    }

    abstract validate(): void;
}