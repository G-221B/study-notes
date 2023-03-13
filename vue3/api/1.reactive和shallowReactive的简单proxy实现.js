
/** 深度监听：终究需要递归来处理
 *  浅层监听：直接调用proxy即可实现浅层监听
 * 
 */

function createReactive(target, isShallow) {
    return new Proxy(target, {
        get(target, key, receiver) {
            console.log(`get key: ${key}, isShallow: ${isShallow}`);
            const res = Reflect.get(target, key, receiver);
            if(isShallow) {
                return res;
            }

            // 这算是性能优化的点，当你访问的时候才进行递归代理。不像vue2，直接一开始就一步到位，深层递归
            return isObject(res) ? reactive(res) : res;
        },
        set(target, key, newVal, receiver) {
            return Reflect.set(target, key, newVal, receiver);
        }
    })
}


function isObject(target) {
    return target !== null && typeof target === 'object';
}

function reactive(target) {
    return createReactive(target, false);
}

function shallowReactive(target) {
    return createReactive(target, true)
}

const person = reactive({
    id: 1,
    msg: {
        name: 'hickey',
        age: 18,
        hobby: {
            sing: true,
            dance: false
        }
    }
})
const shallow_person = shallowReactive({
    id: 1,
    msg: {
        name: 'hickey',
        age: 18,
        hobby: {
            sing: true,
            dance: false
        }
    }
})

console.log(person.msg.hobby.sing);

console.log('---------------');

console.log(shallow_person.msg.hobby.sing);

/*  上述例子打印顺序:
        get key: msg, isShallow: false
        get key: hobby, isShallow: false
        get key: sing, isShallow: false 
        true
        ---------------
        get key: msg, isShallow: true   
        true
*/