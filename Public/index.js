const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circlemousefollower(xscale,yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`;
    })
}

function firstpageanime() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            delay:-1,
            duration: 2,
            stagger: .2
        })
        .from(
            "#herofooter",{
                y:-10,
                opacity:0,
                duration:1.5,
                delay:-1,
                ease:Expo.easeinout
            })
        
}
circlemousefollower();
firstpageanime();
// document.querySelectorAll(".elem").forEach(function(elem){
//     var rotate=0;
//     var diffrot=0;
//     elem.addEventListener("mouseleave",function(dets){
//         gsap.to(elem.querySelector("img"),{
//             opacity: 0,
//             ease: Power3,
//         });

//     });

//     elem.addEventListener("mousemove",function(dets){
//         var diff = dets.clientY - elem.getBoundingClientRect().top;
//         diffrot=dets.clientX - rotate;
//         rotate=dtes.clientX;
//         gsap.to(elem.querySelector("img"),{
//             opacity: 1,
//             ease: Power3,
//             top: diff,
//             left: dets.clientX,
//             rotate:gsap.utils.clamp(-20,20,diffrot*0.6)
//         });

//     });
// });


function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    document.getElementById('clock').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();


function aboutpageanime() {
    gsap.timeline()
        .from("#imageabout", { 
            x: "-100%", 
            opacity: 0, 
            duration: 1.5,
            ease: "power3.out"
        }, 0)  // Start at the same time (time offset = 0)
        .from("#textabout", { 
            x: "100%", 
            opacity: 0, 
            duration: 1.5,
            ease: "power3.out"
        }, 0); // Start at the same time (time offset = 0)
}
aboutpageanime();