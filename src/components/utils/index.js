
export function isObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}
export function isArray (val) {
  return Object.prototype.toString.call(val) === '[object Array]'
}
export function isString (val) {
  return Object.prototype.toString.call(val) === '[object String]'
}
export function isNumber (val) {
  return Object.prototype.toString.call(val) === '[object Number]'
}
/**
 * each - 数组遍历方法
 *
 * @param  {type} ary      要遍历的数组
 * @param  {type} callback 遍历的回调函数
 * @return {type}          description
 */
export function each (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    if (callback(ary[ i ], i) === false) {
      break
    }
  }
}
/**
 * uniqueArray - 数组去重
 *
 * @param  {type} arr 原数组
 * @return {type}     去重后的数组
 */
export function uniqueArray (arr) {
  return [...new Set(arr)]
}
