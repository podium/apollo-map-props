export default function get(object, key, ...keys) {
  if (!object || typeof object !== 'object') return null;
  const value = object[key];
  if (keys.length === 0) return value;
  return get(value, ...keys);
}

