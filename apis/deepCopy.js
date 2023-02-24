// 使用JSON.stringify的方式来实现深拷贝的弊端：
// 1.无法拷贝NaN、Infinity、undefined这类的值。NaN和Infinity会变成null，而undefined会直接丢失。
// 2.无法处理循环两个对象之间循环引用的问题。

// 自己实现deepClone需要注意对象间循环引用的问题。处理方案：使用WeakMap数据结构来记录对象处理。


const a = {
    NaN: NaN,
    hickey: undefined,
    max: Infinity
}


function deepClone(target, mapObj = new WeakMap()) {
    let res;
    const typeStr = Object.prototype.toString.call(target);
    if(typeStr === '[object Object]') {
        res = {};
    } else if (typeStr === '[object Array]') {
        res = [];
    } else {
        return target;
    }
    Object.keys(target).forEach(key => {
        if(target.hasOwnProperty(key)) {
            if(typeof target[key] === 'object') {
                if (mapObj.get(target[key])) {
                    res[key] = target[key]
                } else {
                    mapObj.set(target[key], target[key]);
                    res[key] = deepClone(target[key], mapObj);
                }
            } else {
                res[key] = target[key];
            }
        }
    })
    return res;
}

const cloneA = deepClone(a);
console.log(cloneA, a, cloneA === a);
