export const getErrorMessage = (errors, name) => {
  if (name in errors) {
    return errors[name];
  }

  const nameKeys = name
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.');

  for (let i = 0, n = nameKeys.length; i < n; ++i) {
    let key = nameKeys[i];
    if (key in errors) {
      errors = errors[key];
    } else {
      return;
    }
  }
  return errors;
};
