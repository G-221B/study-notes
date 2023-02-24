
/** 生成器api使用需要注意以下知识点：
 * 1. 生成器函数需要进行调用，返回迭代器，才可以调用next方法进行迭代。
 * 2. 返回的迭代器有三种方法：next、throw、return。
 * 3. 调用next返回的数据接口：{value, done}
 * 4. yield 后面跟着的是调用next方法返回的value值。
 * 5. 调用next方法，可以传入参数，被yield等号左侧的变量接受。
 * 6. 生成器函数里return的值，也是通过调用next方法后，在返回值对象的value属性中获取。
 */



function * generatorFunc() {
    const res = yield getData(1);
    console.log('res1', res);
    const res2 = yield getData(2);
    console.log('res1', res2);
    const res3 = yield getData(3);
    console.log('res1', res3);
    const res4 = yield getData(4);
    console.log('res1', res4);
    return 'hickey';
}

function getData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(data === 2) {
                return reject('hickeyERROR')
            }
            resolve(data);
        }, 1000)
    })
}

function asyncToGeneratorFunc(generatorFunc) {
    return function () {
        const gen = generatorFunc.apply(this, arguments); // 知识点一
        return new Promise((resolve, reject) => {
            function step(key, args) {
                let genResult;
                try {
                    genResult = gen[key](args); // 知识点二的next和throw方法、知识点五
                } catch (error) {
                    return reject(error); // 知识点二的throw方法
                } 
                const { value, done } = genResult; // 知识点三
                if(done) {
                    return resolve(value);
                } else {
                    return Promise.resolve(value).then(res => {
                        step('next', res); // 知识点二
                    }, err => {
                        step('throw', err); // 知识点二
                    })
                }
            }
            step('next');
        })
    }
}

asyncToGeneratorFunc(generatorFunc)().then(res => {
    console.log(res);
})