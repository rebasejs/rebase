import PropTypes from 'prop-types'
import { darken, lighten, transparentize, readableColor } from 'polished'

import { createTheme, theme as defaultTheme } from './theme'

const getTheme = ({ theme }) => createTheme({ colors: { ...defaultTheme.colors, ...theme.colors } })

const is = n => n !== undefined && n !== null

const get = (obj, ...paths) => {
  const value = paths.reduce((a, path) => {
    if (is(a)) return a
    const keys = typeof path === 'string' ? path.split('.') : [path]
    return keys.reduce((a, key) => (a && is(a[key]) ? a[key] : null), obj)
  }, null)

  return is(value) ? value : paths[paths.length - 1]
}

export const variant = ({ key, prop = 'variant' }) => {
  const fn = props => get(getTheme(props), [key, props[prop]].join('.'), null)
  fn.propTypes = {
    [prop]: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }
  return fn
}

export function getReadableColor(color) {
  return readableColor(color, darken(0.4, color), lighten(0.45, color))
}

const getBackgroundColor = props => {
  const theme = getTheme(props)
  return props.variant
    ? theme.buttons[props.variant].background
    : theme.colors[props.bg] || props.bg || theme.colors.light
}

export const elementState = props => {
  const backgroundColor = getBackgroundColor(props)
  return {
    ':hover': {
      background: darken(0.06, backgroundColor)
    },
    ':active': {
      background: darken(0.12, backgroundColor),
      boxShadow: `0 0 0 0.2rem ${transparentize(0.75, backgroundColor)}`
    },
    ':disabled': {
      background: backgroundColor,
      opacity: 0.5
    }
  }
}
