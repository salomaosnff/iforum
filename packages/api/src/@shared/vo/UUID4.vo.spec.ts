import { randomUUID } from 'crypto';
import { describe, it, expect } from 'vitest';
import { UUID4 } from './UUID4.vo';

describe('UUID4', () => {
  it('Deve criar um UUID válido', () => {
    expect(UUID4.of(randomUUID())).toBeInstanceOf(UUID4);
  });

  it('Deve lançar uma exceção ao passar um UUID inválido', () => {
    expect(() => UUID4.of('invalid UUID')).throws('UUID invalido');
  });

  it('Deve gerar um UUID válido', () => {
    expect(UUID4.generate()).toBeInstanceOf(UUID4);
  });
});