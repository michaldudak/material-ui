/* eslint-disable react/no-danger */
import * as React from 'react';
import { ComponentClassDefinition } from '@mui-internal/docs-utilities';
import { styled, alpha } from '@mui/material/styles';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';
import { getHash } from 'docs/src/modules/components/ApiPage/list/ClassesList';

const StyledTable = styled('table')(
  ({ theme }) => ({
    '& .class-name': {
      flexShrink: 0,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontFamily: theme.typography.fontFamilyCode,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .class-key': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      padding: '1px 4px',
      borderRadius: 6,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.8),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .class-name': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
      '& .class-key': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: alpha(darkTheme.palette.primary[400], 0.1),
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.4),
      },
    },
  }),
);

interface ClassesTableProps {
  componentName: string;
  classes: ComponentClassDefinition[];
  displayClassKeys?: boolean;
}

export default function ClassesTable(props: ClassesTableProps) {
  const { classes, componentName, displayClassKeys } = props;
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Class name</th>
          {displayClassKeys && <th>Rule name</th>}
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((params) => {
          const { className, key, description } = params;

          return (
            <tr key={className} id={getHash({ componentName, className: key })}>
              <td>
                <span className="class-name">.{className}</span>
              </td>
              {displayClassKeys && (
                <td>
                  <span className="class-key">{key}</span>
                </td>
              )}
              <td>
                <span
                  dangerouslySetInnerHTML={{
                    __html: description || '',
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}
