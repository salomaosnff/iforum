import { UserEntity } from "./core/user/user.entity";

const user = UserEntity.of({
    email: "dfa",
    name:"df",
    password:"df",
    role: null,
    score: 1
})

console.log(user);