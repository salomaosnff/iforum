import { UserEntity } from '@/core/user/user.entity';

export function publicPresenter (user: UserEntity){
  return {
    id: user.id.value,
    name: user.name,
    email: user.email.value,
    role: user.role,
  };
}