import { randomUUID } from 'crypto';
import { describe, it, expect } from 'vitest';
import { UUID4 } from './UUID4.vo';

describe('UUID4', () => {
  it('Deve criar um UUID válido', () => {
    expect(UUID4.of(randomUUID()).unwrap()).toBeInstanceOf(UUID4);
  });

  it('Deve lançar uma exceção ao passar um UUID inválido', () => {
    expect(() => UUID4.of('invalid UUID').unwrap()).throws('Invalid UUID4');
  });

  it('Deve gerar um UUID válido', () => {
    expect(UUID4.generate()).toBeInstanceOf(UUID4);
  });
});
