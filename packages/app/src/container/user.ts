import { createResolver } from '@injets/functional';
import { Services } from 'swagger:iforum';
import { HTTP_REQUEST } from './global';
import { UserRegisterStory } from '@/core/domain/user/stories/user_register.story';

export const useUserContainer = createResolver('Register', ({
  singleton, inject,
}) => {
  singleton(Services.Users, () => new Services.Users(inject(HTTP_REQUEST)));
  singleton(UserRegisterStory, () => new UserRegisterStory(inject(Services.Users)));
});