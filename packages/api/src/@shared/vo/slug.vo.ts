import limax from 'limax';
import { ValidationError } from '../error/validation.error';
import { Result } from '../result';

export class InvalidSlugError extends ValidationError {
    name = 'InvalidSlugError';
    message = 'Invalid slug';
}

export class Slug {
    protected constructor(public readonly value: string) { }

    static of(value: string): Result<Slug, InvalidSlugError> {
        if (!/^[a-z0-9_\-]+$/.test(value)) {
            return Result.fail(new InvalidSlugError());
        }

        return Result.ok(new Slug(value));
    }

    static ofText(value: string): Result<Slug, InvalidSlugError> {
        return Slug.of(limax(value));
    }
}