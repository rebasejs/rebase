import React, { useState, useEffect } from 'react';
import PropsTypes from 'prop-types';
import styled from 'styled-components';
import { overflow, borders, textAlign } from 'styled-system';
import { lighten } from 'polished';
import { ulid } from 'ulid';
import useForceUpdate from 'use-force-update';

import Box from './Box';
import Flex from './Flex';

const TableBox = styled(Box)(
  {
    borderSpacing: 0,
    borderCollapse: 'collapse',
  },
  textAlign,
  borders,
  overflow,
);

const TH = styled(TableBox)((props) => {
  const {
    theme: { colors = {} },
    sortable,
  } = props;
  return {
    borderColor: lighten(0.6, colors.dark || '#000'),
    ':hover': {
      cursor: sortable && 'pointer',
      borderColor: sortable && lighten(0.3, colors.dark || '#000'),
    },
  };
});

TH.defaultProps = {
  as: 'th',
};

const TR = styled(TableBox)((props) => {
  const {
    theme: { colors = {} },
    isStriped,
    hoverable,
  } = props;
  return {
    background: isStriped ? lighten(0.77, colors.dark || '#000') : '#fff',
    ':hover': {
      background: hoverable && lighten(0.75, colors.dark || '#000'),
    },
  };
});

TR.defaultProps = {
  as: 'tr',
};

const Table = (props) => {
  const {
    data,
    labels,
    sortables,
    striped,
    hoverable,
    defaultSortField,
    defaultSortDirection,
  } = props;
  const [sortedData, setSortedData] = useState(data);
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);
  const forceUpdate = useForceUpdate();

  const ths = Object.keys(data[0]);

  const sortData = () => {
    const ascending = sortDirection === 'asc';
    setSortedData(
      data.sort((a, b) => {
        return ascending
          ? (a[sortField] > b[sortField]) - (a[sortField] < b[sortField])
          : (a[sortField] < b[sortField]) - (a[sortField] > b[sortField]);
      }),
    );
  };

  useEffect(() => {
    sortData();
    forceUpdate();
  }, [sortField, sortDirection]);

  return (
    <TableBox overflow="auto">
      <TableBox as="table" width="100%">
        <TableBox as="thead">
          <TableBox as="tr">
            {ths.map((th) => {
              const sortable = sortables.some((s) => s === th);
              const ascending = sortDirection === 'asc';
              return (
                <TH
                  key={th}
                  as="th"
                  py={2}
                  px={3}
                  borderBottom="2px solid"
                  sortable={sortable}
                  onClick={() => {
                    if (!sortable) return;
                    setSortField(th);
                    setSortDirection(ascending ? 'desc' : 'asc');
                  }}
                >
                  <Flex display="flex" alignItems="center">
                    {labels[th] || th}
                    {sortField === th && (
                      <Flex
                        as="span"
                        display="inline-flex"
                        justifyContent="center"
                        alignItems="center"
                        height={14}
                        ml={2}
                        style={{
                          transform: ascending
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                          transition: 'transform .15s ease-out',
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                          }}
                        >
                          <path
                            fill="currentColor"
                            d="M6.101 261.899L25.9 281.698c4.686 4.686 12.284 4.686 16.971 0L198 126.568V468c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12V126.568l155.13 155.13c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 35.515c-4.686-4.686-12.284-4.686-16.971 0L6.101 244.929c-4.687 4.686-4.687 12.284 0 16.97z"
                          />
                        </svg>
                      </Flex>
                    )}
                  </Flex>
                </TH>
              );
            })}
          </TableBox>
        </TableBox>
        <TableBox as="tbody">
          {sortedData.map((item, i) => (
            <TR
              key={ulid()}
              as="tr"
              isStriped={striped && i % 2 !== 0}
              hoverable={hoverable}
            >
              {Object.values(item).map((value) => (
                <TableBox key={ulid()} as="td" py={2} px={3}>
                  {value}
                </TableBox>
              ))}
            </TR>
          ))}
        </TableBox>
      </TableBox>
    </TableBox>
  );
};

Table.defaultProps = {
  labels: {},
  sortables: [],
  striped: false,
  hoverable: false,
  defaultSortField: '',
  defaultSortDirection: '',
};

Table.propTypes = {
  data: PropsTypes.arrayOf(PropsTypes.object).isRequired,
  labels: PropsTypes.shape(),
  sortables: PropsTypes.arrayOf(PropsTypes.string),
  striped: PropsTypes.bool,
  hoverable: PropsTypes.bool,
  defaultSortField: PropsTypes.string,
  defaultSortDirection: PropsTypes.string,
};

export default Table;
