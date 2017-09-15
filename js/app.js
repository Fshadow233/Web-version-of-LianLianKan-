/**
 * Created by fxy on 2016/5/25.
 */

var MARGIN_LEFT=200;
var MARGIN_TOP=0;
var SIZE=60;             //图片大小
var ROWCOUNT=12;         //map行列数
var COLCOUNT=10;

var timer,timer1,timer2,timer3,timer4,timer5;
var GameLoop;
var context;          //画布
var m_nX1=-1;           //记录所点击图片的行号，初始化为-1
var m_nY1=-1;          //记录所点击图片的列号，初始化为-1
var begin;             //开始游戏
var disorder;           //打乱重排
var primary;           //初级游戏
var middle;           //中级游戏
var advanced;         //高级游戏
var about;             //关于游戏
var aboutGame;        //关于游戏介绍
var win;               //游戏胜利
//var auto;              //自动消除
var progress=-0.2;       //进度条
var GameLevel=3;
var m_nRow=12;          //记录行
var m_nCol=10;          //记录列

var image=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];             //代表图片的数组
var Map=[               //-1代表不贴图 最大12*10
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];

window.onload=Init;      //窗体加载时自动调用Init函数


//初始化函数
function Init(){
    var canvas=document.getElementById("gameCanvas");
    context=canvas.getContext("2d");          //获得画布控制权

    begin=LoadImage("res/begin.png");
    disorder=LoadImage("res/disorder.png");
    primary=LoadImage("res/primary.png");
    middle=LoadImage("res/middle.png");
    advanced=LoadImage("res/advanced.png");
    about=LoadImage("res/about.png");
    aboutGame=LoadImage("res/aboutGame.png");
    win=LoadImage("res/win.png");
 //   auto=LoadImage("res/auto.png");
    for(var i=0;i<22;i++){
        image[i]=LoadImage("res/"+i+".jpg");   //将连连看的图片加载到内存中
    }
    InitMap();
    timer=setInterval(Paint,60);
}

function InitArray(){
    for(var i=0;i<ROWCOUNT;i++)             //将Map[i][j]的值全部初始化为-1
    for(var j=0;j<COLCOUNT;j++)
    {
        Map[i][j]=-1;
    }
}
//加载图片，从硬盘到内存
function LoadImage(src){
    var img=new Image();
    img.src=src;
    return img;
}

//初始化游戏
function InitMap(){
    var k=1;
     InitArray();
    for(var row=1+GameLevel;row<ROWCOUNT-GameLevel+1;row++)
        for(var col=1+GameLevel;col<COLCOUNT-GameLevel+1;col++)
        {
            Map[row-1][col-1]=k;
            if((col-GameLevel%2)%2==0)
                k++;
            if(k==(ROWCOUNT-2*GameLevel)*(COLCOUNT-2*GameLevel)/4)
            {  k=1;}
        }
    ReSetMap();
}
//重置数组，随机打乱并使其中的图片成对出现
function ReSetMap(){
    for(var row=GameLevel+0;row<ROWCOUNT-GameLevel;row++){
        for(var col=GameLevel+0;col<COLCOUNT-GameLevel;col++){
            while(true){
                m_nRow=parseInt(Math.random()*100)%(ROWCOUNT-2*GameLevel)+GameLevel;
                m_nCol=parseInt(Math.random()*100)%(COLCOUNT-2*GameLevel)+GameLevel;
                if(Map[m_nRow][m_nCol]!=Map[row][col]){
                    var k=Map[m_nRow][m_nCol];
                    Map[m_nRow][m_nCol]=Map[row][col];
                    Map[row][col]=k;
                    break;
                }
            }
        }
    }
}

