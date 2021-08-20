let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "bird.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeNorth.src = "pipeNorth.png";
pipeSouth.src = "pipeSouth.png";

let gap=85;
let constant;
let score=0;

let bx=10;
let by=150;
let gravity=1.5;

document.addEventListener("keydown",moveUp);

function moveUp()
{
    by-=25;
}

let pipe=[];
pipe[0]=
{
    x : cvs.width,
    y : 0
};

function draw()
{
    ctx.drawImage(bg,0,0);

    for(let i=0; i<pipe.length; i++)
    {
        constant=pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;

        if(pipe[i].x==125)
        {
            pipe.push({
                x:cvs.width,
                y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        if(bx+bird.width >= pipe[i].x && bx<=pipe[i].x + pipeNorth.width && (by <= pipe[i].y +pipeNorth.height || by+bird.height >= pipe[i].y+constant) || by + bird.height >= cvs.height-fg.height)
        {
            location.reload();
        }

        if(pipe[i].x==5)
        {
            score++;
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bx,by);

    by+=gravity;

    ctx.fillStyle="#000";
    ctx.font="20px Verdana";
    ctx.fillText("SCORE: " +score,10,cvs.height-20)

    requestAnimationFrame(draw);
}

window.addEventListener("load",draw);