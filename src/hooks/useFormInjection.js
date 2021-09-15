import { useCallback, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

const useFormInjection = () => {
  const {
    errors,
    formState,
    reset,
    watch,
    trigger,
    setError,
    setValue,
    getValues,
    clearErrors,
  } = useFormContext();

  const formMethods = useRef({
    clearErrors,
    getValues,
    reset,
    setError,
    setValue,
    watch,
    trigger,
  });

  const formInjection = useCallback(
    (toInjection, options = {}) => {
      if (typeof toInjection === 'function') {
        return toInjection({
          errors,
          formState,
          ...formMethods.current,
          ...options,
        });
      }
      return toInjection;
    },
    [errors, formState]
  );

  return formInjection;
};

export default useFormInjection;
