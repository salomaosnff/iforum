import { Entity, EntityFields } from "@/@shared/Entity";

interface UserFields extends EntityFields{
    name: string;
    password: string;
    email: string;
    role: any;
    score: number; 
}

export class UserEntity extends Entity{
    name: string;
    password: string;
    email: string;
    role: any;
    score: number;

    static of(data: UserFields){
        return new UserEntity(data)
    }

    validate(){}
}