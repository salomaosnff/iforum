import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UiInput from './UiInput.vue';

describe('UiInput', () => {
  it('Verifica se o campo esta desabilitado', () => {
    const getClasses = (disabled: boolean) => mount(UiInput, { props: { disabled } }).classes();

    expect(getClasses(true)).include('ui-input--disabled');

    expect(getClasses(false)).not.include('ui-input--disabled');
  });

  it('Verifica se a messagem de hint foi mostrado corretamente', () => {
    const component = mount(UiInput, { props: { hint: 'texto de ajuda' } });

    const hintElement = component.element.querySelector('.ui-input__hint');

    expect(hintElement).not.equal(null);
    expect(hintElement?.textContent).equal('texto de ajuda');
  });
  it('Verifica se a messagem de erro foi mostrado corretamente', () => {
    const component = mount(UiInput, { props: { error: 'erro' } });

    const erroElement = component.element.querySelector('.ui-input__error');

    expect(erroElement).not.equal(null);
    expect(erroElement?.textContent).equal('erro');
  });
});