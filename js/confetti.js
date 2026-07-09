/* ==========================================================
   HAPPY BIRTHDAY PROJECT

   CELEBRATION SYSTEM

   js/confetti.js


   Features:
   - Confetti burst (canvas-confetti library)
   - Pop sound playback
   - Transition to ending screen
   - Ending animation

========================================================== */



/* ==========================================================
   CONFETTI BURST
========================================================== */


function fireConfetti(){


    if(typeof confetti === "undefined"){

        console.warn(
            "canvas-confetti library not loaded"
        );

        return;

    }



    /*
       First burst — center
    */


    confetti({

        particleCount: 150,

        spread: 100,

        origin: {
            y: 0.6
        },

        colors: [
            "#ff69b4",
            "#ff4081",
            "#e91e63",
            "#f48fb1",
            "#ffd700",
            "#ff6f00"
        ]

    });



    /*
       Second burst — left side
    */


    setTimeout(()=>{


        confetti({

            particleCount: 80,

            angle: 60,

            spread: 70,

            origin: {
                x: 0,
                y: 0.65
            },

            colors: [
                "#2196f3",
                "#4caf50",
                "#ff9800",
                "#e91e63"
            ]

        });


    }, 400);



    /*
       Third burst — right side
    */


    setTimeout(()=>{


        confetti({

            particleCount: 80,

            angle: 120,

            spread: 70,

            origin: {
                x: 1,
                y: 0.65
            },

            colors: [
                "#9c27b0",
                "#00bcd4",
                "#ffeb3b",
                "#ff5722"
            ]

        });


    }, 700);



    /*
       Continuous celebration
    */


    let burstCount = 0;

    const maxBursts = 6;


    const interval =
    setInterval(()=>{


        burstCount++;


        if(burstCount >= maxBursts){

            clearInterval(interval);

            return;

        }


        confetti({

            particleCount: 50,

            spread: 120,

            startVelocity: 35,

            origin: {
                x: Math.random(),
                y: Math.random() * 0.4
            }

        });


    }, 800);


}




/* ==========================================================
   START CELEBRATION
========================================================== */


function startCelebration(){


    console.log(
        "🎉 All candles blown out! Celebration!"
    );



    /*
       Play pop sound
    */


    if(window.AudioSystem){

        AudioSystem.playPop();

    }



    /*
       Fire confetti
    */


    fireConfetti();



    /*
       Sparkle burst
    */


    if(window.AnimationSystem){

        AnimationSystem.sparkle();

    }



    /*
       Update status
    */


    if(typeof updateStatus === "function"){

        updateStatus(
            "🎉 Happy Birthday! 🎉"
        );

    }



    /*
       Show ending section after delay
    */


    setTimeout(()=>{


        /*
           Hide cake section
        */


        const cakeSection =
        document.getElementById(
            "cakeSection"
        );


        if(cakeSection){

            cakeSection.classList.add(
                "fadeOut"
            );


            setTimeout(()=>{

                cakeSection.style.display =
                "none";

            }, 800);

        }



        /*
           Show ending section
        */


        setTimeout(()=>{


            const endingSection =
            document.getElementById(
                "endingSection"
            );


            if(endingSection){

                endingSection.classList.remove(
                    "hidden"
                );

            }



            /*
               Animate ending text
            */


            if(window.AnimationSystem){

                AnimationSystem.ending();

            }



            /*
               One more confetti burst
               for the finale
            */


            fireConfetti();


        }, 1000);



    }, 3500);


}




/* ==========================================================
   EXPORT
========================================================== */


window.Celebration = {


    start:
    startCelebration


};