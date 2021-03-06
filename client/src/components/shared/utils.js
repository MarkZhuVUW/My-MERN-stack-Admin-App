/**
 * handwritten url parameter parser.
 */
export function toParams(query) {
  const q = query.replace(/^\??\//, "");

  return q.split("&").reduce((values, param) => {
    const keyValuePair = param.split("=");
    const key = keyValuePair[0];
    const value = keyValuePair[1];
    const newValues = { ...values };

    newValues[key] = value;
    return newValues;
  }, {});
}

/**
 * handwritten query parser.
 */
export function toQuery(params, delimiter = "&") {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;
    if (index < keys.length - 1) {
      query += delimiter;
    }
    return query;
  }, "");
}
