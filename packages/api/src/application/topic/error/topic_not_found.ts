import { ValidationError } from "@/@shared/error/validation.error";

export class TopicNotFound extends ValidationError {
    name = 'TopicNotFound';
    message = 'Topic Not Found!';
}