/** 观察者模式核心：
 *      1.观察者：自身具有一个update方法，供观察目标通知更新。
 *      2.观察目标：自身维护一个观察者list，可以增删；还具备通知功能，通知观察者自身发生了变化。
 * 
 *  观察者模式的需要明确：何时进行监听？何时进行通知？
 * 
 */


let observer_id = 1; // 观察者id
let subject_id = 1; // 被观察者id

// 观察者
class Observer {
    constructor(cb) {
        this.id = observer_id++;
        this.callback = cb;
    }
    update(subject_id) {
        this.callback(subject_id, this.id);
    }
}

// 观察目标
class Subject {
    constructor() {
        this.id = subject_id++;
        this.observerList = []
    }
    addObserver(observer) {
        this.observerList.push(observer);
    }
    removeObserver(observer) {
        const index = this.observerList.findIndex(item => item === observer);
        if(index > -1) {
            this.observerList.splice(index, 1);
        }
    }
    notify() {
        this.observerList.forEach(item => {
            item.update(this.id);
        })
    }
}

// 手动模拟
const observer_1 = new Observer((sub_id, obs_id) => {
    console.log(`观察者${obs_id}监听到目标${sub_id}发生了改变！`);
});
const observer_2 = new Observer((sub_id, obs_id) => {
    console.log(`观察者${obs_id}监听到目标${sub_id}发生了改变！`);
});
const observer_3 = new Observer((sub_id, obs_id) => {
    console.log(`观察者${obs_id}监听到目标${sub_id}发生了改变！`);
});

const subject = new Subject();
subject.addObserver(observer_1);
subject.addObserver(observer_2);
subject.addObserver(observer_3);

subject.notify();