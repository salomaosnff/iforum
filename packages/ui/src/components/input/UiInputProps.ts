
export const UiInputProps = {
  color: {
    type: String,
    default: 'foreground',
  },

  error: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
  hint: {
    type: String,
    default: undefined,
  },
  hideMessages: Boolean,
  disabled: Boolean,
  prependIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
} as const;