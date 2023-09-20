import { describe, it, expect } from 'vitest';
import { InMemoryUserRepository } from '@/infra/in_memory/user.repository';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';
import { AcademicEmail } from '@/@shared/vo/academic_email.vo';
import { CreateTopicStory } from '../stories/create_topic.story';
import { UserEntity } from '@/core/user/user.entity';
import { InMemoryTopicRepository } from '@/infra/in_memory/topic.repository';
import { Slug } from '@/@shared/vo/slug.vo';
import { UUID4 } from '@/@shared/vo/UUID4.vo';

describe('Cadastro de Tópicos', async () => {
  const user_repo = new InMemoryUserRepository();
  const topic_repo = new InMemoryTopicRepository();

  const user = UserEntity.of({
    email: AcademicEmail.of('user@aluno.ifce.edu.br').unwrap(),
    name: 'test',
    password: 'test',
  }).unwrap()

  await user_repo.create(user)

  it('Deve cadastrar um tópico com sucesso', () => {
    expect(new CreateTopicStory(topic_repo, user_repo).execute({
      authorId: user.id,
      body: 'test body',
      title: 'test title',
      slug: 'test-slug',
    })).resolves.toEqual(expect.objectContaining({
      data: expect.objectContaining({
        body: 'test body',
        title: 'test title',
        slug: Slug.of('test-slug').unwrap(),
        author: user,
      }),
    }));
  });

  it('deve retornar um erro caso formulario esteja vazio', async () => {
    const result = await new CreateTopicStory(topic_repo, user_repo).execute({
      authorId: user.id,
      body: '',
      title: '',
      slug: '',
    });

    expect(Result.isFail(result)).toBe(true);
    expect((result as any).error).toBeInstanceOf(ValidationError);
  });

  it('deve retornar um erro caso o slug seja inválido', async () => {
    const result = await new CreateTopicStory(topic_repo, user_repo).execute({
      authorId: user.id,
      body: 'test body',
      title: 'test title',
      slug: 'test slug',
    });

    expect(Result.isFail(result)).toBe(true);
    expect((result as any).error).toBeInstanceOf(ValidationError);
  })

  it('deve retornar um erro caso o usuário não esteja autenticado', async () => {
    const result = await new CreateTopicStory(topic_repo, user_repo).execute({
      authorId: UUID4.generate(),
      body: 'test body',
      title: 'test title',
      slug: 'test-slug',
    });

    expect(Result.isFail(result)).toBe(true);
    expect(result).toHaveProperty('error');
  })

  it('Deve retornar um tópico pelo slug', async () => {
    const topic = await new CreateTopicStory(topic_repo, user_repo).execute({
      authorId: user.id,
      body: 'test body',
      title: 'test title',
      slug: 'test-slug',
    });

    expect(Result.isOk(topic)).toBe(true);
    expect(topic).toHaveProperty('data');

    const data = topic.unwrap()

    const topicResult = await topic_repo.findBySlug(data.slug);

    expect(topicResult).toEqual(expect.objectContaining({
      data: expect.objectContaining({
        slug: data.slug,
      }),
    }));
  })
});