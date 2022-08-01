const logos = ["fcb.png","psg.png","bym.png","jvn.png","acm.png","bvb.png","chl.png","fcl.png","mnu.png","mnc.png","real.png","atm.png","zsp.png","vlr.png","inm.png","ars.png","tth.png","olm.png","oll.png","fcv.png","byl.png","ajx.png","bnf.png","asr.png","psv.png","npl.png","dzg.png","prg.png"]

let imgLogo = document.getElementById("imgLogo")
setInterval(() => {
        imgLogo.src = "./img/"+logos[Math.floor(Math.random()*logos.length)]
 
    
}, 2000);