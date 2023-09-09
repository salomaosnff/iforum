import { Option } from '@/@shared/option';
import { AcademicEmail } from '@/@shared/vo/academic_email.vo';
import { UserEntity } from '@/core/user/user.entity';

export interface UserRepository{
  /**
   * salva um novo usuario no banco de dados
   * @param user usuario a ser salvo 
   */
  create(user: UserEntity): Promise<UserEntity>;
  /**
   * busca e retorna um usuario pelo seu email
   * @param email email a ser buscado
   */
  findByEmail(email: AcademicEmail): Promise<Option<UserEntity>>;
}