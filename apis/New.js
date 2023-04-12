/**  New关键字实现的重点：
 *      1. 返回一个this对象(所有下面需要新增个_this对象)
 *      2. _this对象有个__proto__对象指向构造函数的prototype对象。
 *      3. 如果构造函数执行完return一个对象，那么new完之后就返回该对象，否则就返回_this.
 */

function myNew(fn, ...args) {
    const _this = {};
    _this.__proto__ = fn.prototype;
    const res = fn.apply(_this, args);
    return res instanceof Object ? res : _this;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sex = 'man';

const person = myNew(Person, 'hickey', 18);
console.log(person);
console.log(person.sex);