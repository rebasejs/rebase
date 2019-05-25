import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from 'react-testing-library';
import { readableColor, darken, lighten } from 'polished';
import { ThemeProvider } from 'styled-components';

import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Table,
  Text,
} from '../src';

describe('Badge', () => {
  test('renders', () => {
    const json = TestRenderer.create(<Badge />).toJSON();
    expect(json.type).toBe('div');
  });

  test('renders with correct border-radius', () => {
    const json = TestRenderer.create(<Badge as="header" />).toJSON();
    expect(json).toHaveStyleRule('border-radius', '9999px');
  });

  test('renders with bg', () => {
    const json = TestRenderer.create(<Badge bg="salmon" />).toJSON();
    expect(json).toHaveStyleRule('background-color', 'salmon');
  });
});

describe('Box', () => {
  test('renders', () => {
    const json = TestRenderer.create(<Box />).toJSON();
    expect(json.type).toBe('div');
  });

  test('renders with as prop', () => {
    const json = TestRenderer.create(<Box as="header" />).toJSON();
    expect(json.type).toBe('header');
  });

  test('renders with style props', () => {
    const json = TestRenderer.create(<Box width={1} />).toJSON();
    expect(json).toHaveStyleRule('width', '100%');
  });
});

describe('Button', () => {
  test('renders', () => {
    const json = TestRenderer.create(<Button />).toJSON();
    expect(json.type).toBe('button');
  });

  test('renders with bg', () => {
    const json = TestRenderer.create(<Button bg="salmon" />).toJSON();
    expect(json).toHaveStyleRule('background-color', 'salmon');
  });

  test('renders disabled', () => {
    const button = TestRenderer.create(<Button disabled />).toJSON();
    expect(button.props.disabled).toBe(true);
  });

  test('renders as <a>', () => {
    const json = TestRenderer.create(<Button as="a" />).toJSON();
    expect(json.type).toBe('a');
  });
});

describe('Flex', () => {
  test('renders', () => {
    const json = TestRenderer.create(<Flex />).toJSON();
    expect(json.type).toBe('div');
  });

  test('renders with flex props', () => {
    const json = TestRenderer.create(<Flex alignItems="center" />).toJSON();
    expect(json).toHaveStyleRule('display', 'flex');
    expect(json).toHaveStyleRule('align-items', 'center');
  });

  test('renders with Box props', () => {
    const json = TestRenderer.create(<Flex color="black" />).toJSON();
    expect(json).toHaveStyleRule('color', 'black');
  });

  test('renders with as and Box props', () => {
    const json = TestRenderer.create(
      <Flex as="footer" color="black" />,
    ).toJSON();
    expect(json.type).toBe('footer');
    expect(json).toHaveStyleRule('color', 'black');
  });
});

describe('Heading', () => {
  test('renders', () => {
    const json = TestRenderer.create(<Heading />).toJSON();
    expect(json.type).toBe('h1');
    expect(json).toHaveStyleRule('font-size', '24px');
    expect(json).toHaveStyleRule('font-weight', 'bold');
  });
});

describe('Image', () => {
  test('renders', () => {
    const json = TestRenderer.create(<Image />).toJSON();
    expect(json.type).toBe('img');
    expect(json).toHaveStyleRule('max-width', '100%');
  });
});

describe('Link', () => {
  test('renders', () => {
    const json = TestRenderer.create(<Link href />).toJSON();
    expect(json.type).toBe('a');
  });
});

describe('Text', () => {
  test('renders', () => {
    const json = TestRenderer.create(
      <Text textAlign="center" fontWeight="bold" />,
    ).toJSON();
    expect(json.type).toBe('p');
    expect(json).toHaveStyleRule('text-align', 'center');
    expect(json).toHaveStyleRule('font-weight', 'bold');
  });
});

describe('Table', () => {
  const data = [
    {
      position: 1,
      team: 'Palmeiras',
    },
    {
      position: 2,
      team: 'Novorizontino',
    },
    {
      position: 3,
      team: 'Guarani',
    },
    {
      position: 4,
      team: 'São Bento',
    },
  ];

  test('renders', () => {
    const json = TestRenderer.create(<Table data={data} />).toJSON();
    expect(json.type).toBe('div');
  });

  test('renders with props', () => {
    const table = TestRenderer.create(<Table data={data} striped />);
    const tableInstance = table.root;
    expect(tableInstance.props.striped).toBe(true);
  });

  test('tests events', () => {
    const { container, getByText } = render(
      <Table data={data} sortables={['position']} hoverable />,
    );

    const table = container.querySelector('table');
    expect(table.children[1].children[0].children[1].textContent).toBe(
      'Palmeiras',
    );
    fireEvent.click(getByText(/position/i));
    fireEvent.click(getByText(/position/i));
    expect(table.children[1].children[0].children[1].textContent).toBe(
      'São Bento',
    );
    fireEvent.click(getByText(/team/i));
    fireEvent.mouseEnter(getByText(/Palmeiras/i));
  });
});

describe('Custom theme', () => {
  test('renders with variant', () => {
    const customTheme = {
      colors: {
        primary: '#F15F15',
      },
    };
    const json = TestRenderer.create(
      <ThemeProvider theme={customTheme}>
        <Button variant="primary" />
      </ThemeProvider>,
    ).toJSON();
    expect(json).toHaveStyleRule('background', customTheme.colors.primary);
    expect(json).toHaveStyleRule(
      'color',
      readableColor(
        customTheme.colors.primary,
        darken(0.4, customTheme.colors.primary),
        lighten(0.4, customTheme.colors.primary),
      ),
    );
  });

  test('renders with bg props with color from theme', () => {
    const customTheme = {
      colors: {
        primary: '#F15F15',
      },
    };
    const json = TestRenderer.create(
      <ThemeProvider theme={customTheme}>
        <Button bg="primary" />
      </ThemeProvider>,
    ).toJSON();
    expect(json).toHaveStyleRule(
      'background-color',
      customTheme.colors.primary,
    );
  });

  test('renders with bg props with css color', () => {
    const customTheme = {
      colors: {
        primary: '#F15F15',
      },
    };
    const json = TestRenderer.create(
      <ThemeProvider theme={customTheme}>
        <Button bg="red" />
      </ThemeProvider>,
    ).toJSON();
    expect(json).toHaveStyleRule('background-color', 'red');
  });

  test('renders with default bg props', () => {
    const customTheme = {
      colors: {
        primary: '#F15F15',
      },
    };
    const json = TestRenderer.create(
      <ThemeProvider theme={customTheme}>
        <Button />
      </ThemeProvider>,
    ).toJSON();
    expect(json).toHaveStyleRule('background-color', undefined);
  });
});
