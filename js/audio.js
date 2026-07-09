/* ==========================================================
   HAPPY BIRTHDAY PROJECT

   AUDIO SYSTEM

   js/audio.js

   Features:
   - Birthday music
   - Microphone access
   - Blow detection
   - Volume analysis

========================================================== */


/* ==========================================================
   ELEMENTS
========================================================== */


const birthdaySong =
document.getElementById("birthdaySong");


const popSound =
new Audio("assets/dragon-studio-pop-402324.mp3");

popSound.preload = "auto";



/* ==========================================================
   AUDIO VARIABLES
========================================================== */


let audioContext;

let analyser;

let microphone;

let dataArray;


let isListening=false;


let blowCooldown=false;



/*
   Adjust this value depending
   on microphone sensitivity

   Higher = harder to trigger
   Lower = easier to trigger

*/

const BLOW_THRESHOLD = 55;



/* ==========================================================
   PLAY BIRTHDAY SONG
========================================================== */


function playBirthdaySong(){


    if(!birthdaySong)
    {
        return;
    }



    birthdaySong.volume = 0.6;



    birthdaySong.play()
    .catch(()=>{

        console.log(
            "Waiting for user interaction"
        );

    });


}






/* ==========================================================
   START MICROPHONE
========================================================== */


async function startMicrophone(){


    try{


        const stream =
        await navigator.mediaDevices
        .getUserMedia({

            audio:true

        });



        audioContext =
        new AudioContext();



        analyser =
        audioContext.createAnalyser();



        analyser.fftSize=256;



        microphone =
        audioContext
        .createMediaStreamSource(stream);



        microphone.connect(
            analyser
        );



        dataArray =
        new Uint8Array(
            analyser.frequencyBinCount
        );



        isListening=true;



        detectBlow();



        console.log(
            "Microphone started"
        );


    }

    catch(error){


        console.error(
            "Microphone permission denied",
            error
        );


        updateStatus(
            "Please allow microphone access 🎤"
        );


    }


}






/* ==========================================================
   CALCULATE SOUND LEVEL
========================================================== */


function getVolume(){


    analyser.getByteFrequencyData(
        dataArray
    );


    let sum=0;



    for(let i=0;i<dataArray.length;i++)
    {

        sum += dataArray[i];

    }



    return sum/dataArray.length;


}







/* ==========================================================
   BLOW DETECTION
========================================================== */


function detectBlow(){



    if(!isListening)
    {
        return;
    }




    const volume =
    getVolume();





    if(
        volume > BLOW_THRESHOLD
        &&
        !blowCooldown
    ){

        handleBlow();


    }



    requestAnimationFrame(
        detectBlow
    );



}






/* ==========================================================
   WHEN BLOW DETECTED
========================================================== */


function handleBlow(){


    console.log(
        "Blow detected 💨"
    );



    blowCooldown=true;



    /*
       Extinguish candle
       from cake engine

    */


    if(window.Cake)
    {

        const candleGone =
        Cake.blow();



        if(candleGone)
        {

            updateStatus(
                "Nice blow! 💨"
            );


            /*
               Play pop sound
               for each candle
            */


            if(window.AudioSystem)
            {

                AudioSystem.playPop();

            }

        }


    }




    setTimeout(()=>{


        blowCooldown=false;


    },1500);



}





/* ==========================================================
   STATUS HELPER

========================================================== */


function updateStatus(message){


    const status =
    document.getElementById(
        "status"
    );



    if(status)
    {

        status.innerHTML =
        message;

    }


}







/* ==========================================================
   STOP AUDIO
========================================================== */


function stopMicrophone(){


    isListening=false;



    if(audioContext)
    {

        audioContext.close();

    }


}





/* ==========================================================
   PLAY POP SOUND
========================================================== */


function playPopSound(){


    const pop =
    popSound.cloneNode();


    pop.volume = 0.8;


    pop.play()
    .catch(()=>{

        console.log(
            "Pop sound blocked"
        );

    });


}





/* ==========================================================
   EXPORT
========================================================== */


window.AudioSystem={


    play:
    playBirthdaySong,


    startMic:
    startMicrophone,


    stopMic:
    stopMicrophone,


    playPop:
    playPopSound


};