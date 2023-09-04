import { Preset } from 'unocss';

export interface IForumThemeConfig {
  palette?: Record<string, string>
  variables?: Record<string, string>

}
export type IForumThemeList = Record<string, IForumThemeConfig>

export interface IForumTheme {
  theme: IForumThemeList
}

export function presetTheme(): Preset<IForumTheme> {
  return {
    name: 'theme',
    rules: [
      [
        /^theme-vars--(.+)/,
        ([, themeName], { theme }) => {
          const themeConfig = theme.theme[themeName];
  
          if (!themeConfig) {
            console.warn(`O Theme ${themeName} não existe!`);
            return {};
          }
  
          const css: Record<string, string> = {};
  
          for (const [
            token,
            value,
          ] of Object.entries(themeConfig.palette ?? {})) {
            css[`--theme-${token}`] = value;
          }
          for (const [
            name,
            value,
          ] of Object.entries(themeConfig.variables ?? {})) {
            css[`--theme-${name}`] = value;
          }
          return css;
        },
        
      ],
      [
        /^fg--(.+)/,
        ([,token]) => ({ 'color': `var(--theme-${token})` }),
      ],
      [
        /^bg--(.+)/,
        ([,token]) => ({ 'background-color': `var(--theme-${token})` }),
      ],
    ],
    shortcuts: [
      [
        /^theme--(.+)/,
        ([, token]) => [
          `theme-vars--${token}`,
          'fg--foreground',
          'bg--background',
        ],
      ],
    ],
  };
}