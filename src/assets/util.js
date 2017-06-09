let _ = {};

/**
 * 节流
 * @param  {Function} func
 * @param  {Number}   wait
 * @param  {Object}   options
 * @return {Function}
 */
_.throttle = function(func, wait, options) {
    let timeout, context, args, result;
    let previous = 0;
    if (!options) {
        options = {};
    }

    let later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };

    let throttled = function() {
        let now = Date.now();
        if (!previous && options.leading === false) {
            previous = now;
        }
        let remaining = wait - (now - previous);
        context = this;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) {
                context = args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};

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
    return arr.some((item) => {
        return _.has(obj, item);
    });
};

/**
 * 判断正浮点数
 * @param  {number} num 传入的数字参数
 * @return {boolean}    是否符合条件
 */
_.hasNum = function(num) {
    return /^\d+(\.\d+)?$/ig.test(num);
};

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
    } 
    return value;
};

/**
 * 获取传入数字转化为整数时的倍数
 * @param  {number} bits 小数点位数
 * @return {number}      返回的倍数
 */
_.getMultiple = function(bits) {
    return Math.pow(10, bits);
};

/**
 * 限制小数位数
 * @param  {number} num  传入的待处理数字
 * @param  {number} bits 限制的小数点位数
 * @return {number}      处理后返回的数字
 */
_.limitDecimal = function(num, bits) {
    return Math.round(num * _.getMultiple(bits)) / _.getMultiple(bits);
};

/**
 * 获取节点的宽高
 * @param  {Object} elem  传入节点
 * @return {Object}       节点的宽高
 */
_.getOffset = function(elem) {
    return {
        width: elem.clientWidth,
        height: elem.clientHeight
    };
};

/**
 * 获取兼容过的 pageX
 * @param  {Object} e
 * @return {Number}
 */
_.getPageX = (e) => {
    return e.hasOwnProperty('pageX') ? e.pageX : e.touches[0].pageX;
};

/**
 * 获取兼容过的 pageY
 * @param  {Object} e
 * @return {Number}
 */
_.getPageY = (e) => {
    return e.hasOwnProperty('pageY') ? e.pageY : e.touches[0].pageY;
};

/**
 * 获取鼠标点击处相对于目标节点的横坐标值
 * @param  {Object} e           鼠标点击事件
 * @param  {Object} container   目标节点
 * @return {Number}             鼠标点击处距离目标节点起点的横坐标
 */
_.getDistanceX = (e, container) => {
    return _.getPageX(e) - (container.getBoundingClientRect().left + window.pageXOffset);
};

/**
 * 获取鼠标点击处相对于目标节点的纵坐标值
 * @param  {Object} e           鼠标点击事件
 * @param  {Object} container   目标节点
 * @return {Number}             鼠标点击处距离目标节点起点的纵坐标
 */
_.getDistanceY = (e, container) => {
    return _.getPageY(e) - (container.getBoundingClientRect().top + window.pageYOffset);
};

export default _;
