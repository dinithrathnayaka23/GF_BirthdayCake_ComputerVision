/* ==========================================================
   HAPPY BIRTHDAY PROJECT

   MAIN APPLICATION CONTROLLER

   js/app.js


   Controls:
   - Start button
   - Cake initialization
   - Camera
   - Microphone
   - Music
   - Animations
   - Celebration checking

========================================================== */



/* ==========================================================
   APPLICATION STATE
========================================================== */


let appStarted = false;



let celebrationInterval;





/* ==========================================================
   DOM ELEMENTS
========================================================== */


const startButton =
document.getElementById(
    "startButton"
);





/* ==========================================================
   INITIAL LOAD
========================================================== */


window.addEventListener(
    "DOMContentLoaded",
    ()=>{


        initialize();


    }
);






/* ==========================================================
   INITIALIZE APP
========================================================== */


function initialize(){


    console.log(
        "Birthday app loaded ❤️"
    );



    // Start background effects


    if(window.Particles)
    {

        Particles.start();

    }



    // Button glow


    if(window.AnimationSystem)
    {

        AnimationSystem.button();

    }




    // Intro typing


    if(window.AnimationSystem)
    {

        AnimationSystem.intro();

    }





    startButton.addEventListener(

        "click",

        startExperience

    );



}








/* ==========================================================
   START EXPERIENCE
========================================================== */


async function startExperience(){



    if(appStarted)
    {

        return;

    }



    appStarted=true;



    console.log(
        "Celebration started 🎂"
    );





    /*
       Remove intro screen
    */


    if(AnimationSystem)
    {

        AnimationSystem.hideIntro();

    }





    setTimeout(()=>{


        /*
           Show cake
        */


        if(AnimationSystem)
        {

            AnimationSystem.showCake();


        }




        /*
           Initialize cake

        */


        if(window.Cake)
        {

            Cake.init();

        }




        /*
           Floating animation

        */


        if(AnimationSystem)
        {

            AnimationSystem.floatCake();

        }



    },900);








    /*
       Start music

    */


    if(window.AudioSystem)
    {


        AudioSystem.play();


    }





    /*
       Start camera

    */


    if(window.CameraSystem)
    {


        await CameraSystem.start();


    }





    /*
       Start microphone

    */


    if(window.AudioSystem)
    {


        await AudioSystem.startMic();


    }





    /*
       Monitor candles

    */


    startCelebrationMonitor();



}








/* ==========================================================
   CHECK FOR FINISHED CAKE
========================================================== */


function startCelebrationMonitor(){



    celebrationInterval =

    setInterval(()=>{


        if(
            window.Cake
            &&
            Cake.remainingCandles()
            ===0
        )
        {


            clearInterval(
                celebrationInterval
            );



            if(window.Celebration)
            {


                Celebration.start();


            }


        }



    },1000);



}






/* ==========================================================
   STOP EVERYTHING
========================================================== */


function stopApplication(){



    if(window.CameraSystem)
    {

        CameraSystem.stop();

    }



    if(window.AudioSystem)
    {

        AudioSystem.stopMic();

    }



    clearInterval(
        celebrationInterval
    );



}







/* ==========================================================
   PAGE EXIT
========================================================== */


window.addEventListener(

"beforeunload",

()=>{


    stopApplication();


}

);
