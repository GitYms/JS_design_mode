const Upload = function(type) {
  this.uploadType = type;
};
// 不需要 Upload.prototype.init 函数，初始化工作在 uplaodManager.add 函数内部
Upload.prototype.delFile = function(id) {
  uploadManager.setExternalState(id, this);
  if (this.size < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  }
  if (window.confirm('are you sure delete this file?' + this.name)) {
    return this.dom.parentNode.removeChild(this.dom);
  }
}
const UploadFactory = (function() {
  const createdFlyWeightObjs = {};

  return {
    create: function(type) {
      if (createdFlyWeightObjs[type]) {
        return createdFlyWeightObjs[type];
      }
      return createdFlyWeightObjs[type] = new Upload(type);
    }
  }
})();
// 管理器
const uploadManager = (function() {
  const uploadDatabase = {};
  return {
    add: function(id, type, name, size) {
      const flyweightObj = UploadFactory.create(type);
      const dom = document.createElement('div');
      dom.innerHTML = `<span>文件名称:${this.fileName}, 文件大小: ${this.fileSize}</span><button class="delFile">删除</button>`;
      dom.querySelector('.delFile').onclick = function() {
        flyweightObj.delFile(id);
      };
      document.body.appendChild(dom);
      uploadDatabase[id] = {
        name,
        size,
        dom,
      };
      return flyweightObj;
    },
    setExternalState: function(id, flyweightObj) {
      const uploadData = uploadDatabase[id];
      for (let i in uploadData) {
        flyweightObj[i] = uploadData[i];
      }
    }
  };
})();
// 触发上传动作函数
const id = 0;
window.startUpload = function(type, files) {
  for(let i = 0,file; file = files[i++];) {
    const uploadObj = uploadManager.add(++id, type, file.name, file.size);
  }
};
// test   创建的对象为 2
startUpload('plugin', [
  {
    fileName: '1.txt',
    fileSize: 1000
  },
  {
    fileName: '2.html',
    fileSize: 3000
  },
  {
    fileName: '3.txt',
    fileSize: 4000
  },
])
startUpload('flash', [
  {
    fileName: '4.txt',
    fileSize: 1000
  },
  {
    fileName: '5.txt',
    fileSize: 4000
  },
  {
    fileName: '6.txt',
    fileSize: 5000
  },
])