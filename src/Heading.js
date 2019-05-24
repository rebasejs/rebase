import styled from 'styled-components';

import Text from './Text';

const Heading = styled(Text)({});

Heading.defaultProps = {
  as: 'h1',
  m: 0,
  fontSize: 4,
  fontWeight: 'bold',
};

export default Heading;
