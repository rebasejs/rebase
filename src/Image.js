import styled from 'styled-components'
import { width, height, borderRadius } from 'styled-system'

import { Box } from './Box'

export const Image = styled(Box)(
  {
    maxWidth: '100%',
    height: 'auto'
  },
  width,
  height,
  borderRadius
)

Image.propTypes = {
  ...width.propTypes,
  ...height.propTypes,
  ...borderRadius.propTypes
}

Image.defaultProps = {
  as: 'img',
  m: 0
}
