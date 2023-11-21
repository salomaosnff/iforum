import { Models, Services } from 'swagger:iforum';

export interface createCommentInput {
  body: string,
  replyTo: string
}

export class CreateCommentStory {
  constructor(private readonly commentService: Services.Comments) {}

  async execute(slug: string, data: createCommentInput){
    return this.commentService.createComment({ slug }, {
      body: data.body,
      replyTo: data.replyTo,
    }).then(res => res.data as Models.Comment);
  }
}