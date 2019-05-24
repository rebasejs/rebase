import PropTypes from 'prop-types';
import { darken, lighten, transparentize, readableColor } from 'polished';

const is = (n) => n !== undefined && n !== null;

const get = (obj, ...paths) => {
  const value = paths.reduce((v, path) => {
    if (is(v)) return v;
    const keys = typeof path === 'string' ? path.split('.') : [path];
    return keys.reduce((a, key) => (a && is(a[key]) ? a[key] : null), obj);
  }, null);
  return is(value) ? value : paths[paths.length - 1];
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
  const fn = (props) => {
    const { theme } = props;
    if (!theme.colors) return {};
    const variants = generateVariants(theme.colors);
    return get(
      { ...theme, [key]: { ...variants } },
      [key, props[prop]].join('.'),
      null,
    );
  };
  fn.propTypes = {
    [prop]: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };
  return fn;
};

export const elementState = (props) => {
  const { theme } = props;
  if (!theme.colors) return {};
  const backgroundColor = props.variant
    ? theme.colors[props.variant]
    : theme.colors[props.bg] || props.bg || 'transparent';
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
