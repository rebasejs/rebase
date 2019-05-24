import styled from 'styled-components';

import Box from './Box';

const Link = styled(Box)({
  textDecoration: 'none',
});

Link.defaultProps = {
  as: 'a',
};

export default Link;
