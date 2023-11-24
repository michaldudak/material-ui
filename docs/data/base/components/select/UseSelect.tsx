import * as React from 'react';
import clsx from 'clsx';
import { useSelect, SelectProvider } from '@mui/base/useSelect';
import { SelectOption, useOption } from '@mui/base/useOption';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

export default function UseSelect() {
  return (
    <Select placeholder="Select a color…">
      {options.map((option) => {
        return (
          <Option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </Option>
        );
      })}
    </Select>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')`
  position: relative;
`;

const StyledToggle = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  position: relative;
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;


  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  padding: 5px;
  margin: 5px 0 0 0;
  position: absolute;
  height: auto;
  width: 100%;
  overflow: auto;
  z-index: 1;
  outline: 0px;
  list-style: none;
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s step-end;
  }
  `,
);

const StyledOption = styled('li')(
  ({ theme }) => `
  padding: 8px;
  border-radius: 0.45em;

  &[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.highlighted {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &[aria-selected='true'].highlighted {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.disabled {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.disabled) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &:before {
    content: '';
    width: 1ex;
    height: 1ex;
    margin-right: 1ex;
    background-color: var(--color);
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
  `,
);

interface SelectProps {
  children?: React.ReactNode;
  placeholder?: string;
}

interface OptionProps {
  children?: React.ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
}

function renderSelectedValue(option: SelectOption<string> | undefined) {
  return option ? `${option.label} (${option.value})` : null;
}

function Option(props: OptionProps) {
  const { children, value, className, disabled = false } = props;
  const { getRootProps, highlighted } = useOption({
    value,
    disabled,
    label: children,
  });

  return (
    <StyledOption
      {...getRootProps()}
      className={clsx({ highlighted, disabled }, className)}
      style={{ '--color': value } as any}
    >
      {children}
    </StyledOption>
  );
}

function Select({ children, placeholder }: SelectProps) {
  const listboxRef = React.useRef<HTMLUListElement>(null);
  const [listboxVisible, setListboxVisible] = React.useState(false);

  const { getButtonProps, getListboxProps, getOptionMetadata, contextValue, value } =
    useSelect<string, false>({
      listboxRef,
      onOpenChange: setListboxVisible,
      open: listboxVisible,
    });

  React.useEffect(() => {
    if (listboxVisible) {
      listboxRef.current?.focus();
    }
  }, [listboxVisible]);

  const selectedOption = value != null ? getOptionMetadata(value) : undefined;

  return (
    <Root>
      <StyledToggle {...getButtonProps()} style={{ '--color': value } as any}>
        {renderSelectedValue(selectedOption) || (
          <span className="placeholder">{placeholder ?? ' '}</span>
        )}

        <UnfoldMoreRoundedIcon />
      </StyledToggle>
      <StyledListbox
        {...getListboxProps()}
        aria-hidden={!listboxVisible}
        className={listboxVisible ? '' : 'hidden'}
      >
        <SelectProvider value={contextValue}>{children}</SelectProvider>
      </StyledListbox>
    </Root>
  );
}

const options = [
  {
    label: 'Red',
    value: '#D32F2F',
  },
  {
    label: 'Green',
    value: '#4CAF50',
  },
  {
    label: 'Blue',
    value: '#2196F3',
  },
  {
    label: 'Yellow',
    value: '#FFEB3B',
    disabled: true,
  },
  {
    label: 'Purple',
    value: '#9C27B0',
  },
  {
    label: 'Grey',
    value: '#9E9E9E',
  },
];
