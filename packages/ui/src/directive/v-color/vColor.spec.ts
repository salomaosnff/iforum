import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { withDirectives } from 'vue';
import { vColor } from './vColor';

describe('vColor', () => {
  it('Deve adicionar a variavel current-color', () => {
    const wrapper = mount(() => withDirectives(h('div'), [
      [
        vColor,
        'primary',
      ],
    ]));

    expect(wrapper.attributes()).contain({ style: '--current-color: var(--theme-primary);' });

  });

  it('Deve adicionar a variavel current-color', () => {
    const wrapper = mount(() => withDirectives(h('div'), [
      [
        vColor,
        'primary',
        'part',
      ],
    ]));

    expect(wrapper.attributes()).contain({ style: '--current-part-color: var(--theme-primary);' });
  });
});