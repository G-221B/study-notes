const Status = {
    PENDING: 'pending',
    RESOLVE: 'resolved',
    REJECT: 'rejected'
}

class MyPromise {
    constructor(execute) {
        this.status = Status.PENDING;
        this.value = null;
        this.reason = null;
        this.onResloveQueues = [];
        this.onRejectQueues = [];

        const resolve = (value) => {
            if(this.status === Status.PENDING) {
                this.value = value;
                this.status = Status.RESOLVE;
                this.onResloveQueues.forEach(fn => fn(this.value));
            }
        }

        const reject = (reason) => {
            if(this.status === Status.PENDING) {
                this.reason = reason;
                this.status = Status.REJECT;
                this.onRejectQueues.forEach(fn => fn(this.reason));
            }
        }

        try {
            execute(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };
        
        const promise2 = new MyPromise((resolve, reject) => {
            if(this.status === Status.RESOLVE) {
                setTimeout(()=> {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if(this.status === Status.REJECT) {
                setTimeout(()=> {
                    try {
                        const x = onRejected(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if(this.status === Status.PENDING) {
                this.onResloveQueues.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    })
                })

                this.onRejectQueues.push(() => {
                    setTimeout(()=> {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    })
                })
            }
        })
        return promise2;
    }
}

function resolvePromise(promise, x, resolve, reject) {
    if(x === promise) {
        return reject('死循环');
    }
    let called = false;
    if(x && (typeof x === 'object' || typeof x === 'function' )) {
        try {
            const then = x.then;
            if(typeof then === 'function') {
                then.call(x, res => {
                    if(called) return;
                    called = true;
                    resolvePromise(promise, res, resolve, reject);
                }, err => {
                    if(called) return;
                    called = true;
                    reject(err);
                })
            } else {
                called = true;
                resolve(x);
            }
        } catch (error) {
            if(called) {
                return;
            }
            called = true;
            reject(error);
        }
    } else {
        resolve(x);
    }
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('888');
    }, 1000)
}).then(res => {
    console.log(res)
    return new MyPromise((resolve2, reject) => {
        setTimeout(() => {
            reject('hickeyReject')
        }, 500)
        setTimeout(() => {
            resolve2('999');
        }, 1000)
    })
}, err => {
    console.log('hickeyyyyyy', err)
}).then(res => {
    console.log('res', res)
}, err => {
    console.log('err', err)
})