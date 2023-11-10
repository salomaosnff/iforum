import { Models, Services } from 'swagger:iforum';

export class FindTopicBySlug {
  constructor(private readonly topicService: Services.Topics){}

  async execute(slug: string){
    return this.topicService.getTopicBySlug({ slug }).then(res => res.data as Models.Topic);
  }
}