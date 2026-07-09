/* ==========================================================
   HAPPY BIRTHDAY PROJECT

   CAKE ENGINE
   js/cake.js

========================================================== */


const cakeCanvas = document.getElementById("cakeCanvas");

const ctx = cakeCanvas.getContext("2d");



/* ==========================================================
   CANVAS SETTINGS
========================================================== */


let canvasWidth = cakeCanvas.width;
let canvasHeight = cakeCanvas.height;



function resizeCanvas(){

    const ratio = window.devicePixelRatio || 1;

    const rect = cakeCanvas.getBoundingClientRect();


    cakeCanvas.width = rect.width * ratio;

    cakeCanvas.height = rect.width * ratio * 0.72;


    ctx.scale(ratio,ratio);


    canvasWidth = rect.width;

    canvasHeight = rect.width * 0.72;

}


window.addEventListener(
    "resize",
    resizeCanvas
);



/* ==========================================================
   CAKE DATA
========================================================== */


const cake = {

    x:0,

    y:0,

    width:260,

    height:120

};



const candles = [

    {
        x:-90,
        alive:true,
        flameOffset:0
    },

    {
        x:-45,
        alive:true,
        flameOffset:1
    },

    {
        x:0,
        alive:true,
        flameOffset:2
    },

    {
        x:45,
        alive:true,
        flameOffset:3
    },

    {
        x:90,
        alive:true,
        flameOffset:4
    }

];



let smokeParticles=[];



/* ==========================================================
   INITIALIZE
========================================================== */


function initCake(){

    resizeCanvas();

    animateCake();

}



/* ==========================================================
   DRAW LOOP
========================================================== */


function animateCake(){


    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    ctx.save();


    /* Scale drawing to fit canvas size proportionally */
    const scale = canvasWidth / 900;
    ctx.scale(scale, scale);

    ctx.translate(
        450,
        324
    );


    drawPlate();


    drawCake();


    drawCandles();


    updateSmoke();


    ctx.restore();


    requestAnimationFrame(
        animateCake
    );

}




/* ==========================================================
   DRAW PLATE
========================================================== */


function drawPlate(){


    ctx.beginPath();


    ctx.ellipse(
        0,
        90,
        190,
        25,
        0,
        0,
        Math.PI*2
    );


    ctx.fillStyle="#eeeeee";


    ctx.fill();


    ctx.strokeStyle="rgba(0,0,0,.15)";


    ctx.stroke();


}




/* ==========================================================
   DRAW CAKE
========================================================== */


function drawCake(){


    // Bottom layer


    ctx.fillStyle="#8b4513";


    ctx.fillRect(
        -130,
        0,
        260,
        80
    );



    // Cream layer


    ctx.fillStyle="#fff0f5";


    ctx.fillRect(
        -130,
        -20,
        260,
        35
    );



    // Top layer


    ctx.fillStyle="#d2691e";


    ctx.fillRect(
        -100,
        -80,
        200,
        60
    );



    // Icing


    ctx.fillStyle="#ffb6c1";


    ctx.beginPath();


    ctx.arc(
        -60,
        -80,
        35,
        0,
        Math.PI,
        false
    );


    ctx.arc(
        0,
        -80,
        35,
        0,
        Math.PI,
        false
    );


    ctx.arc(
        60,
        -80,
        35,
        0,
        Math.PI,
        false
    );


    ctx.fill();



    drawSprinkles();


}




/* ==========================================================
   SPRINKLES
========================================================== */


function drawSprinkles(){


    const colors=[

        "#ff4081",
        "#2196f3",
        "#4caf50",
        "#ff9800"

    ];



    for(let i=0;i<35;i++){


        let x =
        -110 + Math.random()*220;


        let y =
        -5 + Math.random()*65;



        ctx.fillStyle =
        colors[
            Math.floor(
                Math.random()*colors.length
            )
        ];



        ctx.fillRect(
            x,
            y,
            5,
            3
        );


    }


}





/* ==========================================================
   DRAW CANDLES
========================================================== */


function drawCandles(){



    candles.forEach(
        (candle)=>{


            if(!candle.alive)
            {

                return;

            }



            // candle body


            ctx.fillStyle="#ffffff";


            ctx.fillRect(

                candle.x-10,

                -140,

                20,

                60

            );



            // candle stripe


            ctx.fillStyle="#ff69b4";


            ctx.fillRect(

                candle.x-10,

                -120,

                20,

                8

            );



            drawFlame(

                candle.x,

                -150,

                candle.flameOffset

            );


        }
    );

}



/* ==========================================================
   FLAME ANIMATION
========================================================== */


function drawFlame(x,y,index){


    const flicker =
    Math.sin(
        Date.now()/100 +
        index
    )*5;



    ctx.beginPath();



    ctx.moveTo(
        x,
        y-25
    );


    ctx.quadraticCurveTo(

        x+15+flicker,

        y-5,

        x,

        y+10

    );


    ctx.quadraticCurveTo(

        x-15-flicker,

        y-5,

        x,

        y-25

    );



    ctx.fillStyle="#ff9800";


    ctx.fill();



    ctx.beginPath();


    ctx.arc(

        x,

        y-8,

        5,

        0,

        Math.PI*2

    );


    ctx.fillStyle="#fff176";


    ctx.fill();



}




/* ==========================================================
   BLOW CANDLE FUNCTION

   Called later by microphone detection

========================================================== */


function blowOutNextCandle(){



    const candle =
    candles.find(
        c=>c.alive
    );



    if(!candle)
    {

        return false;

    }



    candle.alive=false;



    createSmoke(

        candle.x,

        -150

    );



    return true;


}






/* ==========================================================
   SMOKE PARTICLES
========================================================== */


function createSmoke(x,y){



    for(let i=0;i<15;i++){


        smokeParticles.push({

            x:x,

            y:y,

            size:
            Math.random()*8+3,


            speed:
            Math.random()*1+0.5,


            opacity:1


        });


    }


}





function updateSmoke(){



    smokeParticles.forEach(

        (p)=>{


            p.y-=p.speed;


            p.opacity-=0.01;



            ctx.beginPath();


            ctx.arc(

                p.x,

                p.y,

                p.size,

                0,

                Math.PI*2

            );



            ctx.fillStyle=

            `rgba(200,200,200,${p.opacity})`;



            ctx.fill();



        }

    );



    smokeParticles =
    smokeParticles.filter(
        p=>p.opacity>0
    );


}




/* ==========================================================
   EXPORT FUNCTIONS

========================================================== */


window.Cake = {

    init:initCake,

    blow:blowOutNextCandle,

    remainingCandles:function(){

        return candles.filter(
            c=>c.alive
        ).length;

    }

};