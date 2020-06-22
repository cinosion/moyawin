var container = document.getElementById('canvass');
// var container4 = document.getElementById('canvass4');
var canvas = document.getElementById('moyawin2');
// var canvas4 = document.getElementById('moyawin4');
// var obj = document.createElement('canvas');
if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // var ctx4 = canvas4.getContext('2d');
}
var radioStyle = 'red'

//イメージオブジェクトを生成
var img = new Image();
img.src = 'moyawin2.jpg';
/*
img.addEventListener("load", ()=>{
  ctx.drawImage(img, 0,0, 276,683); //683
}, false);
*/
//画像読み込み後に、setTramsformメソッドで適切な比率に縮小
//その上で、drawImageメソッドでCanvas上に描画する
// img.onload = function(){
var render = function(word='憲法改正', radio=radioStyle, save='whole'){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //親要素のサイズをCanvasに指定
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  var scale = canvas.width / img.width;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.drawImage(img, 0,0);
/*
  ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
  canvas4.width = container4.clientWidth;
  canvas4.height = container4.clientHeigt;
  var scale4 = canvas4.width / img.width;
  ctx4.setTransform(scale, 0, 0, scale, 0, 0);
  ctx4.drawImage(img, 88,1500, 800,450, 0,0, 1120,630);
*/
  canvasTextDraw(word, radio)
  // changeImage();
}

var canvasTextDraw = function(word, radio){
  ctx.font = "38px sanserif";
  // ctx.fillText(word, 200, 1800);
  var wordList = word.split('\n');
  var lineHeight = ctx.measureText("あ").width;
  if(radio=='red'){
    ctx.fillStyle = 'rgba(200, 0, 0, 0.9)';
    ctx.fillRect(178,1666,5,150);
    ctx.fillRect(188,1666,5,150);
    ctx.fillStyle = 'black';
    wordList.forEach(function(elm, i){
      Array.prototype.forEach.call(elm, function(ch, j){
        ctx.fillText(ch, 212-lineHeight*i, 1640+lineHeight*j);
      });
    });
  }else{
    ctx.fillStyle = 'white';
    ctx.fillRect(165,1666,40,150);
    ctx.fillStyle = 'black';
    wordList.forEach(function(elm, i){
      Array.prototype.forEach.call(elm, function(ch, j){
        ctx.fillText(ch, 167-lineHeight*i, 1698+lineHeight*j);
      });
    });
  }
}

var moyawin_drawString = function(){
  var word = document.form1.textarea1.value;
  // word = word.split('').join('\n')
  render(word,radioStyle);
}

var radioUpdater = function(){
  var value = document.radioGroup.q1.value;
  radioStyle = value;
  moyawin_drawString();
}

/*
var changeImage = function(){
  var png = canvas.toDataURL();
  document.getElementById("newImg").src = png;

  var downloadLink = document.getElementById('download_link');
  var filename = 'moyawin.png';

  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.download = filename;
  downloadLink.click();

}
*/
var moyawin_save_full = function(){
  var downloadLink = document.getElementById('download_link');
  var filename = 'moyawin.png';

  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.download = filename;
  downloadLink.click();
}
/*
var moyawin_save_four = function(){
  var downloadLink = document.getElementById('download_link');
  var filename = 'moyawin4.png';

  ctx.drawImage(img, 64,1500, 800,450, 0,0, 960,540);
  var word = document.form1.textarea1.value;
  canvasTextDraw(word,radioStyle)

  downloadLink.href = canvas.toDataURL('image/png');
  downloadLink.download = filename;
  downloadLink.click();
}
*/
var main = function(){
  img.addEventListener('load', render, false);
  window.addEventListener('resize', render, false);
  var radios = document.getElementsByName('q1')
  radios.forEach(function(e){
    e.addEventListener("click", radioUpdater);
  });
};

main();
