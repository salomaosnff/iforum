import { defineConfig, presetUno, presetWebFonts, presetTypography,transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetTheme } from './uno/theme';


export default defineConfig({
  theme: {
    theme: {
      dark: {
        palette: {
          primary: '#379936',
          secondary: '#C91517',
          background: '#1B1B1B',
          foreground: '#E4E4E4',
          panel: '#FFFFFFE0',
          danger: '#CC2C6C',
          warning: '#FCA400',
          info: '#2347FC',
          success: '#21AF45',
          'input-bg': '#FFFFFF19',
        },
      },
      light: {
        palette: {
          primary: '#379936',
          secondary: '#C91517',
          background: '#e4e4e4',
          foreground: '#1B1B1B',
          panel: '#00000033',
          danger: '#CC2C6C',
          warning: '#FCA400',
          info: '#2347FC',
          success: '#21AF45',
          'input-bg': '#00000019',
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