/**
 * Created by fxy on 2016/5/30.
 */



//判断是否x连通
function x1_Link_x2(x, y1,y2) {
    if (y1 < y2) {                               //当y1<y2时，判断y1与y2之间有没有图片
        for (var i = y1 + 1; i < y2 + 1; i++) {
            if (i == y2) {
                return true;
            }
            else {
                if (Map[x][i] != -1) {
                    break;
                }
            }
        }
    }
    else {                                    //当y1>y2,判断y1与y2之间有没有图片
        for (var i = y1 - 1;i > GameLevel-1;i--)
        {
            if (i == y2 ) {
                return true;
            }
            else {
                if (Map[x][i] != -1) {
                    break;
                }
            }
        }
    }
    return false;
}

//判断是否y连通
function y1_Link_y2(y, x1,x2) {
    if (x1 < x2) {                               //当x1<x2时，判断x1与x2之间有没有图片
        for (var i = x1 + 1; i < x2 + 1; i++) {
            if (i == x2) {
                return true;
            }
            else {
                if (Map[i][y] != -1) {
                    break;
                }
            }
        }
    }
    else {                                    //当x1>x2,判断x1与x2之间有没有图片
        for (var i = x1 - 1;i > GameLevel - 1;i--)
        {
            if (i == x2) {
                return true;
            }
            else {
                if (Map[i][y] != -1) {
                    break;
                }
            }
        }
    }
    return false;
}

//判断是否是一个拐点连接
function OneCornerLink(x1,y1,x2,y2){
    if(x1>x2){                  //如果x1>x2,交换两张图片的坐标
        var n1=x1;
        x1=x2;
        x2=n1;

        var n2=y1;
        y1=y2;
        y2=n2;
    }
    if(y1<y2){
        if(x1_Link_x2(x1,y1,y2)&&y1_Link_y2(y2,x1,x2)&&Map[x1][y2]==-1){
            DrawLine(x1,y1,x1,y2);
            DrawLine(x1,y2,x2,y2);
            return true;
        }
        else if(y1_Link_y2(y1,x1,x2)&&x1_Link_x2(x2,y1,y2)&&Map[x2][y1]==-1) {
            DrawLine(x1, y1, x2, y1);
            DrawLine(x2, y1, x2, y2);
            return true;
        }
    }
    else
    {
        if((x1_Link_x2(x1,y1,y2)&&y1_Link_y2(y2,x1,x2))&&Map[x1][y2]==-1){
            DrawLine(x1,y1,x1,y2);
            DrawLine(x1,y2,x2,y2);
            return true;
        }
        else if((y1_Link_y2(y1,x1,x2)&&x1_Link_x2(x2,y1,y2))&&Map[x2][y1]==-1) {
            DrawLine(x1, y1, x2, y1);
            DrawLine(x2, y1, x2, y2);
            return true;
        }
    }
    return false;
}

//判断是否是两个拐点连接
function TwoCornerLink(x1,y1,x2,y2){
    if(x1>x2){                  //如果x1>x2,交换两张图片的坐标
        var n1=x1;
        x1=x2;
        x2=n1;

        var n2=y1;
        y1=y2;
        y2=n2;
    }
    for(var j=y1+1;j<COLCOUNT-GameLevel+1;j++)                       //下通
    {
        if(Map[x1][j]==-1)
        {
            for(var i=x1;i<x2+1;i++) {
                if (OneCornerLink(i, j, x2, y2) && Map[i][j] == -1) {
                    DrawLine(x1, y1, x1, j);
                    DrawLine(x1, j, x2, j);
                    DrawLine(x2, j, x2, y2);
                    return true;
                }
                else {
                    break;
                }
            }
        }
        else
        {break;}
    }
    for(var j=y1-1;j>GameLevel-2;j--)                                //上通
    {
        if(Map[x1][j]==-1)
        {
            for(var i=x1;i<x2+1;i++) {
                if (OneCornerLink(i, j, x2, y2) && Map[i][j] == -1) {
                    DrawLine(x1, y1, x1, j);
                    DrawLine(x1, j, x2, j);
                    DrawLine(x2, j, x2, y2);
                    return true;
                }
                else {
                    break;
                }
            }
        }
        else
        {break;}
    }
    for(var i=x1-1;i>GameLevel-2;i--)                    //左通
    {
        if(Map[i][y1]==-1)
            if(y1<y2)
            {
                for(var j=y1;j<y2+1;j++) {
                    if (OneCornerLink(i, j, x2, y2) && Map[i][j] == -1) {
                        DrawLine(x1, y1, i, y1);
                        DrawLine(i, y1, i, y2);
                        DrawLine(i, y2, x2, y2);
                        return true;
                    }
                    else {break;}
                }
            }
            else
            {
                for(var j=y1;j>y2+1;j--) {
                    if (OneCornerLink(i, j, x2, y2) && Map[i][j] == -1) {
                        DrawLine(x1, y1, i, y1);
                        DrawLine(i, y1, i, y2);
                        DrawLine(i, y2, x2, y2);
                        return true;
                    }
                    else {break;}
                }
            }
        else
        {break;}
    }
    for(var i=x1+1;i<ROWCOUNT-GameLevel+1;i++)              //右通
    {
        if(Map[i][y1]==-1)
            if(y1<y2)
            {
                for(var j=y1;j<y2+1;j++) {
                    if (OneCornerLink(i, j, x2, y2) && Map[i][j] == -1) {

                        DrawLine(x1, y1, i, y1);
                        DrawLine(i, y1, i, y2);
                        DrawLine(i, y2, x2, y2);
                        return true;
                    }
                    else {break;}
                }
            }
            else
            {
                for(var j=y1;j>y2-1;j--) {
                    if (OneCornerLink(i, j, x2, y2) && Map[i][j] == -1) {
                        DrawLine(x1, y1, i, y1);
                        DrawLine(i, y1, i, y2);
                        DrawLine(i, y2, x2, y2);
                        return true;
                    }
                    else {break;}
                }
            }
        else
        {break;}
    }
    return false;

}

//判断图片之间的连接方式
function IsLink(x1,y1,x2,y2){
    if(x1==x2)                               //x坐标相同，一条直线连接
    {
       // alert("x相同！");
        if(x1_Link_x2(x1,y1,y2))
        {
            DrawLine(x1,y1,x1,y2);
            return true;}
    }
    else if(y1==y2)                               //y坐标相同，一条直线连接
    {
      //  alert("y相同！");
        if(y1_Link_y2(y1,x1,x2))
        {
            DrawLine(x1,y1,x2,y1);
            return true;}
    }
    if(OneCornerLink(x1,y1,x2,y2))             //一个拐点，两条直线连接
    {
       // alert("一个拐点连接！");
        return true;
    }
    else if(TwoCornerLink(x1,y1,x2,y2))       //两个拐点，三条直线连接
    {
      //  alert("两个拐点连接！");
        return true;
    }
    return false;
}

//画连接线
function DrawLine(x1,y1,x2,y2){
    context.strokeStyle = "#00ff00";//设置线条颜色
    context.lineWidth=2;          //设置线条宽度
    context.beginPath();
    context.moveTo(MARGIN_LEFT+x1*SIZE+SIZE/2,MARGIN_TOP+y1*SIZE+SIZE/2);
    context.lineTo(MARGIN_LEFT+x2*SIZE+SIZE/2,MARGIN_TOP+y2*SIZE+SIZE/2);
    context.stroke(); //实际地绘制出通过moveTo()和lineTo定义的y方法

}


