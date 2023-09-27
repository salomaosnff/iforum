import rules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { defineRule, configure } from 'vee-validate';

defineRule('academic_email', (value: string) => /\bifce.edu.br$/.test(value));

export default {
  name: 'validate',
  install() {    
    configure({
      generateMessage: localize('pt-br', {
        messages: {
          required: 'Este campo é obrigatório',
          academic_email: 'Você deve informar um e-mail acadêmico do ifce.edu.br',
          email: 'Este campo deve ser um e-mail válido',
          min: 'Este campo precisa ter no mínimo 0:{min} caracteres',
          max: 'Este campo precisa ter no máximo 0:{max} caracteres',
        }, 
      }), 
    });

    Object.entries(rules).forEach(([
      name,
      rule,
    ]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defineRule(name, rule as any);
    });
  },
};