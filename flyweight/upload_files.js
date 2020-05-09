/*
  文件上传，支持同时选择多个（2000个）文件并上传
*/
let id = 0;
window.startUpload = function( uploadType, files ){ // uploadType 区分是控件还是 flash 
  for ( var i = 0, file; file = files[ i++ ]; ){
    const uploadObj = new Upload( uploadType, file.fileName, file.fileSize );
    uploadObj.init( id++ ); // 给 upload 对象设置一个唯一的 id 
  }
};
const Upload = function( uploadType, fileName, fileSize ){ 
  this.uploadType = uploadType;
  this.fileName = fileName;
  this.fileSize = fileSize;
  this.dom= null; 
};
Upload.prototype.init = function( id ){
  var that = this;
  this.id = id;
  this.dom = document.createElement( 'div' ); 
  this.dom.innerHTML = `<span>文件名称:${this.fileName}, 文件大小: ${this.fileSize}</span><button class="delFile">删除</button>`
  this.dom.querySelector( '.delFile' ).onclick = function(){
    that.delFile();
  }
  document.body.appendChild( this.dom ); 
};
Upload.prototype.delFile = function(){
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild( this.dom );
  }
  if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
    return this.dom.parentNode.removeChild( this.dom );
  } 
};
// 上传了多少个文件，则创建了多少个 Upload 对象
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
