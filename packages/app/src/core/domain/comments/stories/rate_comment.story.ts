import { Models, Services } from 'swagger:iforum';

export class RateCommentStory {
  constructor(private readonly commentService: Services.Comments){}

  async execute(slug: string, id: string ,value: 1 | -1){
    return this.commentService.rateComment( {
      slug, 
      id, 
    }, { value }).then(res => res.data as Models.Comment);
  }

  up(slug: string, id: string){
    this.execute(slug,id,1);
  }
  down(slug: string, id: string){
    this.execute(slug, id,-1);
  }
}