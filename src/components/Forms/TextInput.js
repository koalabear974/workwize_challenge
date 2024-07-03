import React from 'react';
import { TextInput as FlowbiteTextInput } from 'flowbite-react';


const TextInput = ({error, ...props}) => {
  let inputProps = {...props}

  if (error) {
    inputProps = {
      ...props,
      helperText: (
        <>
          <span className="font-medium">Oops!</span> {error}
        </>
      ),
      color: 'failure',
    }
  }

  return (
    <FlowbiteTextInput
      {...inputProps}
    />
  );
};

export default TextInput;
