import { getReadableColor } from './utils'

const themeColors = {
  primary: '#5f4b8b',
  info: '#4fb3f1',
  success: '#3fdf79',
  warning: '#f2e24f',
  danger: '#ff566f',
  dark: '#2d3747',
  light: '#f8f9fa',
  gray: '#eef1f5'
}

export const createTheme = ({ colors, components = ['badges', 'boxes', 'buttons'] }) => {
  const variants = {}
  Object.entries(colors).map(
    color =>
      (variants[color[0]] = {
        color: getReadableColor(color[1]),
        background: color[1]
      })
  )
  const componentsWithVariants = {}
  components.map(component => (componentsWithVariants[component] = { ...variants }))
  return {
    colors,
    ...componentsWithVariants
  }
}

export const theme = createTheme({ colors: themeColors })
