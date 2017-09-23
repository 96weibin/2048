var board = new Array();
var score = 0;

// function clone (arr) {           //错错错  这个是浅拷贝  这里的数组是二维数组
//     return arr.slice(0);
// }
// var copyBoard ;
$('.start').click(function(){
    $('.wrapper').fadeOut(400);
    newgame();
    //事件响应循环
    $(document).keydown(function(event){
        event = event || window.event;        
        switch (event.keyCode) {
            case 37://left
                if(moveLeft()){
                    generateOneNumber();
                    isgameover();
                }
                break;
            case 38://up
                if(moveUp()) {
                    generateOneNumber();
                    isgameover();
                }
                break;
            case 39://right
                if(moveRight()) {
                    generateOneNumber();
                    isgameover();
                }
                break;
            case 40://down
                if(moveDown()) {
                    generateOneNumber();
                    isgameover();
                }
                break;
        }   
    });
})


// var top = 240;

function newgame() {
    init();//初始化棋盘
    generateOneNumber();
    generateOneNumber();  //随机生成两个数
}

function init() {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++){
            var gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top',getPosTop(i, j));//为啥 要传进来两值 ？ 后面只用了一个
            gridCell.css('left',getPosLeft(i, j));
            // console.log(getPosTop(i,j)+'_______'+getPosLeft(i,j));
            //给小块定位
        }
    }
    for(var i = 0; i < 4; i++) {
        board[i] = new Array();
        for(var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    //初始化 一个二维数组
    updateBoardView();//通知前端对board两位数组进行设定
}
function updateBoardView() {    //  点击完成后  遍历board 生成新的 棋子
    $('.number-cell').remove(); //清空棋子
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            
            //有颜色和分数的 块是 动态生成的   number-cell  设置一个class 设置统一的样式  设置不同的 id 来操作
            $('.g2048').append('<div class="number-cell" id="number-cell-'+ i +'-' + j +'"></div>')
            var theNumberCell = $('#number-cell-'+ i + '-' + j);
            if(board[i][j] == 0) {//全遍历一遍 如果没有数字 就隐藏起来
                theNumberCell.css({'width':'0px','height':'0px','top':getPosTop(i, j),'left':getPosLeft(i, j)});
            }else{
                //格子中有数字的   有宽度 有高度 获取来字体颜色和背景颜色 获取定位
                theNumberCell.css({'width':'100px','height':'100px','top':getPosTop(i, j),'left':getPosLeft(i, j),'background-color':getNumberBackGroundColor(board[i][j]),'color':getNumberColor(board[i][j])})
                theNumberCell.text(board[i][j]);
                //添加数字在  number-cell中
            }
        }
    }
}
//二维数组用来存贮 每一个块里面的数值

function generateOneNumber() {  //生成新的块  2,4
    if (nospace(board)){//没有空格 就return false
        return false;
    }//随机一个位置
    var randX = parseInt(Math.floor(Math.random()*4));
    var randY = parseInt(Math.floor(Math.random()*4));
    // console.log(randX + '__________' + randY);
    while (true){
        if (board[randX][randY] == 0){ //如果生成在空位置  
            // console.log(randX+'__________'+randY);
            break;        //跳出循环
        }
        
        //否则  生成的随机位置  有数值在  就再循环一次   
        // console.log(randX+'__________'+randY);
        randX = parseInt(Math.floor(Math.random()*4));
        randY = parseInt(Math.floor(Math.random()*4));
    }
        //随机一个数字 小于0.5 2 大于0.5 4
    var randNumber = Math.random() < 0.5 ? 2 : 4;  
    //在随机位置显示随机数字 
    board[randX][randY] = randNumber;//在这里  把二维数组的位置 存入值
    showNumberWithAnimation(randX, randY, randNumber);
    return true;
}
function isgameover() {
    if(nospace(board) && nomove(board))
    gameover();
}
function gameover() {
    // alert('gameover');
    switch (score) {
        case 1024:
        alert('月饼一块')
        break;
        case 2048:
        alert('月饼两块')
        break;
        case 4096:
        alert('月饼一盒');
        break;
        case 8192:
        alert('月饼两盒');
        break;
        case 16384:
        alert('月亮是你的了');
        break;
        default:
        alert('再努力一下试试  这分太少了  纪念奖  ‘超级豪华’ 2048 游戏免费体验一次')

    }
}


var flag = true;

