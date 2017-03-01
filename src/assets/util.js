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
 * 某对象里面至少存在列表中一个属性
 * @param  {Object}  obj 传入对象
 * @param  {Array}   arr 属性名列表
 * @return {boolean}     是否部分存在
 */
_.hasSome = function(obj, arr) {
    return arr.some(function(item) {
        return _.has(obj, item);
    })
}

/**
 * 判断正浮点数
 * @param  {number} num 传入的数字参数
 * @return {boolean}    是否符合条件
 */
_.hasNum = function(num) {
    return /^\d+(\.\d+)?$/ig.test(num);
}

/**
 * 某个值是否在所给范围内
 * @param  {number}  value 当前值
 * @param  {number}  min   最小值
 * @param  {number}  max   最大值
 * @return {number}        处理后的当前值
 */
_.limitScope = function(value, min, max) {
    if (!value && value !== 0) {
        return max;
    }
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}

/**
 * 获取传入数字转化为整数时的倍数
 * @param  {number} bits 小数点位数
 * @return {number}      返回的倍数
 */
_.getMultiple = function(bits) {
    return Math.pow(10, bits);
}

/**
 * 限制小数位数
 * @param  {number} num  传入的待处理数字
 * @param  {number} bits 限制的小数点位数
 * @return {number}      处理后返回的数字
 */
_.limitDecimal = function(num, bits) {
    return Math.round(num * _.getMultiple(bits)) / _.getMultiple(bits);
}

module.exports = _;
