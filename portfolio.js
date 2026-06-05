const canvas = document.getElementById("portfolioCanvas");

// Dynamically change the canvas size to the window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = 'rgb(0, 0, 139)'; // Dark blue background color
}

resizeCanvas();

// Resize canvas when the window is resized
window.addEventListener('resize', resizeCanvas);

for(let i = 1; i <= 350; i++){
    let box = document.createElement('div');
    box.classList.add('box');

    const randomX = Math.random() * canvas.width; // Random left position
    const randomY = Math.random() * canvas.height; // Random top position
    
    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
    
    document.querySelector('.sec').appendChild(box);
}

function animateBox(){
let boxes = document.querySelectorAll('.box');
let num = Math.floor(Math.random()*boxes.length);
boxes[num].classList.toggle('animate');
}

setInterval(animateBox, 2);
