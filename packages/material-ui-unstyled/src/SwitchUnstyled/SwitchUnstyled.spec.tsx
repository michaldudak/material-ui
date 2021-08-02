import * as React from 'react';
import SwitchUnstyled from '@material-ui/unstyled/SwitchUnstyled';
import { expectType } from '@material-ui/types';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

const FormControlUnstyledTest = () => (
  <div>
    <SwitchUnstyled defaultChecked />
    {/* @ts-expect-error */}
    <SwitchUnstyled invalidProp={0} />

    <SwitchUnstyled components={{ Thumb: 'a' }} componentsProps={{ thumb: { href: '#' } }} />
    {/* @ts-expect-error */}
    <SwitchUnstyled components={{ Thumb: 'a' }} componentsProps={{ thumb: { invalidProp: 0 } }} />

    <SwitchUnstyled componentsProps={{ thumb: { id: 'thumb' } }} />
    {/* @ts-expect-error */}
    <SwitchUnstyled componentsProps={{ thumb: { invalidProp: 0 } }} />

    <SwitchUnstyled
      components={{ Thumb: CustomComponent }}
      componentsProps={{ thumb: { stringProp: 'test', numberProp: 0 } }}
    />

    {/* @ts-expect-error: stringProp type mismatch */}
    <SwitchUnstyled components={{ Thumb: CustomComponent }} componentsProps={{ thumb: { stringProp: 42, numberProp: 0 } }} />

    {/* @ts-expect-error: missing required numberProp */}
    <SwitchUnstyled components={{ Thumb: CustomComponent }} componentsProps={{ thumb: { stringProp: 'test' } }} />

    <SwitchUnstyled
      components={{ Thumb: 'button' }}
      componentsProps={{
        thumb: {
          onClick: (e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity(),
          ref: (elem) => {
            expectType<HTMLButtonElement | null, typeof elem>(elem);
          },
        },
      }}
    />
  </div>
);
