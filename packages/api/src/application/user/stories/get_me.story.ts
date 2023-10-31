import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { UserRepository } from '../user.repository';

export interface GetMeStoryInput{
  userId: string
}

export class GetMeStory {
  constructor(private readonly userRepository: UserRepository){

  }
  
  async execute(data: GetMeStoryInput){
    return this.userRepository.findById(UUID4.of(data.userId).unwrap());
  }
}