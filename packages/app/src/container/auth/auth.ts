import { createResolver } from '@injets/functional/dist/index.mjs';
import { Services } from 'swagger:iforum';
import { HTTP_REQUEST } from './global';
import { UserLoginStory } from '@/core/domain/user/stories/user_login.story';

export const useAuthContainer = createResolver('Auth', ({
  singleton, inject, 
}) => {
  singleton(Services.Auth, () => new Services.Auth(inject(HTTP_REQUEST)));
  singleton(UserLoginStory, () => new UserLoginStory(inject(Services.Auth)));
});
