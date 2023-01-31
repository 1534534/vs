



const rulesBtn = document.getElementsByClassName("rules-btn");
const closeBtn = document.getElementsByClassName("close-btn");
const rules = document.getElementsByClassName("rules");
const canvas = document.getElementsByClassName("canvas");
const ctx = canvas.getContext("2d");
// 规则栏显示设置
rulesBtn.addEventListener("click",()=> rules.classList.add("show"))
closeBtn.addEventListener("click",()=> rules.classList.remove("show"))
// 声明分数初始值
let score = 0;
// 设置每排砖块数
const brickRowCount = 40;
// 设置每列砖块数
const brickColumnCount = 15;
const delay = 500;

// 创建球体数据
const ball = {
  x: canvas.width / 2,
  y: canvas.height,
  size: 1,
  speed: 1,
  dx: 1,
  dy: -1,
  visible: true,
};
// 创建踏板数据
const paddle = {
  x: canvas.width / 2,
  y: canvas.height,
  w: 15,
  h: 1,
  dx: 0,
  speed: 1,
  visible: true,
};
// 创建砖块数据
const brickInfo = {
  w: 6,
  h: 5,
  padding: 1,
  offsetX: 1,
  offsetY: 20,
  visible: true,
};
// 创建砖块
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; i++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fill();
      ctx.closePath();
    });
  });
}
// 画出球体
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? "#0095dd" : "transparent";
  ctx.fill();
  ctx.closePath();
}

// 画出踏板
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ? "#0095dd" : "transparent";
  ctx.fill();
  ctx.closePath();
}
// 分数栏
function drawScore() {
  ctx.font = "10px Arial";
  ctx.fillText(`Score:${score}`, canvas.width - 60, 12);
}
// 移动踏板
function movePaddle() {
  paddle.x += paddle.dx;
  // 当踏板到右边界时停止
  if (paddle.x + paddle > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  // 当踏板到左边界时停止
  if (paddle.x < 0) {
    paddle = 0;
  }
}

// 球体的移动
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  //   球体撞到上左右边界反弹
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
}
// 球体撞击下边界重新开始
if (ball.y + ball.size > canvas.height) {
  showAllBricks();
  score = 0;
}
// 踏板撞击球体事件
if (
  ball.x - ball.size > paddle.x &&
  ball.x + ball.size < paddle.x + paddle.w &&
  ball.y + ball.size > paddle.y
) {
  ball.dy *= -1;
}
// 球体撞击砖块事件
brick.forEach((column) => {
  column.forEach((brick) => {
    if (brick.visible) {
      if (
        (ball.x > brick.x - ball.size && ball.x < brick.x) ||
        (ball.x < brick.x + brick.w + ball.size && ball.x > brick.x + brick.w)
      ) {
        ball.dx *= -1;
      } else if (
        (ball.y > brick.y + brick.h &&
          ball.y < brick.y + brick.h + ball.size) ||
        (ball.y > brick.y - ball.size && ball.y < brick.y)
      ) {
        bvall.dy *= -1;
        brick.visible = false;
        increaseScore();
      }
    }
  });
});
// 实现分数的自增长
function increaseScore() {
  score++;
  if (score % (brickColumnCount * brickRowCount) == 0) {
    ball.visible = false;
    paddle.visible = false;
    setTimeout(function () {
      showAllBricks();
      score = 0;
      paddle.x = canvas.width / 2;
      paddle.y = canvas.height;
      ball.x = canvas.width / 2;
      ball.y = canvas.height;
      ball.visible = true;
      paddle.visible = true;
    }, delay);
  }
}
// 显示所有的砖块
function showAllBricks() {
  brick.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}
// 按键按下时移动踏板
function keyDown(e) {
  if (e.key === "Right") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left") {
    paddle.dx = -paddle.speed;
  }
}
// 按键弹起时停止移动
function keyUp(e) {
  if (e.key === "Right" || e.key === "Left") {
    paddle.dx = 0;
  }
}

// 画所有物品
function draw() {
  ctx.clearReat(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();
}
//
function update() {
  moveBall();
  movePaddle();
  draw();
  requestAnimationFrame(update);
}
// 调用函数执行
update();

// 获取按键事件
document.addEventListener("keydown",keyDown)
document.addEventListener("keyup",keyUp)
// 
