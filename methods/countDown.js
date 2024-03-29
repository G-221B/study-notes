  /**
   * 知识点：精准的秒杀倒计时
   * 原理：利用setTimeout来实现倒计时，每次延迟执行的时间为：间隔时间 减去 代码运行的时间，即：当前时间 - 倒计时开始时间 + 倒计时次数 * 时间间隔
   * 疑问：为什么不适应setInterval实现？ 答：不精致，setInterval期间可能执行其它代码影响下次准确运行。
  */ 
  function createCountDown(totalTime, interval, callback) {
    const startTime = new Date().getTime(); // 记录开始时间
    let count = 0; // 记录执行次数

    let countDownT = setTimeout(task, interval);
    function task() {
      const currentTime = new Date().getTime();
      count++;
      const offset = currentTime - (startTime + count * interval); // 计算其它代码影响的误差时间
      let nextTime = interval - offset; // 下一次timeout执行的时间

      totalTime -= interval;

      if(nextTime < 0) { // 当偏差大于时间间隔，就setTimeout直接运行
        nextTime = 0;
      }

      callback(offset, nextTime, totalTime); // 执行回调
      if(totalTime <=  0) {
        clearTimeout(countDownT); // 倒计时完成后清除setTimeout
      } else {
        countDownT = setTimeout(task, nextTime);
      }
      
    }
    
  }
  createCountDown(10000, 1000, function(offset, nextInterval, totalTime) {
    console.log('偏差时间为：'+ offset + 'ms，下一次执行为' + nextInterval +'ms后，还剩下' + totalTime + 'ms');
  })