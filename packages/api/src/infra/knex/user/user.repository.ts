import { Option } from '@/@shared/option';
import { Id } from '@/@shared/vo/Id.vo';
import { AcademicEmail } from '@/@shared/vo/academic_email.vo';
import { UserRepository } from '@/application/user/user.repository';
import { UserEntity } from '@/core/user/user.entity';
import { UserModel } from './user.model';

export class KnexUserRepository implements UserRepository {
  userModel = UserModel;

  async create(user: UserEntity): Promise<UserEntity> {
    const model = UserModel.fromEntity(user);

    await UserModel.query().insert(model);

    return user;
  }
  
  async findByEmail(email: AcademicEmail): Promise<Option<UserEntity>> {
    const user = await UserModel
      .query()
      .where('email', '=', email.value)
      .first();

    if (user) {
      return Option.some(user.toEntity());
    }

    return Option.none();
  }

  async findById(id: Id<string>): Promise<Option<UserEntity>> {
    const user = await UserModel.query().findById(id.value);

    if (user) {
      return Option.some(user.toEntity());
    }

    return Option.none();
  }
}