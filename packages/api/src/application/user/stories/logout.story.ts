export class LogoutStory {
  async execute(
    onDeleteToken: (name: string) => void,   
  ) {
    await onDeleteToken('user_id');
  }
}