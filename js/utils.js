/* ==========================================================
   HAPPY BIRTHDAY PROJECT

   UTILITY FUNCTIONS

   js/utils.js


   Provides:
   - Device detection
   - Random helpers
   - Browser helpers
   - Permission helpers

========================================================== */



/* ==========================================================
   DEVICE CHECK
========================================================== */


function isMobileDevice(){


    return (

        /Android|iPhone|iPad|iPod/i

        .test(
            navigator.userAgent
        )

    );


}






/* ==========================================================
   RANDOM NUMBER
========================================================== */


function randomNumber(
    min,
    max
){


    return Math.random()
    *
    (max-min)
    +
    min;


}






/* ==========================================================
   RANDOM ITEM FROM ARRAY
========================================================== */


function randomItem(array){


    return array[
        Math.floor(
            Math.random()
            *
            array.length
        )
    ];


}







/* ==========================================================
   DELAY FUNCTION
========================================================== */


function wait(milliseconds){


    return new Promise(

        resolve=>

        setTimeout(
            resolve,
            milliseconds
        )

    );


}






/* ==========================================================
   CHECK CAMERA SUPPORT
========================================================== */


function cameraSupported(){



    return !!(

        navigator
        .mediaDevices
        &&
        navigator
        .mediaDevices
        .getUserMedia

    );


}







/* ==========================================================
   CHECK AUDIO SUPPORT
========================================================== */


function audioSupported(){



    return !!(

        window
        .AudioContext
        ||
        window
        .webkitAudioContext

    );


}







/* ==========================================================
   REQUEST FULLSCREEN
========================================================== */


function requestFullscreen(){


    const element =
    document.documentElement;



    if(
        element.requestFullscreen
    )
    {


        element.requestFullscreen();


    }


}






/* ==========================================================
   EXIT FULLSCREEN
========================================================== */


function exitFullscreen(){



    if(
        document.exitFullscreen
    )
    {

        document.exitFullscreen();

    }


}







/* ==========================================================
   SAFE PLAY AUDIO
========================================================== */


async function safePlayAudio(audio){



    try{


        await audio.play();


        return true;


    }


    catch(error){


        console.log(

            "Audio waiting for user interaction"

        );


        return false;


    }


}







/* ==========================================================
   SHOW MESSAGE
========================================================== */


function showTemporaryMessage(
    message,
    duration=3000
){



    const popup =
    document.createElement(
        "div"
    );



    popup.innerHTML =
    message;



    popup.style.position =
    "fixed";



    popup.style.top =
    "20px";



    popup.style.left =
    "50%";



    popup.style.transform =
    "translateX(-50%)";



    popup.style.padding =
    "15px 25px";



    popup.style.background =
    "rgba(0,0,0,.6)";



    popup.style.color =
    "white";



    popup.style.borderRadius =
    "20px";



    popup.style.zIndex =
    "9999";



    popup.style.backdropFilter =
    "blur(10px)";



    document.body.appendChild(
        popup
    );



    setTimeout(()=>{


        popup.remove();


    },duration);



}







/* ==========================================================
   DEBUG INFO
========================================================== */


function debugInfo(){



    console.log(
`
==============================
Birthday Cake App
==============================

Device:
${isMobileDevice() ? 
"Mobile 📱":"Desktop 💻"}

Camera:
${cameraSupported() ?
"Supported ✅":"Not supported ❌"}

Audio:
${audioSupported() ?
"Supported ✅":"Not supported ❌"}

Browser:
${navigator.userAgent}

==============================
`
    );


}







/* ==========================================================
   EXPORT
========================================================== */


window.Utils={


    mobile:
    isMobileDevice,


    random:
    randomNumber,


    randomItem,


    wait,


    cameraSupported,


    audioSupported,


    fullscreen:
    requestFullscreen,


    exitFullscreen,


    playAudio:
    safePlayAudio,


    message:
    showTemporaryMessage,


    debug:
    debugInfo


};