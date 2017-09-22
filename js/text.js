function moveLeft(){
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
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
}