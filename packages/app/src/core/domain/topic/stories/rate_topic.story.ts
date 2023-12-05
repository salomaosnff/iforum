import { Models, Services } from 'swagger:iforum';

export class RateTopicStory {
  constructor(private readonly topicService: Services.Topics){}

  async execute(slug: string, value: '1'| '-1' ){
    return this.topicService.rateTopic( { slug }, { value } ).then(res => res.data as Models.Topic); 
  }

  up(slug: string){
    return this.execute(slug, '1');
  }
  down(slug: string){
    return this.execute(slug, '-1');
  }
}