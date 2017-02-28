var _ = {};

/**
 * 某对象是否存在某个属性
 * @param  {Object}  obj  传入对象
 * @param  {string}  name 属性名称
 * @return {boolean}      对象是否包含该属性
 */
_.has = function(obj, name) {
    return obj !== null && hasOwnProperty.call(obj, name);
};

/**
 * 某个值是否在所给范围内
 * @param  {number}  value 当前值
 * @param  {number}  min   最小值
 * @param  {number}  max   最大值
 * @return {number}       处理后的当前值
 */
_.limitScope = function(value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}

module.exports = _;
