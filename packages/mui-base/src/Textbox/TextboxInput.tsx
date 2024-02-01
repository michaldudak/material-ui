import * as React from 'react';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { TextboxContext } from './TextboxContext';
import { useTextboxInput } from '../useTextbox';
import { TextboxInputProps } from './TextboxInput.types';
import { textboxClasses as classes } from './textboxClasses';

function defaultRender(props: React.ComponentPropsWithRef<'input'>) {
  return <input {...props} />;
}

/**
 * @ignore - do not document.
 */
const TextboxInput = React.forwardRef(function TextboxInput(
  props: TextboxInputProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const { render = defaultRender, className, ...other } = props;

  const context = React.useContext(TextboxContext);
  if (!context) {
    throw new Error('TextboxInput must be used within an Textbox');
  }

  const { getProps, ref } = useTextboxInput({ ...context, inputRef: forwardedRef });

  const updateRef = React.useCallback(
    (element: HTMLElement | null) => {
      context.registerInput(element);
    },
    [context],
  );

  const handleRef = useForkRef(ref, updateRef);

  const inputProps = {
    ...getProps(other),
    className: clsx(className, classes.input),
    ref: handleRef,
  };

  return render(inputProps, context.ownerState);
});

export { TextboxInput };
