// Formats values logged in the Sandpack runner the way browser devtools do:
// top-level text is shown as-is, text inside arrays/objects is quoted.
//
// Values arrive serialized from the sandbox iframe. Non-JSON values are encoded as
// { "@t": type, data } (or "#@t"), and circular references as { "@r": index }.

const TYPE_KEYS = ['@t', '#@t'];
const MAX_DEPTH = 4;

const formatSpecial = (type, data, depth) => {
  switch (type) {
    case 'Arithmetic':
      return ['Infinity', '-Infinity', '-0'][data] ?? String(data);
    case '[[NaN]]':
      return 'NaN';
    case '[[undefined]]':
      return 'undefined';
    case 'Function':
      return `ƒ ${data?.name || 'anonymous'}()`;
    case '[[Date]]':
      return new Date(data).toString();
    case '[[RegExp]]':
      return `/${data.src}/${data.flags}`;
    case '[[Error]]':
      return `${data.name}: ${data.message}`;
    case '[[Map]]': {
      const pairs = [];
      for (let i = 0; i < data.length; i += 2) {
        pairs.push(`${formatValue(data[i], true, depth + 1)} => ${formatValue(data[i + 1], true, depth + 1)}`);
      }
      return `Map(${pairs.length}) { ${pairs.join(', ')} }`;
    }
    case '[[Set]]':
      return `Set(${data.length}) { ${data.map((v) => formatValue(v, true, depth + 1)).join(', ')} }`;
    case 'HTMLElement':
      return `<${String(data?.tagName ?? 'element').toLowerCase()}>`;
    default:
      return `[${type}]`;
  }
};

export function formatValue(value, nested = false, depth = 0) {
  if (value === null) return 'null';
  switch (typeof value) {
    case 'string':
      return nested ? JSON.stringify(value) : value;
    case 'number':
    case 'boolean':
    case 'bigint':
      return String(value);
    case 'undefined':
      return 'undefined';
    default:
      break;
  }

  if (Array.isArray(value)) {
    if (depth >= MAX_DEPTH) return '[…]';
    return `[${value.map((v) => formatValue(v, true, depth + 1)).join(', ')}]`;
  }

  const typeKey = TYPE_KEYS.find((key) => key in value);
  if (typeKey) return formatSpecial(value[typeKey], value.data, depth);
  if ('@r' in value) return '[Circular]';

  const entries = Object.entries(value);
  if (!entries.length) return '{}';
  if (depth >= MAX_DEPTH) return '{…}';
  return `{ ${entries.map(([key, v]) => `${key}: ${formatValue(v, true, depth + 1)}`).join(', ')} }`;
}

// Rows and columns for console.table: one row per item, one column per key
export function toTable(value) {
  const rows = Array.isArray(value) ? value.map((v, i) => [i, v]) : Object.entries(value ?? {});
  const isRecord = (v) => v && typeof v === 'object' && !Array.isArray(v) && !TYPE_KEYS.some((k) => k in v);
  const keys = [...new Set(rows.flatMap(([, v]) => (isRecord(v) ? Object.keys(v) : [])))];
  const hasValues = rows.some(([, v]) => !isRecord(v));
  const columns = ['(index)', ...keys, ...(hasValues ? ['Value'] : [])];
  const cells = rows.map(([index, v]) => [
    String(index),
    ...keys.map((k) => (isRecord(v) && k in v ? formatValue(v[k], true) : '')),
    ...(hasValues ? [isRecord(v) ? '' : formatValue(v, true)] : []),
  ]);
  return { columns, cells };
}
