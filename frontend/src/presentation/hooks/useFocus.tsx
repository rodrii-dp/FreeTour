import {useState} from 'react';

export const useFocus = <T extends string>() => {
  const [focusedInput, setFocusedInput] = useState<T | null>(null);

  const handleFocus = (input: T) => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);

  return {
    focusedInput,
    handleFocus,
    handleBlur,
  };
};
