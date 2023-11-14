import { defineStore } from 'pinia';
import { UserLoginStory } from '@/core/domain/user/stories/user_login.story';
import { Models } from 'swagger:iforum';
import { useAuthContainer } from '@/container/auth';

export const useUserStore = defineStore('user', () => {
  const user = ref<Models.User>();
  const [loginStory] = useAuthContainer(UserLoginStory);

  async function login(login?: string, password?: string) {
    user.value = await loginStory.execute({
      login,
      password,
    });
  }

  async function isLogged(){
    if (!user.value){
      await login();
    }

    return user.value?.id !== undefined;
  }

  return {
    user,
    login, 
    isLogged,
  };
});