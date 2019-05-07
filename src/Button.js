import styled from "styled-components"
import { fontWeight, borders, borderColor, borderRadius, variant } from "styled-system"

import { Box } from "./Box"

const buttons = variant({ key: "buttons" })

export const Button = styled(Box)(
  {
    appearance: "none",
    display: "inline-block",
    textAlign: "center",
    lineHeight: "inherit",
    textDecoration: "none",
    outline: "none"
  },
  fontWeight,
  borders,
  borderColor,
  borderRadius,
  buttons
)

Button.propTypes = {
  ...fontWeight.propTypes,
  ...borders.propTypes,
  ...borderColor.propTypes,
  ...borderRadius.propTypes,
  ...buttons.propTypes
}

Button.defaultProps = {
  as: "button",
  fontSize: "inherit",
  m: 0,
  px: 3,
  py: 2,
  border: 0,
  borderRadius: 4
}
