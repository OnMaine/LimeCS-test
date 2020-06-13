let colors = ["#FC74FD", "#3AB745", "#029990", "#3501CB",
  "#2E2C75", "#673A7E"
];
let points = ["1", "2", "3", "4",
  "5", "6"
];

let startAngle = 0;
let arc = Math.PI / 3;
let spinTimeout = null;

let isOpen = 0;

let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

let ctx;

function drawRouletteWheel() {
  let canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    let outsideRadius = 200;
    let textRadius = 140;
    let insideRadius = 0;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    //circleLine
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 20px Helvetica, Arial';

    for (let i = 0; i < 6; i++) {
      let angle = startAngle + i * arc;
      ctx.fillStyle = colors[i];
      //circle
      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();
      //numbers
      ctx.save();
      ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      let text = points[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  if (isOpen == 1) {
    closeModal();
  }
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1500;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  let degrees = startAngle * 180 / Math.PI + 90;
  let arcd = arc * 180 / Math.PI;
  let index = Math.floor((360 - degrees % 360) / arcd);
  let text = points[index]
  document.getElementById("point").innerHTML = text;
  openModal();
}

function openModal() {
  let overlay = document.getElementById('popup-wrapp');
  overlay.setAttribute("style", "visibility: visible; opacity: 1;");
  isOpen = 1;
}

function closeModal() {
  let overlay = document.getElementById('popup-wrapp');
  overlay.setAttribute("style", "visibility: hiden; opacity: 0;");
  isOpen = 0;
}

function easeOut(t, b, c, d) {
  let ts = (t /= d) * t;
  let tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

drawRouletteWheel();
