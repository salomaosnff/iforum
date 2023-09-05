import { Directive, DirectiveBinding } from 'vue';

export const vColor: Directive<HTMLElement, string> =  (el: HTMLElement, binding: DirectiveBinding<string>) => {
  const varName = binding.arg ? `--current-${binding.arg}-color`: '--current-color';
  
  el.style.setProperty(varName, `var(--theme-${binding.value})`);
};