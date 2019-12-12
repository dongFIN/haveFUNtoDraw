let bottonHeight = document.querySelector('.guest_container')
console.log(bottonHeight)
console.log((window.innerHeight)*0.8)
bottonHeight.style.height = String((window.innerHeight)*0.35) + 'px'


//-------------------------- hint相關判斷-------------------------------

var hint = document.querySelector('.hint')
var f_hintUsed = 0
hint.addEventListener('click',function subHint(){
    var hintCNT = document.querySelector('.hintCNT')
    var cnt = hintCNT.textContent
    hintCNT.innerHTML = cnt-1
    if (cnt-1 == 0){
        f_hintUsed = 1
        hint.removeEventListener('click',subHint)
    }
})

// ---------------畫圖相關---------------
var drawBox = document.querySelector('.drawBox')
var drawBoxParent = document.querySelector('.painter_container')
console.log(drawBoxParent.offsetLeft)
let drawColorALL = document.querySelectorAll('.color_part')
let penSizeALL = document.querySelectorAll('.choice_size')
let functTypeALL = document.querySelectorAll('.choice_type')
let functType      
let drawColor
let tempColor
let penSize = 3
// functTypeALL[0].style.backgroundImage = "url(" + "./pic/edit_c.png" + ")"

function changefunct(event){
    e = event.currentTarget
    console.log(e.id)
    functTypeALL[0].style.backgroundImage = "url(" + "./pic/edit.png" + ")"
    functTypeALL[1].style.backgroundImage = "url(" + "./pic/eraser.png" + ")"
    // functTypeALL[2].style.backgroundImage = "url(" + "./pic/bin.png" + ")"
    if (e.id == 'pen'){
        drawColor = tempColor
        e.style.backgroundImage = "url(" + "./pic/edit_c.png" + ")"
    } 
    else if (e.id == 'eraser'){
        tempColor = drawColor
        drawColor = 'rgba(247, 245, 243, 1)'
        e.style.backgroundImage = "url(" + "./pic/eraser_c.png" + ")"
    }
    else if (e.id == 'crash') {
        drawColor = tempColor
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        functTypeALL[0].style.backgroundImage = "url(" + "./pic/edit_c.png" + ")"
    }
}
for (x of functTypeALL){
    x.addEventListener('click', changefunct)
}

function changeSize(event){
    functTypeALL[0].style.backgroundImage = "url(" + "./pic/edit_c.png" + ")"
    e = event.currentTarget
    console.log(e.id)
    if (e.id == 'L') penSize = 5
    else if (e.id == 'M') penSize = 3.5
    else if (e.id == 'S') penSize = 2
}
for (x of penSizeALL){
    x.addEventListener('click', changeSize)
}

// console.log(drawColor)
function changeColor(event){
    functTypeALL[0].style.backgroundImage = "url(" + "./pic/edit_c.png" + ")"
    functTypeALL[1].style.backgroundImage = "url(" + "./pic/eraser.png" + ")"
    e = event.currentTarget
    drawColor = e.style['backgroundColor'] 
    console.log(e.style['backgroundColor'])
}
for (x of drawColorALL){
    x.addEventListener('click', changeColor)
}


// -----------------------畫圖功能----------------------------------
let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")
let pointX
let pointY
let lastX
let lastY
canvas.height = (window.innerHeight)*0.6;
canvas.width = (window.innerWidth)*0.6;

function mouseStop(event){ //點擊結束則移除，並重新監聽是否開始
    console.log('Stop')
    drawBox.removeEventListener('mousemove', mouseMove)
    drawBox.removeEventListener('mouseup', mouseStop)
    drawBox.addEventListener('mousedown',mouseStart)
}
function mouseMove(event){
    // console.log("event.page"+event.pageX+" drawBox.offsetLeft"+drawBox.offsetLeft)
    // console.log("event.page"+event.pageY+" drawBox.offsetLeft"+drawBox.offsetTop)
    // 扣掉與parent的左端點距離 && parent與body之間的距離
    pointX = event.pageX-drawBox.offsetLeft-drawBoxParent.offsetLeft
    pointY = event.pageY-drawBoxParent.offsetTop
    draw()
    lastX = pointX
    lastY = pointY
    drawBox.addEventListener('mouseup',mouseStop)
}
function mouseStart(event){   // 點擊下即開始
    console.log('Start')
    pointX = event.pageX-drawBox.offsetLeft-drawBoxParent.offsetLeft
    lastX = pointX
    pointY = event.pageY-drawBoxParent.offsetTop
    lastY = pointY
    drawBox.addEventListener('mousemove',mouseMove)   //判斷是移動畫畫
    drawBox.addEventListener('mouseup',mouseStop)     //還是只點一下
}
drawBox.addEventListener('mousedown',mouseStart)

const draw = () =>{
    console.log('X：' + pointX + ' Y：' + pointY)
    console.log('X：' + lastX + ' Y：' + lastY)
    //開始作畫
    ctx.beginPath();
    ctx.lineWidth = penSize        // 筆刷大小
    ctx.moveTo(lastX,lastY)          // 先移去舊的點
    ctx.lineTo(pointX,pointY);       // 再到新點連線
    ctx.strokeStyle = drawColor;     // 設定畫筆顏色
    ctx.stroke();

}

// --------------------------聊天功能------------------------------

//設定聊天區
var chat_btn = document.querySelector('.chat_btn')
var chat_input = document.querySelector('.chat_input')
chat_btn.addEventListener('click',function(){
    var chat = document.querySelector('.chat')
    var addChatText = document.createElement('p')
    addChatText.innerHTML = chat_input.value
    chat.appendChild(addChatText)
    addChatText.style.scrollSnapAlign= 'end'
    chat_input.value = ""

})
// 設定答案顯示區
var ans_btn = document.querySelector('.ans_btn')
var ans_input = document.querySelector('.ans_input')
ans_btn.addEventListener('click',function(){
    var ans = document.querySelector('.ans')
    var addAnsText = document.createElement('p')
    addAnsText.innerHTML = ans_input.value
    ans.appendChild(addAnsText)

})


//--------------------------測試區------------------------------

// 暫用vote測試保存圖片的方式
var vote = document.querySelector('.vote')
vote.addEventListener('click',function(){
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
    var testpic = document.querySelector('.testpic')
    testpic.src = dataURL  //直接將圖片的src指定為dataURL即可
})