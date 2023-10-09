import { HashPort } from '@/@shared/ports/hash.port';
import bcrypt from 'bcrypt';

export class BcryptHashAdapter implements HashPort{
  digest(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
  
  compare(hash: string, data: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  } 

}