//根据地图数据加载图片
function Paint(){

    context.drawImage(begin,1000,80);
    context.drawImage(primary,1000,160);
    context.drawImage(middle,1000,240);
    context.drawImage(advanced,1000,320);
    context.drawImage(disorder,1000,400);
  //  context.drawImage(auto,1000,440);
    context.drawImage(about,1000,480);
    //重绘之前清除canvas画布上的图片及边框
    context.clearRect(MARGIN_LEFT,MARGIN_TOP,ROWCOUNT*60,COLCOUNT*60);
    if(GameLevel!=0){
        context.strokeStyle = "#D1EEEE";   //设置线条颜色
        context.lineWidth=4;             //设置线条宽度
        context.strokeRect(MARGIN_LEFT+GameLevel*60-10,MARGIN_TOP+GameLevel*60-10,(ROWCOUNT-2*GameLevel)*60+20,(COLCOUNT-2*GameLevel)*60+20);
        if(progress<400) {
            context.strokeRect(365, 560, 400, 20);
            context.fillStyle = "#00ff7f";//设置线条颜色
            context.fillRect(365, 560, 400, 20);
            context.fillStyle = "#ff0000";//设置线条颜色
            context.fillRect(765 - progress, 560, progress, 20);
        }
        else{
            context.strokeRect(365, 560, 400, 20);
            context.fillStyle = "#ff0000";//设置线条颜色
            context.fillRect(365, 560, 400, 20);
        }
        progress=progress+0.1*GameLevel;
        for(var i=GameLevel;i<ROWCOUNT-GameLevel;i++)            //行
         {
             for(var j=GameLevel;j<COLCOUNT-GameLevel;j++)           //列
              {
                  if(Map[i][j]!=-1) {
                      context.drawImage(image[Map[i][j]], MARGIN_LEFT+ 60 * i, MARGIN_TOP+ 60 * j);  //在相应位置绘制图片
                       }
              }
         }
    }
}



//鼠标点击事件
//根据鼠标点击的位置判断选择的游戏等级大小
function Move(event){
    var x=event.x;
    var y=event.y;
    if(event.x>1000&&event.x<1000+170&&event.y>80&&event.y<80+48){
        //更新Map的行列之前先清除之前画布的内容
        context.clearRect(MARGIN_LEFT,MARGIN_TOP,ROWCOUNT*60,COLCOUNT*60);
        //游戏开始，默认为初级游戏
        GameLevel=3;
        progress=0;
        clearInterval(GameLoop);
        clearInterval(timer5);
        InitMap();              //重新初始化Map数据，并打乱
        timer1=setInterval(Paint,60);

    }
    if(event.x>1000&&event.x<1000+170&&event.y>160&&event.y<160+48){
        context.clearRect(MARGIN_LEFT,MARGIN_TOP,ROWCOUNT*60,COLCOUNT*60);
        //初级游戏
        GameLevel=3;
        progress=0;
        clearInterval(GameLoop);
        clearInterval(timer5);
        InitMap();                        //重新初始化Map数据，并打乱
        timer2=setInterval(Paint,60);

    }
    if(event.x>1000&&event.x<1000+170&&event.y>240&&event.y<240+48){
        context.clearRect(MARGIN_LEFT,MARGIN_TOP,ROWCOUNT*60,COLCOUNT*60);
        //中级游戏
        GameLevel=2;
        progress=0;
        clearInterval(GameLoop);
        clearInterval(timer5);
        InitMap();                    //重新初始化Map数据，并打乱
        timer3=setInterval(Paint,60);

    }
    if(event.x>1000&&event.x<1000+170&&event.y>320&&event.y<320+48){
        context.clearRect(MARGIN_LEFT,MARGIN_TOP,ROWCOUNT*60,COLCOUNT*60);
        //高级游戏
        GameLevel=1;
        progress=0;
        clearInterval(GameLoop);
        clearInterval(timer5);
        InitMap();                      //重新初始化Map数据，并打乱
        timer4=setInterval(Paint,60);
    }
    if(event.x>1000&&event.x<1000+170&&event.y>400&&event.y<400+48){
        //打乱重排
        ReSetMap();
        clearInterval(GameLoop);
        timer=setInterval(Paint,60);
    }
    if( event.x>MARGIN_LEFT+GameLevel*SIZE&&event.x< MARGIN_LEFT+ROWCOUNT*SIZE-GameLevel*SIZE
        &&event.y> MARGIN_TOP+GameLevel*SIZE&&event.y< MARGIN_TOP+COLCOUNT*SIZE-GameLevel*SIZE){
        //图片消除区域
        clearInterval(timer);
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
        clearInterval(timer5);
        Disappear(event.x,event.y);
    }
    if(event.x>1000&&event.x<1000+170&&event.y>480&&event.y<480+48){
        //关于游戏
        clearInterval(timer);
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
        clearInterval(timer5);
        clearInterval(Paint());
        GameLoop=setInterval(about_game,60);
    }
}
/*
var hintX1=-1,hintY1=-1,hintX2=-1,hintY2=-1;
function tips(){
    for(var i=GameLevel;i<ROWCOUNT-2*GameLevel;i++){
        for(var j=GameLevel;j<COLCOUNT-2*GameLevel;j++)
        {
            if(Map[i][j]!=-1){
                if(hintX1==-1&&hintY1==-1) {
                    //记录第一个不为空的方块
                    hintX1 = i;
                    hintY1 = j;
                }else if(hintX2==-1&&hintY2==-1){
                    //否则记录第二个不为空的方块
                    hintX2=i;
                    hintY2=j;
                    if(Map[hintX1][hintY1]==Map[hintX2][hintY2]){
                        alert("lala");
                        context.strokeStyle = "#ff0000";//设置线条颜色
                        context.lineWidth=2;          //设置线条宽度
                        context.strokeRect(MARGIN_LEFT+hintX1*SIZE,MARGIN_TOP+hintY1*SIZE,SIZE,SIZE);
                        context.strokeRect(MARGIN_LEFT+hintX2*SIZE,MARGIN_TOP+hintY2*SIZE,SIZE,SIZE);
                        Map[hintX1][hintY1]==-1;
                        Map[hintX2][hintY2]==-2;
                        break;
                    }
                    else{
                        alert("lala");
                        hintX2=-1;
                        hintY2=-1;
                    }
                }
            }
        }
    }
    timer6=setInterval(Paint,60);
}
*/

