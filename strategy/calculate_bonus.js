// 奖金与 基础工资（salary)、年底绩效等级（level: S-4倍工资, A-3, B-2) 有关
function calculate_bonus_first (level, salary) {
  if (level === 'S') {
    return salary * 4;
  }
  if (level === 'A') {
    return salary * 3;
  }
  if (level === 'B') {
    return salary * 2;
  }
  // 缺点：算法复用性差，灵活性差（新增绩效等级，需修改该函数）
}

// 策略模式优化
const performanceS = function(){};
performanceS.prototype.calculate = function(salary) {
  return salary * 4;
}
const performanceA = function(){};
performanceA.prototype.calculate = function(salary) {
  return salary * 3;
}
const performanceB = function(){};
performanceB.prototype.calculate = function(salary) {
  return salary * 2;
}
const Bonus = function() {
  this.salary = null;
  this.strategy = null;
}
Bonus.prototype.setSalary = function(salary) {
  this.salary = salary;
}
Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy;
}
Bonus.prototype.getBonus = function() {
  return this.strategy.calculate(this.salary);
}
