export const resetFont = (function (doc, win) {    
        
        var docEl = doc.documentElement,    

        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',    

        recalc = function () {    

        var clientWidth = docEl.clientWidth;    

        if (!clientWidth) return; 
        if(clientWidth >540){
            clientWidth = 540;
        }   

        docEl.style.fontSize = (clientWidth / 10) + 'px';    

    }; 
    if (!doc.addEventListener) return;    

    win.addEventListener(resizeEvt, recalc, false);    

    doc.addEventListener('DOMContentLoaded', recalc, false);    

    })(document, window); 
export const PI = 3.1415;