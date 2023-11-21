import { Models, Services } from 'swagger:iforum'; 

export interface CreateTopicInput{
  title: string, 
  body: string,
  tags: string[]
}

export class CreateTopicStory {
  constructor(private readonly topicService: Services.Topics){}

  async execute(input: CreateTopicInput) {
    return this.topicService.createTopic({
      title: input.title,
      body: input.body,
      tags: input.tags,
    }).then(res => res.data as Models.Topic);
  }
}