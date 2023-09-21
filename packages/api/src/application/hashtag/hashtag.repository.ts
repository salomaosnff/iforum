import { Paged } from "@/@shared/paged";
import { UserEntity } from "@/core/user/user.entity";

export interface HashtagRepository {
  /**
   * Busca uma lista de hashtags
   * @param search Termo a ser pesquisado
   */
  findBySearch(search: string): Promise<Paged<string>>

  /**
   * Segue uma hashtag
   * @param hashtag Hashtag a ser seguida
   * @param user Usuário que irá seguir a hashtag
   */
  follow(hashtag: string, user: UserEntity): Promise<void>
}