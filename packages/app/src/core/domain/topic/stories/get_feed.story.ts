import { Models, Services } from 'swagger:iforum';


interface GetFeedInput {
  page?: number,
  size?: number
}

export class GetFeedUseCase {
  constructor(private readonly topicService: Services.Topics) {}

  async execute(input: GetFeedInput = {}) {
    return this.topicService.getFeed(input)
      .then(res => res.data as Models.PagedTopics)
    ;
  }
}