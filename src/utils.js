export function capitalizeStr(str) {
  return str.replace(/^\w/, c => c.toUpperCase())
}