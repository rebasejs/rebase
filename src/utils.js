import PropTypes from 'prop-types';
import { darken, lighten, transparentize, readableColor } from 'polished';

const defaultColors = {
  primary: '#6A5ACD',
  success: '#00FA9A',
  danger: '#FA8072',
  warning: '#FFD700',
  info: '#87CEFA',
  light: '#F5F5F5',
  dark: '#333333',
};

const is = (n) => n !== undefined && n !== null;

const get = (obj, ...paths) => {
  const value = paths.reduce((v, path) => {
    if (is(v)) return v;
    const keys = typeof path === 'string' ? path.split('.') : [path];
    return keys.reduce((a, key) => (a && is(a[key]) ? a[key] : null), obj);
  }, null);
  return is(value) ? value : paths[paths.length - 1];
};

const merge = (a, b) => {
  const result = {};
  Object.keys(a).forEach((key) => {
    result[key] = a[key];
  });
  Object.keys(b).forEach((key) => {
    if (!a[key] || typeof a[key] !== 'object') {
      result[key] = b[key];
    } else {
      result[key] = merge(a[key], b[key]);
    }
  });
  return result;
};

const generateVariants = (colors) => {
  const variants = Object.keys(colors).reduce((acc, color) => {
    acc[color] = {
      background: colors[color],
      color: readableColor(
        colors[color],
        darken(0.4, colors[color]),
        lighten(0.4, colors[color]),
      ),
    };
    return acc;
  }, {});
  return variants;
};

export const variant = ({ key, prop = 'variant' }) => {
  let theme = { colors: defaultColors };
  const fn = (props) => {
    theme = merge(theme, props.theme);
    const variants = generateVariants(theme.colors);
    return get(
      { ...theme, [key]: { ...variants } },
      [key, props[prop]].join('.'),
      null,
    );
  };
  fn.propTypes = {
    [prop]: PropTypes.oneOf(Object.keys(theme.colors)),
  };
  return fn;
};

export const elementState = (props) => {
  let theme = { colors: defaultColors };
  theme = merge(theme, props.theme);
  const backgroundColor = props.variant
    ? theme.colors[props.variant]
    : props.bg || theme.colors.light;
  return {
    ':hover': {
      background: darken(0.06, backgroundColor),
    },
    ':active': {
      background: darken(0.12, backgroundColor),
      boxShadow: `0 0 0 0.2rem ${transparentize(0.75, backgroundColor)}`,
    },
    ':disabled': {
      background: backgroundColor,
      opacity: 0.5,
    },
  };
};
