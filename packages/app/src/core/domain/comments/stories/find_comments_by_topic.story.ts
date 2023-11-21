import { Models, Services } from 'swagger:iforum';

export type FindCommentsByTopicParams = Services.Comments['getComments'] extends (params: infer p, query: infer Q) => unknown ? Q : never

export class FindCommentsByTopic {
  constructor(private readonly commentService: Services.Comments){}

  async execute(slug: string, params: FindCommentsByTopicParams = {}){
    return this.commentService.getComments({ slug }, params).then(res => res.data as Models.Comment);
  }

}