//-------------------------------
// Kubik v.1.0.0
// Библиотека предназначенная для генерации событий.
//-------------------------------
// Kubic.stop() - остановка эвента.
// Kubic.run(ms) - старт эвента (ms - м.сек, не обязательный параметр) //!!! пока это итерации а не время. 
// Kubic.getInfo - возврат копии обьекта.
// Kubic.setTime(min, max) - установка временных интервалов (max, min - м.сек).
// Kubic.setCycleRoulette(num) - установка колличества циклов рулетки.
// Kubic.setCallback(fn) - установка callback функции.
// Kubic.setRange(num) - установить придел значения отпровляймого в callback функцию.
// Kubic.setSettings(callback, range, minTime, maxTime, cycle) - общая настройка
// Kubic.
//-------------------------------

class Kubik {
    constructor(callback, minTime = 1000, maxTime = minTime, range = 100) {
      this.timer = 0;
      this.range = range;
      this.minTime = minTime;
      this.maxTime = maxTime;
      this.cycle = 3;
      this.callback = callback;
    }
    
    get getInfo() {
        return {
            timer: this.timer,
            range: this.range,
            minTime: this.minTime, 
            maxTime: this.maxTime,
            cycle: this.cycle 
        }
    }

    setTime(min = 1000, max = 7000) {
        this.minTime = min;
        this.maxTime = max; 
        return this;
    }

    setCycleRoulette(num = 3) {
        this.cycle = num;
        return this;
    }

    setCallback(fn = this.callback) {
        this.callback = fn;
        return this;
    }

    setRange(num = 100) {
        this.range = num;
        return this;
    }

    setSettings(callback = this.callback, range = 100, minTime = 1000, maxTime = 7000, cycle = 3) {
        this.callback = fn;
        this.range = num;
        this.minTime = min;
        this.maxTime = max;
        this.cycle = num;
        return this; 
    }
    
    run(ms = -1) {
        this.timer = ms;
        this.cube(this);
        return true;
    }

    stop() {
        this.timer = 0
        return true;
    }
  
    cube(obj) {
  
      const dice = (min, max)=> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
      }
    
      setTimeout(function rec(){
        if(obj.timer === 0) return clearTimeout(rec);
        if(obj.timer > 0) obj.timer -= 1;
        obj.callback(obj.roulette(obj.range, obj.cycle));
        setTimeout(rec, dice(obj.minTime, obj.maxTime));  
      }, dice(obj.minTime, obj.maxTime));
    }
    
    roulette(range, cycle, acc = 0) {
      if(cycle === 0) return acc;
      const min = Math.ceil(acc);
      const max = Math.floor(range);
      const newAcc = Math.floor(Math.random() * (max - min + 1)) + min;
      return this.roulette(range, cycle - 1, newAcc);
    } 
  }
  

//----проверки
/*
  const fn = (el)=> console.log(el, t);
  
  const t = new Kubic(fn);
  
  t.run()
  console.log(t)

*/
  