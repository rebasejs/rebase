import styled from 'styled-components';
import {
  space,
  color,
  width,
  height,
  flex,
  order,
  alignSelf,
  fontSize,
  variant,
} from 'styled-system';

const boxes = variant({ key: 'boxes' });

const Box = styled('div')(
  {
    boxSizing: 'border-box',
  },
  space,
  width,
  height,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  boxes,
);

Box.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...fontSize.propTypes,
  ...color.propTypes,
  ...flex.propTypes,
  ...order.propTypes,
  ...alignSelf.propTypes,
  ...boxes.propTypes,
};

export default Box;
