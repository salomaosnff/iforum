import { ValidationError } from '../error/validation.error';
import { Result } from '../result';

export class AcademicEmail {
  private constructor(readonly value: string){
    
  }
  static of(email:string): Result<AcademicEmail,InvalidAcademicEmailError>{
    if (/^[\w._]+@(?:[\w._]+\.)?ifce\.edu\.br$/gm.test(email)){
      return Result.ok(new AcademicEmail(email));
    }
    return Result.fail(new InvalidAcademicEmailError());
  }
}

export class InvalidAcademicEmailError extends ValidationError{
  name= 'InvalidAcademicEmailError';
  message= 'Email Academico invalido';
}