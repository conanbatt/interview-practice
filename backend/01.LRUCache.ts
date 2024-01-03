/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = new Map()
  this.capacity = capacity
};

/**
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1
  const val = this.cache.get(key)
  this.cache.delete(key)
  this.cache.set(key, val)
  return val;
};

/**
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key)
  } else if (this.cache.size >= this.capacity) {
    const fKey = this.cache.keys().next().value
    this.cache.delete(fKey)
  }
  this.cache.set(key, value)
};
