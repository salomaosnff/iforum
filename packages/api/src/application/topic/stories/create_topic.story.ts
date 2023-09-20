import { TopicEntity } from "@/core/topic/topic.entity";
import { TopicRepository } from "../topic.repository";
import { UserEntity } from "@/core/user/user.entity";
import { UserRepository } from "@/application/user/user.repository";
import { Result } from "@/@shared/result";
import { Option } from "@/@shared/option";
import { UserNotAuthenticatedError } from "@/application/user/error/user_not_authenticated.error";
import { Slug } from "@/@shared/vo/slug.vo";

export interface CreateTopicStoryInput {
    title: string;
    body: string;
    slug?: string;
    authorId: UserEntity['id']
    tags?: string[];
}

export class CreateTopicStory {
    constructor(
        private readonly topicRepository: TopicRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async execute(input: CreateTopicStoryInput): Promise<Result<TopicEntity, UserNotAuthenticatedError> >{
        const userResult = await this.userRepository.findById(input.authorId);
        
        if (Option.isNone(userResult)) {
            return Result.fail(new UserNotAuthenticatedError());
        }

        const slugResult = input.slug ? Slug.of(input.slug) : Slug.ofText(input.title);

        if (Result.isFail(slugResult)) {
            return Result.fail(slugResult.error);
        }

        const topicResult = TopicEntity.of({
            author: userResult.unwrap(),
            slug: slugResult.unwrap(),
            title: input.title,
            body: input.body,
            tags: input.tags,
        })

        if (Result.isFail(topicResult)) {
            return Result.fail(topicResult.error);
        }

        const topic = topicResult.unwrap();

        await this.topicRepository.create(topic);

        return Result.ok(topic);
    }
}