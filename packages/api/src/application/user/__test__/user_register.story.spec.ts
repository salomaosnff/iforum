import { describe, it, expect } from 'vitest';
import { RegisterUserStory } from '../stories/register_user.story';
import { InMemoryUserRepository } from '@/infra/in_memory/user.repository';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';
import { InvalidAcademicEmailError } from '@/@shared/vo/academic_email.vo';

describe('Cadastro de usuario', () => {
  const repo = new InMemoryUserRepository();
  
  it('deve cadastrar um usuário com sucesso', () => {
    expect(new RegisterUserStory(repo).execute({
      email: 'test@ifce.edu.br',
      name: 'test',
      password: 'test',
    })).resolves.toEqual(expect.objectContaining({
      data: expect.objectContaining({      
        email: { value: 'test@ifce.edu.br' },
        name: 'test',
        password: 'test',
      }),
    }));
  });

  it('deve retornar um erro caso o email já esteja cadastrado', () => {
    expect(new RegisterUserStory(repo).execute({
      email: 'test@ifce.edu.br',
      name: 'test',
      password: 'test',
    })).resolves.toEqual(expect.objectContaining({ error: expect.objectContaining({ name: 'UserEmailAlreadyRegisteredError' }) }));
  });

  it('deve retornar um erro caso formulario esteja vazio', async () => {
    const result = await new RegisterUserStory(repo).execute({
      email: '',
      name: '',
      password: '',
    });
    expect(result).toHaveProperty('error');
    if (Result.isFail(result)){
      expect(result.error).toBeInstanceOf(ValidationError);
    }
  });

  it('deve retornar um erro caso o email não seja do dominio ifce.edu.br', async () => {
    const result = await new RegisterUserStory(repo).execute({
      email: 'enio.karlos.jenio61@gmail.com',
      name: 'Janio Quadros',
      password: 'prestanao',
    });
    expect(result).toHaveProperty('error');
    if (Result.isFail(result)){
      expect(result.error).toBeInstanceOf(InvalidAcademicEmailError);
    }
  });
});