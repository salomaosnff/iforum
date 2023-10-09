/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from '@/@shared/option';
import { Paged } from '@/@shared/paged';
import { Result } from '@/@shared/result';
import { Slug } from '@/@shared/vo/slug.vo';
import { TopicEntity } from '@/core/topic/topic.entity';
import { UserEntity } from '@/core/user/user.entity';

export interface TopicRepository {
    /**
     * Cria um novo tópico no banco de dados
     * @param topic Tópico a ser criado
     */
    create(topic: TopicEntity): Promise<Result<TopicEntity, Error>>;

    /**
     * Busca um tópico pelo seu slug
     * @param slug Slug do tópico
     */
    findBySlug(slug: Slug): Promise<Option<TopicEntity>>;

    /**
     * Busca um tópico pelo seu id
     * @param id Id do tópico
     */
    findById(id: TopicEntity['id']): Promise<Option<TopicEntity>>;

    /**
     * Retorna uma lista de tópicos do feed de um usuário
     * @param user Usuário do feed
     */
    findByUserFeed(user: UserEntity): Promise<Paged<TopicEntity>>;

    delete(topic: TopicEntity): Promise<Result<void, Error>>;

    update(topic: TopicEntity): Promise<Result<TopicEntity, Error>>;
}