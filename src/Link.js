import styled from "styled-components"

import { Box } from "./Box"

export const Link = styled(Box)({
  textDecoration: "none"
})

Link.defaultProps = {
  as: "a"
}
