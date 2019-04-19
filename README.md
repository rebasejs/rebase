# Rebase

Set of UI components built for [React][] with [styled-components][] and [styled-system][].

Read the docs: [https://rebasejs.com][]

[![Netlify Status](netlify-badge)](netlify)
[![Build Status][badge]][travis]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][npm]
[![Version][version-badge]][npm]
[![MIT License][license-badge]](LICENSE.md)

[netlify-badge]: https://api.netlify.com/api/v1/badges/92138a79-33c7-46fe-a8a5-60130a1fac18/deploy-status
[netlify]: https://app.netlify.com/sites/rebasejs/deploys
[badge]: https://flat.badgen.net/travis/rebasejs/rebase/master
[travis]: https://travis-ci.org/rebasejs/rebase
[coverage-badge]: https://flat.badgen.net/codecov/c/github/rebasejs/rebase
[coverage]: https://codecov.io/github/rebasejs/rebase
[downloads-badge]: https://flat.badgen.net/npm/dw/@rebasejs/rebase
[version-badge]: https://flat.badgen.net/npm/v/@rebasejs/rebase
[license-badge]: https://flat.badgen.net/badge/license/MIT/blue
[npm]: https://npmjs.com/package/@rebasejs/rebase

## Getting Started

### Installation

```bash
npm i @rebasejs/rebase
```

### Components

- [Badge](https://rebasejs.com/components/badge)
- [Box](https://rebasejs.com/components/box)
- [Button](https://rebasejs.com/components/button)
- [Flex](https://rebasejs.com/components/flex)
- [Heading](https://rebasejs.com/components/heading)
- [Image](https://rebasejs.com/components/image)
- [Link](https://rebasejs.com/components/link)
- [Text](https://rebasejs.com/components/text)

### Usage

```jsx
import React from 'react'
import { Box, Heading, Button } from '@rebasejs/rebase'

export default () => (
  <Box>
    <Heading>Hello</Heading>
    <Button variant="primary">Rebase</Button>
  </Box>
)
```

### Related

- [React][]
- [styled-system][]
- [styled-components][]

[https://rebasejs.com]: https://rebasejs.com
[react]: https://reactjs.org/
[styled-components]: https://www.styled-components.com/
[styled-system]: https://styled-system.com/
