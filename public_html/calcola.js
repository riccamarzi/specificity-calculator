(function () {
    //qua sotto se voglio cliccare sul pulsante per calcolare, commenta l'ultima riga se lo vuoi
    //document.getElementsByTagName('button')[0].addEventListener("click", calcola);
    
    //creo una variabile di partenza da 0 per ogni span 
    var partia = 0, partib = 0, partic = 0, partid = 0;
    function calcola() {
        var text = document.getElementsByTagName('textarea')[0].value;
        var testo = [], check = 0;
        var k = 0, j = 0, inizio = 0;
        var regEx = /[a-z]/;
        var regNum = /[0-9]/;
        //qui sotto separo la stringa a ogni spazio, >, +, ~, virgola usati nei selettori css e le parole isolate le metto in un array
        while(k<text.length) {
            if(text[k] == '\u0020' || k==text.length-1 || text[k] == '>' || text[k] == '+' || text[k] == '~' || text[k] == ',') {
                testo[j] = text.slice(inizio, k+1);
                inizio = k+1;  
                j++;
            }
            k++;
        }
        
        var a=0, b=0, c=0, d=0, controllapunti = 0;

        //se scrivo solo un asterisco saranno tutti 0
         if(text == '*') {
            a = 0;
            b = 0;
            c = 0;
            d = 0;
            check = 1;
        }
        //se scrivo style="" a varrà 1 e rilascio una variabile di controllo senza neanche controllare il resto
        if(text == 'style=""' || text == 'style = ""' || text == 'style=" "' || text == 'style="' || text == 'style = "' || text == 'style ="' || text == 'style =""') {
            a=1;
            check = 1;
        }
        
        //se la variabile dell'inline non risulta 1 controllo cosa ho scritto
        var contaid = 0, contaclassi=0, contapselem = 0, contapsclassi = 0, contaelem = 0;
        if(check != 1) {
            for(var z = 0; z<testo.length; z++) {
                for(var i=0; i<testo[z].length; i++) {      
                    //se digito solo # non viene contato
                    if(testo[z][i] == '#') {
                        //controllo cosa c'è prima e dopo
                        if(regEx.test(testo[z][i+1]) && (regEx.test(testo[z][i-1]) || regNum.test(testo[z][i-1])  || testo[z][i-1] == '*'))
                            contaid++;
                    } 
                    //se metto il . o la [ da soli non li conta
                    if((testo[z][i] == '.' || testo[z][i] == '[')) {
                        //se dopo non ho messo una lettera non va bene e anche prima
                        if(regEx.test(testo[z][i+1]) && (regEx.test(testo[z][i-1]) || regNum.test(testo[z][i-1])  || testo[z][i-1] == '*'))
                            contaclassi++;
                    }
                    //se metto i :: da soli non conta neanche questi, ovviamente la lunghezza dell'entrata  dovrà essere strettamente > di 2
                    if(testo[z][i] == ':' && testo[z][i+1] == ':' && testo[z].length>2) {
                        if(regEx.test(testo[z][i+2]) && (regEx.test(testo[z][i-1]) || regNum.test(testo[z][i-1]) || testo[z][i-1] == '*')) {
                            contapselem++;
                            controllapunti = 1;
                        }
                    }
                    //se ho scritto solo :: assegno una variabile di controllo
                    else if(testo[z][i] == ':' && testo[z][i+1] == ':' && !regEx.test(testo[z][i+2])) {
                        controllapunti = 1;
                    }
                    //se prima risulta che ho messo esattamente :: non entra nemmeno in questo if
                    if(controllapunti != 1) {
                        if(testo[z][i] == ':') {
                            if(regEx.test(testo[z][i+1]) && (regEx.test(testo[z][i-1]) || regNum.test(testo[z][i-1]) || testo[z][i-1] == '*'))
                                contapsclassi++;
                        } 
                    }
                }
                //se ho digitato qualcosa esclusivamente dalla a alla z come stabilito dalla regExp lo conta come un tag
                if(regEx.test(testo[z][0]))
                    contaelem++;
            }
        }

        if(contaid>0) {
            b=contaid;
        } 
        if(contaclassi>0 || contapsclassi>0) {
            c = contaclassi+contapsclassi;
        }
        if(contapselem>0 || contaelem>0) {
            d = contapselem+contaelem;
        }
        //svuoto l'array
        testo = [];
    
    function animazione(id, inizio, fine, durata) {
        var span = document.getElementById(id);
        var range = fine - inizio;
        // Do un valore minimo al timer
        var minTimer = 50;
        // calcolo il tempo per far vedere tutte i numeri
        var stepTime = Math.abs(Math.floor(durata / range));

        // non scendo mai sotto minTimer
        stepTime = Math.max(stepTime, minTimer);

        // prendo il tempo attuale
        var startTime = new Date().getTime();
        //calcolo la fine desiderata
        var endTime = startTime + durata;
        var timer;

        function run() {
            var now = new Date().getTime();
            //calcolo quanti numeri mi mancano per scriverli tutti
            var remaining = Math.max((endTime - now) / durata, 0);
            var value = Math.round(fine - (remaining * range));
            //scrivo il numero nello span
            span.innerHTML = value;
            //se ho scritto tutti i numeri mi fermo
            if (value == fine) {
                clearInterval(timer);
            }
        }  
        timer = setInterval(run, stepTime);
        run();
        //ogni span dovrà avere il suo inizio differente, quindi vedendo che id ho passato alla funzione assegno il nuovo inizio per ognuno
        if(id == "a") 
            partia = fine;
        else if(id == "b")
            partib = fine;
        else if(id == "c")
            partic = fine;
        else if(id == "d")
            partid = fine;
    }
    //invoco l'animazione per ogni span che mostrerà il numero passandogli l'id, l'inizio, il numero finale che sarebbe a,b,c o d e la durata totale dell'animazione(300 ms)
    animazione("a", partia, a, 300);
    animazione("b", partib, b, 300);
    animazione("c", partic, c, 300);
    animazione("d", partid, d, 300);
    }  
    
    //con questo qua sotto non serve che clicco il bottone
    setInterval(calcola, 1000);
}) ();