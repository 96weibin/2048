function getPosTop(i, j) {
    return i * 120;
}
function getPosLeft(i, j) {
    return j * 120;
}
// window.alert = function() {
//     var chick = document.createElement('div');
//     chick.style.width = '500px';
//     chick.style.height = '300px';
//     chick.style.background = 'rgba(255, 100, 0)';
//     chick.style.textAlign = 'center'
//     chick.style.color = '#ffffff';
// }
// alert('fsdasdfghjklxcvbnm');
function getNumberBackGroundColor(number) {
    switch (number) {
        case 2:
            return '#eee4da';
            break;
        case 4:
            return '#eee4da';
            break;
        case 8:
            return '#f26179';
            break;
        case 16:
            return '#f59563';
            break;
        case 32:
            return '#f67c5f';
            break;
        case 64:
            return '#f65e36';
            break;
        case 128:
            return '#edcf72';
            break;
        case 256:
            return '#edcc61';
            break;
        case 512:
            return '#99cc00';
            break;
        case 1024:
            return '#3365a5';
            break;
        case 2048:
            return '#09c';
            break;
        case 4096:
            return '#a6c';
            break;
        case 8192:
            return '#93c';
            break;
    }
    return 'black';  //啥用？
}
function getNumberColor(number) {
    if(number <= 4) {
        return '#776e65';
    }
    return 'white';
}
function nospace(board) {//没空了 返回 true  还有空就返回false
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if (board[i][j] == 0){
                return false;                
            }
        }   
    }
    return true;
}
//实现功能判断
function canMoveLeft(board){
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(board[i][j] != 0) { //当这个位置有值的时候

                //每一行都判断 如果 连续两个有相等的    就还能←挪
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    //感觉 判断
                    return true;
                }
            }
        }
    }
    return false;//否则就是不能了
}
function canMoveRight(board) {
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++){
            if(board[i][j] != 0) {
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(board){
    for(var i = 1; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(board[i][j] !== 0) {
                if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(board){
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 4; j++) {
            if(board[i][j] !== 0) {
                if(board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//判断水平方向是否有障碍物

function noBlockHorizontal(row, col1, col2, board) {
    for(var i = col1 + 1; i< col2; i++) {
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}

//判断垂直方向是否有障碍物
function noBlockVertical( col, row1, row2, board) {
    for(var i = row1 + 1 ; i < row2; i++) {
        if(board[col][i] != 0){
            return false;            
        }
    }
    return true;
}
function nomove(board){
    if(canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board) ) {
        return false;
    }
    return true;
}

function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css({'background-color':getNumberBackGroundColor(randNumber),'color':getNumberColor(randNumber),'position':'absolute','top':getPosTop(i, j) + 50  + 'px', 'left' : getPosLeft(i, j) + 50 + 'px'})
    numberCell.text(randNumber);

    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(i, j),
        left:getPosLeft(i, j)
    },400);
}

function showMoveAnimation (fromX, fromY, toX, toY) {
    var numberCell = $('#number-cell-' + fromX + '-' + fromY);
    numberCell.animate({'top':getPosTop(toX, toY),'left':getPosLeft(toX, toY)},500);
}