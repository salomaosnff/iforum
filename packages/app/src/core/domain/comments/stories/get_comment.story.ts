import { Models, Services } from 'swagger:iforum';

export interface GetCommentQuery{
  page?: number,
  size?: number,
}

export class GetCommentsUseCase {
  constructor(private readonly commentService: Services.Comments){}

  async execute(slug: string, query: GetCommentQuery = {}){
    return this.commentService.getComments({ slug }, query).then(res => res.data as Models.PagedComments);
  }
}