import { Option } from '@/@shared/option';
import { AcademicEmail } from '@/@shared/vo/academic_email.vo';
import { UserRepository } from '@/application/user/user.repository';
import { UserEntity } from '@/core/user/user.entity';

export class InMemoryUserRepository implements UserRepository{

  db = new Map<string, UserEntity>();

  async create(user: UserEntity): Promise<UserEntity> {
    this.db.set(user.id.value, user);
    return user;
  }

  async findByEmail(email: AcademicEmail): Promise<Option<UserEntity>> {
    for (const user of this.db.values()){
      if (user.email.value === email.value){
        return Option.some(user);
      }
    }

    return Option.none();
  }

  async findById(id: UserEntity['id']): Promise<Option<UserEntity>> {
    const user = this.db.get(id.value);

    if (user){
      return Option.some(user);
    }

    return Option.none();
  }
}