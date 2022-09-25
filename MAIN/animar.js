
//const anima = document.querySelector("#animar");

var canvasWidth = 650; 
 var canvasHeight = 350;
 
 var spriteWidth = 11000; 
 var spriteHeight = 281; 
 
 var rows = 1; 
 var cols = 22; 
 
 var trackRight = 0; 
 //var trackLeft = 1; 
 
 var width = spriteWidth/cols; 
 var height = spriteHeight/rows; 
 
 var x=0;
 var y=0; 
 
 var srcX; 
 var srcY; 

 var curFrame = 0; 
 var frameCount = 7; 

 var canvas = document.getElementById('canvas');
 canvas.width = canvasWidth;
 canvas.height = canvasHeight; 
 var ctx = canvas.getContext("2d");
 
 var character = new Image(); 
 character.src = "./mono.png";
 
 function updateFrame(){ 
        curFrame = ++curFrame % frameCount; 
        srcX = curFrame * width; 
        ctx.clearRect(x,y,width,height); 
        srcY = trackRight * height;  
 }
 
const draw=(S=false)=>{
  if (S) {
    updateFrame();
    ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);

  }else{
    ctx.drawImage(character,0,0,500,281,0,0,500,281);
  }
}


var hola=true;
var animacion;

var animar = ()=>{
  return alanBtn({
    key: "acc4fe12f1a71eca43ab120aded817682e956eca572e1d8b807a3e2338fdd0dc/stage",
    onCommand: function (commandData) {
      console.info('fd',commandData.command);
      if (commandData.command === "navigation") {
        //call client code that will react on the received command
      }
    },
    onButtonState: function (e) {
  
      switch (e) {
        case 'REPLY':
          console.log('start');
          clearInterval(animacion);
          animacion=setInterval(draw,90,true);
          break;
          case 'ONLINE':
            clearInterval(animacion);
          break;
          case 'LISTEN':
              clearInterval(animacion);
          break;
          case 'OFFLINE':
              clearInterval(animacion);
             
          break;
          case 'CONNECTING':
            animacion=setInterval(draw,90,false);
        break;
        default:
          break;
      }
      console.info('onButtonState', e);
    },
    onEvent: function (e) {
     console.info('vv',e);
    },
    
    rootEl: document.getElementById("alan-btn"),
  });
}


var alanBtnInstance;

//console.info('mundosS',  alanBtnInstance);
/*anima.addEventListener('click',()=>{ 

  if(hola){
    console.log('start');
    clearInterval(animacion);
    animacion=setInterval(draw,90,true);
    hola=!hola;
  }else{
   
      console.log('fin');
      console.log("frame de translado" +curFrame);
      clearInterval(animacion);
      hola=!hola;
    
        
  }


});*/