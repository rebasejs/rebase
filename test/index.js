import React from "react"
import { create } from "react-test-renderer"

import { theme, Box, Flex, Text, Heading, Button, Link, Image } from "../src"

const render = el => create(el)

describe("Box", () => {
  test("renders", () => {
    const json = render(<Box />).toJSON()
    expect(json.type).toBe("div")
  })

  test("renders with as prop", () => {
    const json = render(<Box as="header" />).toJSON()
    expect(json.type).toBe("header")
  })

  test("renders with style props", () => {
    const json = render(<Box width={1} />).toJSON()
    expect(json).toHaveStyleRule("width", "100%")
  })
})

describe("Button", () => {
  test("renders", () => {
    const json = render(<Button />).toJSON()
    expect(json.type).toBe("button")
  })

  test("renders disabled", () => {
    const button = render(<Button disabled />).toJSON()
    expect(button.props.disabled).toBe(true)
  })

  test("renders as <a>", () => {
    const json = render(<Button as="a" />).toJSON()
    expect(json.type).toBe("a")
  })
})

describe("Flex", () => {
  test("renders", () => {
    const json = render(<Flex />).toJSON()
    expect(json.type).toBe("div")
  })

  test("renders with flex props", () => {
    const json = render(<Flex alignItems="center" />).toJSON()
    expect(json).toHaveStyleRule("display", "flex")
    expect(json).toHaveStyleRule("align-items", "center")
  })

  test("renders with Box props", () => {
    const json = render(<Flex color="black" />).toJSON()
    expect(json).toHaveStyleRule("color", "black")
  })

  test("renders with as and Box props", () => {
    const json = render(<Flex as="footer" color="black" />).toJSON()
    expect(json.type).toBe("footer")
    expect(json).toHaveStyleRule("color", "black")
  })
})

describe("Heading", () => {
  test("renders", () => {
    const json = render(<Heading />).toJSON()
    expect(json.type).toBe("h1")
    expect(json).toHaveStyleRule("font-size", "24px")
    expect(json).toHaveStyleRule("font-weight", "bold")
  })
})

describe("Image", () => {
  test("renders", () => {
    const json = render(<Image />).toJSON()
    expect(json.type).toBe("img")
    expect(json).toHaveStyleRule("max-width", "100%")
  })
})

describe("Link", () => {
  test("renders", () => {
    const json = render(<Link />).toJSON()
    expect(json.type).toBe("a")
  })
})

describe("Text", () => {
  test("renders", () => {
    const json = render(<Text textAlign="center" fontWeight="bold" />).toJSON()
    expect(json.type).toBe("p")
    expect(json).toHaveStyleRule("text-align", "center")
    expect(json).toHaveStyleRule("font-weight", "bold")
  })
})