function about_game(){
    context.drawImage(aboutGame,250,30);
}

//一旦图片被消除，重绘图片
function Disappear(x,y){
    var Row=getRowNum(x);
    var Col=getColNum(y);

    //假设尚未记录第一块图片的位置
    if(m_nX1==-1&&m_nY1==-1&&Map[Row][Col]!=-1){
        m_nX1=Row;                //那么记录第一块图片的位置
        m_nY1=Col;
        context.strokeStyle = "#ff0000";//设置线条颜色
        context.lineWidth=2;          //设置线条宽度
       context.strokeRect(MARGIN_LEFT+m_nX1*SIZE,MARGIN_TOP+m_nY1*SIZE,SIZE,SIZE);
    }
    else {
        //如果记录的图片坐标和当前点击图片坐标不同，且两张图片相同
         if (!(m_nX1 == Row && m_nY1 == Col)&& Map[m_nX1][m_nY1]== Map[Row][Col]) {
           if (IsLink(m_nX1, m_nY1, Row, Col)) {
                context.strokeStyle = "#ff0000";//设置线条颜色
                context.lineWidth = 2;          //设置线条宽度
                context.strokeRect(MARGIN_LEFT+Row*SIZE,MARGIN_TOP+Col*SIZE,SIZE,SIZE);
                //数据清理
                Map[m_nX1][m_nY1] = -1;
                Map[Row][Col] = -1;
            }
        }
        //清空记录方块的值
        m_nX1 = -1;
        m_nY1 = -1;
        //通知重绘
        timer5=setInterval(Paint,60);
    }
    if(Win()){                            //判断游戏是否胜利
        GameLevel--;

       if(GameLevel==2){
           alert("new game will start!");
            InitMap();                      //重新初始化Map数据，并打乱
           progress=0;
            timer3=setInterval(Paint,1000/60);
        }
        else if(GameLevel==1){
           alert("new game will start!");
            InitMap();                      //重新初始化Map数据，并打乱
           progress=0;
            timer4=setInterval(Paint,1000/60);
        }
        else if(GameLevel==0){
            clearInterval(timer);
            clearInterval(timer1);
            clearInterval(timer2);
            clearInterval(timer3);
            clearInterval(timer4);
            clearInterval(timer5);
            clearInterval(Paint());
            timer5=setInterval(context.drawImage(win,200,150),20);
        }
    }
}


//返回点击的图片的行数
function getRowNum(x){
    return  parseInt((x-MARGIN_LEFT)/SIZE);
}

//返回点击图片的列数
function getColNum(y){
    return  parseInt((y-MARGIN_TOP)/SIZE);
}

//判断游戏是否胜利
function Win(){
    for(var i=0;i<ROWCOUNT;i++){
        for(var j=0;j<COLCOUNT;j++){
            if(Map[i][j]!=-1)
            return false;
        }
    }
    return true;
}
