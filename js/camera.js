/* ==========================================================
   HAPPY BIRTHDAY PROJECT

   CAMERA SYSTEM

   js/camera.js


   Features:
   - MediaPipe Face Detection
   - Camera initialization
   - Face presence tracking
   - Graceful fallback when camera denied

========================================================== */



/* ==========================================================
   STATE
========================================================== */


let faceDetector = null;

let cameraInstance = null;

let faceIsPresent = false;

let cameraActive = false;



/* ==========================================================
   START CAMERA
========================================================== */


async function startCamera(){


    const videoElement =
    document.getElementById("video");


    if(!videoElement){

        console.warn(
            "No video element found"
        );

        return;

    }



    /*
       Check if MediaPipe is available
    */


    if(
        typeof FaceDetection
        === "undefined"
    ){

        console.warn(
            "MediaPipe FaceDetection not loaded, camera disabled"
        );

        updateStatus(
            "Blow into your mic to extinguish candles 💨"
        );

        return;

    }



    try{


        /*
           Create face detector
        */


        faceDetector =
        new FaceDetection({

            locateFile:(file)=>{

                return (
                    "https://cdn.jsdelivr.net/npm/"
                    + "@mediapipe/face_detection/"
                    + file
                );

            }

        });



        faceDetector.setOptions({

            model:"short",

            minDetectionConfidence:0.5

        });



        /*
           Results callback
        */


        faceDetector.onResults(
            (results)=>{


                if(
                    results.detections
                    &&
                    results.detections.length > 0
                ){

                    faceIsPresent = true;

                }

                else{

                    faceIsPresent = false;

                }


            }
        );



        /*
           Start the camera feed
        */


        if(
            typeof Camera
            === "undefined"
        ){

            console.warn(
                "MediaPipe Camera utils not loaded"
            );

            updateStatus(
                "Blow into your mic 💨"
            );

            return;

        }



        cameraInstance =
        new Camera(

            videoElement,

            {
                onFrame: async ()=>{

                    if(faceDetector){

                        await faceDetector.send({
                            image: videoElement
                        });

                    }

                },

                width: 640,

                height: 480

            }

        );



        await cameraInstance.start();


        cameraActive = true;


        /* Make preview visible */
        const preview = document.getElementById("cameraPreview");
        if(preview){
            preview.style.display = "block";
        }


        console.log(
            "Camera started ✅"
        );


        updateStatus(
            "Camera ready — blow to extinguish candles 💨"
        );



    }

    catch(error){


        console.warn(
            "Camera access denied or failed:",
            error
        );


        updateStatus(
            "No camera — blow into your mic 💨"
        );


    }


}




/* ==========================================================
   STOP CAMERA
========================================================== */


function stopCamera(){


    cameraActive = false;


    faceIsPresent = false;


    if(cameraInstance){

        cameraInstance.stop();

        cameraInstance = null;

    }


    if(faceDetector){

        faceDetector.close();

        faceDetector = null;

    }


    console.log(
        "Camera stopped"
    );


}




/* ==========================================================
   FACE PRESENT CHECK
========================================================== */


function isFacePresent(){


    return faceIsPresent;


}




/* ==========================================================
   EXPORT
========================================================== */


window.CameraSystem = {


    start:
    startCamera,


    stop:
    stopCamera,


    facePresent:
    isFacePresent


};