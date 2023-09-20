import { Option } from "@/@shared/option";
import { Result } from "@/@shared/result";
import { Slug } from "@/@shared/vo/slug.vo";
import { TopicEntity } from "@/core/topic/topic.entity";

export interface TopicRepository {
    /**
     * Cria um novo tópico no banco de dados
     * @param topic Tópico a ser criado
     */
    create(topic: TopicEntity): Promise<Result<TopicEntity, any>>;

    /**
     * Busca um tópico pelo seu slug
     * @param slug Slug do tópico
     */
    findBySlug(slug: Slug): Promise<Option<TopicEntity>>;
}