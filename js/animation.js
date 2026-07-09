/* ==========================================================
   HAPPY BIRTHDAY PROJECT

   ANIMATION SYSTEM

   js/animations.js


   Features:
   - Typewriter effects
   - Screen transitions
   - Cake animations
   - Text effects

========================================================== */



/* ==========================================================
   TYPEWRITER FUNCTION
========================================================== */


function typeWriter(
    element,
    text,
    speed=50
){


    if(!element)
    {
        return;
    }



    element.innerHTML="";



    let index=0;



    function write(){


        if(index < text.length)
        {


            element.innerHTML +=
            text.charAt(index);



            index++;


            setTimeout(
                write,
                speed
            );


        }



    }



    write();


}






/* ==========================================================
   INTRO ANIMATION
========================================================== */


function animateIntro(){


    const intro =
    document.getElementById(
        "introText"
    );



    const message =

`Today is your special day my love

Even though we are far apart,

I wanted to create something
just for you.

Make a wish and blow the candles 🎂`;



    typeWriter(
        intro,
        message,
        45
    );


}






/* ==========================================================
   SHOW CAKE ANIMATION
========================================================== */


function showCakeAnimation(){



    const cakeSection =
    document.getElementById(
        "cakeSection"
    );



    if(!cakeSection)
    {

        return;

    }



    cakeSection.classList.remove(
        "hidden"
    );



    cakeSection.classList.add(
        "scaleIn"
    );



}







/* ==========================================================
   HIDE INTRO
========================================================== */


function hideIntro(){


    const intro =
    document.querySelector(
        "main"
    );



    if(intro)
    {


        intro.classList.add(
            "fadeOut"
        );



        setTimeout(()=>{


            intro.style.display="none";


        },800);



    }



}







/* ==========================================================
   BUTTON EFFECT
========================================================== */


function animateButton(){



    const button =
    document.getElementById(
        "startButton"
    );



    if(!button)
    {

        return;

    }



    button.classList.add(
        "glow"
    );



}






/* ==========================================================
   ENDING TEXT ANIMATION
========================================================== */


function animateEnding(){



    const endingText =
    document.querySelector(
        "#endingSection p"
    );



    if(!endingText)
    {

        return;

    }




const message=

`I hope all your dreams come true ❤️

I know distance separates us today,

but my heart is always with you.

Until we celebrate together...

Happy Birthday my love ❤️`;



    typeWriter(

        endingText,

        message,

        55

    );


}







/* ==========================================================
   FLOATING CAKE EFFECT
========================================================== */


function floatCake(){



    const canvas =
    document.getElementById(
        "cakeCanvas"
    );



    if(canvas)
    {

        canvas.classList.add(
            "float"
        );

    }


}






/* ==========================================================
   PARTICLE BURST
========================================================== */


function sparkleBurst(){



    const container =
    document.getElementById(
        "stars"
    );



    if(!container)
    {
        return;
    }



    for(
        let i=0;
        i<30;
        i++
    )
    {


        const star =
        document.createElement(
            "div"
        );



        star.className="star";



        star.style.left =
        "50%";


        star.style.top =
        "50%";



        star.style.transform=

        `
        translate(
        ${Math.random()*400-200}px,
        ${Math.random()*400-200}px
        )
        `;



        container.appendChild(
            star
        );



        setTimeout(()=>{


            star.remove();


        },2000);



    }



}






/* ==========================================================
   EXPORT
========================================================== */


window.AnimationSystem={


    intro:
    animateIntro,


    showCake:
    showCakeAnimation,


    hideIntro:
    hideIntro,


    button:
    animateButton,


    ending:
    animateEnding,


    floatCake:
    floatCake,


    sparkle:
    sparkleBurst


};