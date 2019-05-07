import styled from 'styled-components'
import { variant } from 'styled-system'

import { Box } from './Box'

const badges = variant({ key: 'badges' })

export const Badge = styled(Box)(
  {
    display: 'inline-block',
    textAlign: 'center',
    borderRadius: 9999
  },
  badges
)

Badge.propTypes = {
  ...badges.propTypes
}

Badge.defaultProps = {
  fontSize: 0,
  px: 2,
  py: 1
}