//移动的时候  有  bug  按上 的时候  如果 有一列 自上到下排列为  2，2，4, 8  这时按上  就会 一起合并  成16
//其他方向移动也是类似的   因为  我们移动是判断 按上的时候   某一列 是从 0 ~ i 逐个遍历的  
//如果 之间没有障碍 且   相等/为零 的时候 就把   数值加过去    二维数组中原有位置变  0 0 当循环的时候  直接改变了 board  
//所以 要建一个  临时的Copyboard 现在这里面 改值    循环完成的时候  在把 copyBoard  赋值给  board  去 生成  
//错错错  ！！！！！  尴尬 抄别人的理解还是  不透彻   棋子的生成本来就是 有延迟的  所以要给变  遍历数组的方式 在数值相等的情况下  加一些限制  
function moveLeft(){
    if(flag == true){   
        flag = false;   //上锁   
        setTimeout(function() {
            flag = true;
            // console.log(flag);
        }, 200);
    }else{
        return;
    }
    if(!canMoveLeft(board)) {//不能左移时
        console.log('cant left')
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for(var j = 1; j < 4; j++) {//第一列的数字不能左移
            if(board[i][j] != 0) {
                //i,j 左侧的元素
                for(var k = 0; k < j; k++) {    //落脚位置为空  && 中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
                         showMoveAnimation(i, j , i, k); 
                         board[i][k] += board[i][j];  
                         board[i][j] = 0;
                         continue;         
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        if(score < board[i][k]){
                            score = board[i][k];                            
                            console.log('左操作 得新分数' + score)                            
                            $('#score > span').html(board[i][k]);
                        }
                        // k++;
                        // console.log(k);
                        // continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),500);
    return true;
}
function moveUp(){
    if(flag == true){   
        flag = false;   //上锁   
        setTimeout(function() {
            flag = true;
            // console.log(flag);
        }, 200);
    }else{
        return;
    }
    if(!canMoveUp(board)) {//不能上移时
        console.log('cant Up')        
        return false;
    }
    //
    for (var i = 1;  i < 4; i++) {//第一行的数字不能上移  //i是行  j是列   
        for(var j = 0; j < 4; j++) {    //遍历没
            if(board[i][j] != 0) {
              //i,j 上侧的元素         
                for(var k = 0; k < i; k++) {    //落脚位置为空  && 中间没有障碍物
                    if(board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j); 
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;         
                    }else if(board[i][j] == board[k][j] && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];   
                        board[i][j] = 0;
                        if(score < board[k][j]) {
                            score = board[k][j];
                            console.log('上操作 得新分数' + score)
                            $('#score > span').html(board[k][j]);
                        }
                        // k++;            
                        // console.log(k);                        
                        // continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),500);
    return true;
}
function moveRight(){
    if(flag == true){   
        flag = false;   //上锁   
        setTimeout(function() {
            flag = true;
            // console.log(flag);
        }, 200);
    }else{
        return;
    }
    if(!canMoveRight(board)) {//不能左移时
        console.log('cant right')        
        return false;
    }
    for (var i = 0; i < 4; i++) {//i是行  j是列
        for(var j = 2; j >= 0; j--) {//最后一列的数字不能左移  而且  右移要想全部都一动  就要从 右边开始遍历 所以  这里 循环 是--
            if(board[i][j] != 0) {
            //     //i,j 右侧的元素
                // var index = j;             
                for(var k = 3; k > j; k--) {    //落脚位置为空  && 中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k); 
                         board[i][k] = board[i][j];
                         board[i][j] = 0;
                         continue;         
                    }else if(board[i][j] == board[i][k] && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];   
                        board[i][j] = 0;
                        if(score < board[i][k]){
                            score = board[i][k];                            
                            console.log('右 得新分数' + score)                            
                            $('#score > span').html(board[i][k]);
                        }
                        // j++; //这里不应该 改 k而是  改上限 k < j - 1 ;   下次判断的时候  就不会算上 才合并到一起的了
                        //j++也不完善 如果在右侧 有一个不能合并的   就要 +2     又不能影响  里面的行  所以 var 一个  index  改变index来控制循环几次
                        //好像不影响。。。。。。。。。


                        //还是改变 k的值
                        // k--;
                        // console.log(k);                        
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),500);
    return true;
}
function moveDown(){
    if(flag == true){   
        flag = false;   //上锁   
        setTimeout(function() {
            flag = true;
            // console.log(flag);
        }, 200);
    }else{
        return;
    }
    if(!canMoveDown(board)) {//不能下移时
        console.log('cant down')        
        return false;
    }
    //
    for (var i = 2;  i >= 0; i--) {//最后一行的数字不能下移 且 i作为二维数组的 第一个方括号[]第一项  不能为undefined//i是行  j是列   
        for(var j = 0; j < 4; j++) {    //遍历
            if(board[i][j] != 0) {
              //i,j 下侧的元素         
                for(var k = 3; k > i; k--) {    //落脚位置为空  && 中间没有障碍物
                    if(board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j); 
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;         
                    }else if(board[i][j] == board[k][j] && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];                                                
                        board[i][j] = 0;
                        if(score < board[k][j]) {
                            score = board[k][j];                            
                            console.log('下操作 得新分数' + score)                            
                            $('#score > span').html(board[k][j]);
                        }
                        // k--;
                        // console.log(k);                        
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),500);
    return true;
}