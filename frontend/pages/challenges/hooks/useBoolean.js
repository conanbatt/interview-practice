import * as React from 'react';

const useBoolean = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);

  const toggleValue = React.useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggleValue];
};

export default useBoolean