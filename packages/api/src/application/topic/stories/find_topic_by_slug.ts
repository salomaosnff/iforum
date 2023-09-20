import { Slug } from "@/@shared/vo/slug.vo";
import { TopicRepository } from "../topic.repository";
import { Result } from "@/@shared/result";
import { TopicEntity } from "@/core/topic/topic.entity";
import { TopicNotFound } from "../error/topic_not_found";
import { Option } from "@/@shared/option";

export class FindTopicBySlug {
  constructor(private topicRepository: TopicRepository) { }

  async execute(slug: string): Promise<Result<TopicEntity, TopicNotFound>> {
    let slugResult = Slug.of(slug);

    if (Result.isFail(slugResult)) {
      return Result.fail(slugResult.error)
    }

    let topicResult = await this.topicRepository.findBySlug(slugResult.unwrap());

    if (Option.isNone(topicResult)) {
      return Result.fail(new TopicNotFound())
    }

    return Result.ok(topicResult.unwrap());
  }
}