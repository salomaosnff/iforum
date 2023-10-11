import { UserEntity } from '@/core/user/user.entity';
import { BaseModel } from '../_util/base_model';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { AcademicEmail } from '@/@shared/vo/academic_email.vo';
import { assignDefined } from '../_util/assign_defined';

export class UserModel extends BaseModel {

  static get tableName() {
    return 'user';
  }

  name: string;
  password: string;
  email: string;
  role: number;
  score: number;

  toEntity() {    
    return UserEntity.of({
      id: UUID4.of(this.id).unwrap(),
      name: this.name,
      password: this.password,
      email: AcademicEmail.of(this.email).unwrap(),
      score: this.score,
      role: this.role,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
    }).unwrap();
  }

  static toPlain(data: Partial<UserEntity>): Partial<UserModel> {
    return assignDefined({
      id: data.id?.value,
      name: data.name,
      password: data.password,
      email: data.email?.value,
      score: data.score,
      role: data.role,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    });
  }

  static fromEntity(data: UserEntity) {
    return Object.assign(new UserModel(), UserModel.toPlain(data));
  }
}