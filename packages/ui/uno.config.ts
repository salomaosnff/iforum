import { defineConfig, presetUno, presetWebFonts, presetTypography,transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetTheme } from './uno/theme';


export default defineConfig({
  theme: {
    theme: {
      dark: {
        palette: {
          primary: 'red',
          background: 'black',
          foreground: 'white',
        },
      },
      light: {
        palette: {
          primary: 'red',
          background: 'white',
          foreground: 'black',
        },
      },
    }, 
  },
  presets: [
    presetTheme(),
    presetUno(),
    presetWebFonts({
      fonts: {
        'sans': [
          'Inter',
          'Noto Color Emoji',
        ],
        'title': [
          'Patua One',
          'Noto Color Emoji',
        ],
      },
    }),
    presetTypography({
      cssExtend: {
        'h1,h2,h3,h4,h5,h6,table th': {
          'font-family': 'Patua One',
          'font-weight': 'normal', 
        },
        'table th': { 'border-bottom': '2px solid currentColor' },
        'blockquote': {
          'padding': '8px 16px',
          'border-left': '4px solid currentColor', 
        },
        'ul,ol': { 'margin-left': '4px' },
      }, 
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [
    'theme--dark',
    'theme--light',
  ],
});