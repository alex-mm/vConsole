export function stringifyQuery(obj) {
  const param = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (value && typeof value === 'object') {
      value = JSON.stringify(value);
    }
    param.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });
  return param.join('&');
}

export function parseQuery(str = location.search) {
  const ret = {};

  if (typeof str !== 'string') {
    return ret;
  }

  const s = str.trim().replace(/^(\?|#|&)/, '');

  if (!s) {
    return ret;
  }

  s.split('&').forEach((param) => {
    const parts = param.replace(/\+/g, ' ').split('=');
    let key = parts.shift();
    let val = parts.length > 0 ? parts.join('=') : undefined;

    key = decodeURIComponent(key);

    val = val === undefined ? null : decodeURIComponent(val);

    if (ret[key] === undefined) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
  });

  return ret;
}
