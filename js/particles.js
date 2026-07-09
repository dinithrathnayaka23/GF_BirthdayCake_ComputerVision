/* ==========================================================
   HAPPY BIRTHDAY PROJECT

   PARTICLE SYSTEM

   js/particles.js

========================================================== */


/* ==========================================================
   DOM ELEMENTS
========================================================== */


const starsContainer =
document.getElementById("stars");


const heartsContainer =
document.getElementById("hearts");


const balloonsContainer =
document.getElementById("balloons");



/* ==========================================================
   CREATE STARS
========================================================== */


function createStars(){


    const totalStars = 80;



    for(let i=0;i<totalStars;i++){


        const star =
        document.createElement("div");


        star.className="star";



        star.style.left =
        Math.random()*100+"%";


        star.style.top =
        Math.random()*100+"%";



        const size =
        Math.random()*3+1;



        star.style.width =
        size+"px";


        star.style.height =
        size+"px";



        star.style.animationDuration =
        (Math.random()*3+2)+"s";



        star.style.animationDelay =
        Math.random()*5+"s";



        starsContainer.appendChild(star);


    }

}




/* ==========================================================
   HEART GENERATOR
========================================================== */


function createHeart(){



    const heart =
    document.createElement("div");



    heart.className="heart";



    const emojis=[

        "❤️",
        "💗",
        "💕",
        "💖",
        "💘"

    ];



    heart.innerHTML =
    emojis[
        Math.floor(
            Math.random()*emojis.length
        )
    ];



    heart.style.left =
    Math.random()*100+"%";



    heart.style.fontSize =
    (Math.random()*25+15)+"px";



    heart.style.animationDuration =
    (Math.random()*5+5)+"s";



    heartsContainer.appendChild(
        heart
    );



    setTimeout(()=>{


        heart.remove();


    },10000);



}




/* ==========================================================
   BALLOON GENERATOR
========================================================== */


function createBalloon(){



    const balloon =
    document.createElement("div");



    balloon.className="balloon";



    const balloons=[

        "🎈",
        "🎈",
        "🎈",
        "🎉"

    ];



    balloon.innerHTML =
    balloons[
        Math.floor(
            Math.random()*balloons.length
        )
    ];



    balloon.style.left =
    Math.random()*100+"%";



    balloon.style.fontSize =
    (Math.random()*30+35)+"px";



    balloon.style.animationDuration =
    (Math.random()*8+8)+"s";



    balloonsContainer.appendChild(
        balloon
    );



    setTimeout(()=>{


        balloon.remove();


    },16000);



}




/* ==========================================================
   RANDOM PARTICLE LOOP
========================================================== */


let particleRunning=true;



function particleLoop(){


    if(!particleRunning)
    {
        return;
    }


    createHeart();


    if(Math.random()>0.5)
    {

        createBalloon();

    }


    setTimeout(

        particleLoop,

        1200

    );


}





/* ==========================================================
   START / STOP CONTROLS
========================================================== */


function startParticles(){


    createStars();


    particleLoop();


}




function stopParticles(){

    particleRunning=false;

}




/* ==========================================================
   EXPORT
========================================================== */


window.Particles={


    start:startParticles,


    stop:stopParticles


};