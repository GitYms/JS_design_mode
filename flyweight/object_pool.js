// 地图上的小气泡
const toolTipFactory = (function() {
  const toolTipPool = [];    // toolTip 对象池
  return {
    create: function() {
      // 对象池为空时新建一个dom, 否则从池中取
      if (toolTipPool.length == 0) {
        const div = document.createElement('div');
        document.body.appendChild(div);
        return div;
      } else {
        return toolTipPool.shift();
      }
    },
    // 回收节点
    recover: function(dom) {
      return toolTipPool.push(dom);
    }
  };
})();
const pool = [];
// 先创建 a, b 两个小气泡
for(let i = 0, str; str = ['a', 'b'][i]; i++) {
  const toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
  pool.push(toolTip);
}
// 重新绘制, 回收节点
for (let i = 0, toolTip; toolTip = pool[i++];) {
  toolTipFactory.recover(toolTip);
}
// 新建6个气泡
for (let i = 0, str; str = ['a', 'b', 'c', 'd', 'e', 'f'][i++];) {
  const toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
}