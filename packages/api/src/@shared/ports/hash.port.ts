export interface HashPort {
  digest(data: string): Promise<string>;
  compare(hash: string, data: string): Promise<boolean>;
}