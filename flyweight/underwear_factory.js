/*
  场景：内衣工厂生产了男士女士内衣各50件，需要一些塑料模特穿上内衣来拍成广告片。
*/

// 不使用享元模式
const Model = function(sex, underwear) {
  this.sex = sex;
  this.underwear = underwear;
};
Model.prototype.takePhoto = function() {
  console.log(`sex:${this.sex},underwear: ${this.underwear}.`);
}
// 建立了50个Model。总共会创建100个对象
for(let i = 0; i <= 50; i++) {
  const femaleModel = new Model('female', 'undewear' + i);
  femaleModel.takePhoto();
}

// 使用享元模式
const  Model_flyweight = function(sex) {
  this.sex = sex;
};
Model_flyweight.prototype.takePhoto = function() {
  console.log(`sex:${this.sex},underwear: ${this.underwear}.`);
}
// 分别创建男女模特，总共只创建了2个对象
const maleModel = new Model_flyweight('male');
const femaleModel = new Model_flyweight('female');
for(let i = 1; i <= 50; i++) {
  maleModel.underwear = 'undewear' + i;
  maleModel.takePhoto();
}
for(let i = 1; i <= 50; i++) {
  femaleModel.underwear = 'undewear' + i;
  femaleModel.takePhoto();
}
