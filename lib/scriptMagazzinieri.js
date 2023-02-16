const IDMAGAZZINIERE = 0;
const NOMEMAGAZZINIERE = 1;
const MATTINAMAGAZZINIERE = 2;
const POMERIGGIOMAGAZZINIERE = 3;
const TOTALEMAGAZZINIERE = 4;
const NOTEMAGAZZINIERE = 5

// Array per popolare il sito, DATABASE?
var arrayDatiMagazzinieri = [
    //ID |         NOME        |   MATTINA    |   POMERIGGIO   |    TOT  |  NOTE 
    ['1',  "SANCHEZ MARKUS",         "",             "",           "",      ""], 
    ['2',  "PAJARIN EUGENIO",        "",             "",           "",      ""],
    ['3',  "GASPERETTI MATTiA",      "",             "",           "",      ""],
    ['4',  "LOPEZ ISAAC",            "",             "",           "",      ""],
    ['5',  "AKAN KODJO",             "",             "",           "",      ""],
    ['6',  "IBUBE HOPEOBOSA",       "",             "",           "",      ""],
    ['7',  "CHABBAKI AYMANE",        "",             "",           "",      ""]
];

// Funzione che prende la data corrente e la mostra
function getDateLavoro(){
    var d = new Date();
    dataGiornata = formatDate(d);
    document.getElementById("dataGiornataMagazzinieri").innerText = "PRESENZE: " + dataGiornata;
}

// Funzione che generara dinamicamente la tabella in base ai dati salvati nell'array DatiMagazzinieri
function tableCreate() {
    let tableData = document.getElementById("tableMagazzinieri"); 
    // Header
    let table = `<table class="table table-striped table-dark table-hover" id = "myTableMagaz" style="width:100% !important; text-aling: center;">
        <thead>
            <tr>
            <th scope="col" style='text-align: center;'>ID</th>
            <th scope="col" style='text-align: center;'>MAGAZZINIERE</th>
            <th scope="col" colspan="2" style='text-align: center;'>MATTINA</th>
            <th scope="col" colspan="2" style='text-align: center;'>POMERIGGIO</th>
            <th scope="col" style='text-align: center;'>TOTALE</th>
            <th scope="col" style='text-align: center';>NOTE</th>
            <th scope="col" style='text-align: center;'>ASSENZA</th>
            <th scope="col" colspan="2" style='text-align: center;'>OPERAZIONI</th>
        </tr>
    </thead>
    <tbody><td></td><td></td><td style='text-align: center; font-weight: bold;'>DALLE: </td><td style='text-align: center; font-weight: bold;'>FINO: </td><td style='text-align: center; font-weight: bold;'>DALLE: </td style='text-align: center; font-weight: bold;'><td style='text-align: center; font-weight: bold;'>FINO:</td><td></td><td></td><td></td>`;
    // Body della tabella
    for(var i=0; i<arrayDatiMagazzinieri.length; i++){
        idM = i;
        var nomeM = arrayDatiMagazzinieri[i][NOMEMAGAZZINIERE];
        var noteM = arrayDatiMagazzinieri[i][NOTEMAGAZZINIERE];

        var idSubmit = "submitMagazziniere"+ idM;
        var idModifica = "modificaMagazziniere"+ idM;

        var chiamataModifica = "modificaDatiMagazziniere(" + idM + ")";
        var chiamataSubmit = "salvaDatiMagazziniere(" + idM + ")";
        var chiamataCheckBox = "checkBoxAssenzaMagazziniere(" + idM + ")";

        var idNome = "textMagazziniereNome" + idM;
        var idMattinaInizio = "textMagazziniereMattinaInizio" + idM;
        var idMattinaFine = "textMagazziniereMattinaFine" + idM;
        var idPomeriggioInizio = "textMagazzinierePomeriggioInizio" + idM;
        var idPomeriggioFine = "textMagazzinierePomeriggioFine" + idM;
        var idTotale = "textMagazziniereTotale" + idM;
        var idNote = "textMagazziniereNote" + idM;
        var idCheckBox = "checkboxMagazziniereAssenza" + idM;

        table = table + "<tr>";
        table += "<form class='form-inline'>";
        table += "<th scope='row'>"+ idM +"</th>";
        table += "<td style='text-align: center;'>" + "<input type='text' class='input-group-text' size='30px' value='" + nomeM + "' id='" + idNome + "' disabled ></td>";
        table += "<td style='text-align: center;'>" + "<input type='time' format='HH:mm' value='00:00' id='" + idMattinaInizio + "' min='05:' max='13:'></td>";
        table += "<td style='text-align: center;'>" + "<input type='time' format='HH:mm' value='00:00' id='" + idMattinaFine + "' min='05:' max='13:'></td>";
        table += "<td style='text-align: center;'>" + "<input type='time' format='HH:mm' value='00:00' id='" + idPomeriggioInizio + "' min='13:' max='20:' style='text-align: 'center';'></td>";
        table += "<td style='text-align: center;'>" + "<input type='time' format='HH:mm' value='00:00' id='" + idPomeriggioFine + "' min='13:' max='20:'></td>";
        table += "<td style='text-align: center;'>" + "<input type='time' format='HH:mm' value='00:00' id='" + idTotale + "' style='text-align: center;' disabled ></td>";
        table += "<td style='text-align: center;'>" + "<textarea class='form-control' id='" + idNote + "' rows='2' value='" + noteM + "'></textarea></td>";
        table += "<td style='text-align: center; margin: 0 auto;'>" + "<input style='margin: 0 auto;' class='form-check-input' type='checkbox' value='true' id='" + idCheckBox + "' onclick='" + chiamataCheckBox + "'></td>";

        table += "<td>" + "<button type='submit' class='btn btn-primary mb-2' id='" + idSubmit + "' onclick='" + chiamataSubmit + "'> SALVA</button>"
        table += "<td>" + "<button type='submit' class='btn btn-primary mb-2' id='" + idModifica + "' onclick='" + chiamataModifica + "'> MODIFICA</button>"
        table += "</form></tr>";
    }
    table = table + `</tbody></table>`;
    tableData.innerHTML = table;
}

// Funzione che salva i dati inseriti
function salvaDatiMagazziniere(id){
    var inseritoMattinaInizio = false;
    var inseritoMattinaFine = false;
    var inseritoPomeriggioInizio = false;
    var inseritoPomeriggioFine = false;

    // TO DO: SE PREMO PIU DI UNA VOLTA SALVA MI SOMMA PIU VOLTE L'ORARIO, SISTEMARE CON DISABLE E PULSANTE MODIFICA (DA SISTEMARE ANCHE LA FUNCTION MODIFICA)
    switch (document.getElementById("textMagazzinierePomeriggioFine" + id).value != '00:00') {
        case true:
            if(document.getElementById("textMagazzinierePomeriggioFine" + id).value < '20:00' && document.getElementById("textMagazzinierePomeriggioFine" + id).value > '13:00'){
                //Disattivo l'input text POMERIGGIO FINE
                document.getElementById("textMagazzinierePomeriggioFine" + id).disabled = true;
                inseritoPomeriggioFine = true;
            }else{
                document.getElementById("alertWarningMagazzinieri").style = 'display: block';
                document.getElementById("nomeMagazziniereWarning").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE] + '</strong>';
                document.getElementById("messaggioWarning").innerHTML = 'L\'orario di <b>FINE</b> lavoro <b>POMERIGGIO</b> deve essere compreso tra <h4>13:00 - 20:00</h4>';
                inseritoPomeriggioFine = false;   
                document.getElementById("textMagazzinierePomeriggioFine" + id).disabled = false;        
            }
            break;

        case false:
            document.getElementById("alertDangerMagazzinieri").style = 'display: block'
            document.getElementById("nomeMagazziniereDanger").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE] + '</strong>';
            document.getElementById("messaggioErrore").innerHTML = 'Inserire orario <b>FINE POMERIGGIO</b>!';
            inseritoPomeriggioFine = false;
            break;
    }

    switch (document.getElementById("textMagazzinierePomeriggioInizio" + id).value != '00:00') {
        case true:
            if(document.getElementById("textMagazzinierePomeriggioInizio" + id).value < '20:00' && document.getElementById("textMagazzinierePomeriggioInizio" + id).value > '13:00'){
                //Disattivo l'input text POMNERIGGIO INIZIO
                document.getElementById("textMagazzinierePomeriggioInizio" + id).disabled = true;
                inseritoPomeriggioInizio = true;
            }else{
                document.getElementById("alertWarningMagazzinieri").style = 'display: block';
                document.getElementById("nomeMagazziniereWarning").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE] + '</strong>';
                document.getElementById("messaggioWarning").innerHTML = 'L\'orario di <b>INIZIO</b> lavoro <b>POMERIGGIO</b> deve essere compreso tra <h4>13:00 - 20:00</h4>';
                inseritoPomeriggioInizio = false;
                document.getElementById("textMagazzinierePomeriggioInizio" + id).disabled = false;
            }
            break;
            
        case false:
            document.getElementById("alertDangerMagazzinieri").style = 'display: block';
            document.getElementById("nomeMagazziniereDanger").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE] + '</strong>';
            document.getElementById("messaggioErrore").innerHTML = 'Inserire orario <b>INIZIO POMERIGGIO</b>!';
            inseritoPomeriggioInizio = false;
            break;
    }

    switch (document.getElementById("textMagazziniereMattinaFine" + id).value != '00:00') {
        case true:
            if(document.getElementById("textMagazziniereMattinaFine" + id).value < '13:00' && document.getElementById("textMagazziniereMattinaFine" + id).value > '05:00'){
                //Disattivo l'input text MATTINA FINE
                document.getElementById("textMagazziniereMattinaFine" + id).disabled = true;
                inseritoMattinaFine = true;
            }else{
                document.getElementById("alertWarningMagazzinieri").style = 'display: block';
                document.getElementById("nomeMagazziniereWarning").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE]  + '</strong>';
                document.getElementById("messaggioWarning").innerHTML = 'L\'orario di <b>FINE</b> lavoro <b>MATTINA</b> deve essere compreso tra <h4>05:00 - 13:00</h4>';
                inseritoMattinaFine = false;
                document.getElementById("textMagazziniereMattinaFine" + id).disabled = false;
            }
            break;

        case false:
            document.getElementById("alertDangerMagazzinieri").style = 'display: block';
            document.getElementById("nomeMagazziniereDanger").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE] + '</strong>';
            document.getElementById("messaggioErrore").innerHTML = 'Inserire orario <b>FINE MATTINA</b>!';
            inseritoMattinaFine = false;
            break;
    }
    
    switch (document.getElementById("textMagazziniereMattinaInizio" + id).value != '00:00') {
        case true:
            if(document.getElementById("textMagazziniereMattinaInizio" + id).value < '13:00' && document.getElementById("textMagazziniereMattinaInizio" + id).value > '05:00'){
                //Disattivo l'input text MATTINA INIZIO
                document.getElementById("textMagazziniereMattinaInizio" + id).disabled = true;
                inseritoMattinaInizio = true;
            }else{
                document.getElementById("alertWarningMagazzinieri").style = 'display: block';
                document.getElementById("nomeMagazziniereWarning").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE] + '</strong>';
                document.getElementById("messaggioWarning").innerHTML = 'L\'orario di <b>INIZIO</b> lavoro <b>MATTINA</b> deve essere compreso tra <h4>05:00 - 13:00</h4>';
                inseritoMattinaInizio = false;
                document.getElementById("textMagazziniereMattinaInizio" + id).disabled = false;
            }
            break;

        case false:
            document.getElementById("alertDangerMagazzinieri").style = 'display: block';
            document.getElementById("nomeMagazziniereDanger").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE] + '</strong>';
            document.getElementById("messaggioErrore").innerHTML = 'Inserire orario <b>INIZIO MATTINA<b>!';
            inseritoMattinaInizio = false;
            break;
    }

    if(inseritoMattinaInizio && inseritoMattinaFine){
        var totMattina = subTimes(document.getElementById("textMagazziniereMattinaInizio" + id).value.split(':'), document.getElementById("textMagazziniereMattinaFine" + id).value.split(':'));
        document.getElementById("textMagazziniereTotale" + id).value = addTimes(totMattina.split(':'), '00:00'.split(':'));

        arrayDatiMagazzinieri[id][MATTINAMAGAZZINIERE] = totMattina;

        inseritoMattinaInizio = false;
        inseritoMattinaFine = false;
        
        if(inseritoPomeriggioInizio && inseritoPomeriggioFine){
            var totPomeriggio = subTimes(document.getElementById("textMagazzinierePomeriggioInizio" + id).value.split(':'), document.getElementById("textMagazzinierePomeriggioFine" + id).value.split(':'));
            var tmpSommaTempi = addTimes(totPomeriggio.split(':'), document.getElementById("textMagazziniereTotale" + id).value.split(':'));
            document.getElementById("textMagazziniereTotale" + id).value = tmpSommaTempi;

            arrayDatiMagazzinieri[id][POMERIGGIOMAGAZZINIERE] = totPomeriggio;

            inseritoPomeriggioInizio = false;
            inseritoPomeriggioFine = false;
            
            document.getElementById("alertSuccessMagazzinieri").style = 'display: block';
            document.getElementById("nomeMagazziniereSuccess").innerHTML = '<strong>' + arrayDatiMagazzinieri[id][NOMEMAGAZZINIERE] + '</strong>';
            document.getElementById("messaggioSuccess").innerHTML = '<strong>Orario salvato correttamente!</strong>'; 
        }
    }

    arrayDatiMagazzinieri[id][NOTEMAGAZZINIERE] = document.getElementById('textMagazziniereNote' + id).value;
}

// Funzione per segnare assenza
function checkBoxAssenzaMagazziniere(id){
    if(document.getElementById("checkboxMagazziniereAssenza" + id).value == 'true'){
        document.getElementById("textMagazziniereMattinaInizio" + id).disabled = true;
        document.getElementById("textMagazziniereMattinaInizio" + id).value = '';

        document.getElementById("textMagazziniereMattinaFine" + id).disabled = true;
        document.getElementById("textMagazziniereMattinaFine" + id).value = '';

        document.getElementById("textMagazzinierePomeriggioInizio" + id).disabled = true;
        document.getElementById("textMagazzinierePomeriggioInizio" + id).value = '';

        document.getElementById("textMagazzinierePomeriggioFine" + id).disabled = true;
        document.getElementById("textMagazzinierePomeriggioFine" + id).value = '';

        document.getElementById("textMagazziniereTotale" + id).value = '';

        document.getElementById("textMagazziniereNote" + id).disabled = true;
        document.getElementById("textMagazziniereNote" + id).value = "ASSENTE";
        
        arrayDatiMagazzinieri[id][NOTEMAGAZZINIERE] = "ASSENTE";

        document.getElementById("checkboxMagazziniereAssenza" + id).value = "false";

        document.getElementById("submitMagazziniere" + id).disabled = true;
        document.getElementById("modificaMagazziniere" + id).disabled = true;
    }else{
        document.getElementById("textMagazziniereMattinaInizio" + id).disabled = false;

        document.getElementById("textMagazziniereMattinaFine" + id).disabled = false;

        document.getElementById("textMagazzinierePomeriggioInizio" + id).disabled = false;

        document.getElementById("textMagazzinierePomeriggioFine" + id).disabled = false;

        document.getElementById("textMagazziniereNote" + id).disabled = false;
        document.getElementById("textMagazziniereNote" + id).value = '';
        
        document.getElementById("checkboxMagazziniereAssenza" + id).value = "true";
        document.getElementById("submitMagazziniere" + id).disabled = false;
        document.getElementById("modificaMagazziniere" + id).disabled = false;
    }
}

function modificaDatiMagazziniere(id){
    document.getElementById("textMagazziniereMattinaInizio" + id).disabled = false;
    document.getElementById("textMagazziniereMattinaFine" + id).disabled = false;
    document.getElementById("textMagazzinierePomeriggioInizio" + id).disabled = false;
    document.getElementById("textMagazzinierePomeriggioFine" + id).disabled = false;
    document.getElementById("textMagazziniereNote" + id).disabled = false;
    document.getElementById("checkboxMagazziniereAssenza" + id).checked = false;
    document.getElementById("textMagazziniereNote" + id).value = arrayDatiMagazzinieri[id][NOTEMAGAZZINIERE];
}

function generaPresenzeMagazzinieri(){
    var dataGiornata = document.getElementById("dataGiornataMagazzinieri").innerHTML.split(" ");
    var createHTMLTalble = "<div>";
    createHTMLTalble += "<h2>PRESENZE MAGAZZINIERI: " + dataGiornata[1] + "</h2>";
    createHTMLTalble += "<table class='table table-striped'>";
    createHTMLTalble += "<thead><tr>";
    createHTMLTalble += "<th>ID</th><th>NOMINATIVO</th><th>TOTALE ORE</th><th>NOTE</th>";
    createHTMLTalble += "</tr></thead>";
    createHTMLTalble += "<tbody>"
    for(var i=0; i<arrayDatiMagazzinieri.length;i++){
        createHTMLTalble += "<tr>";
        createHTMLTalble += "<td>"+ arrayDatiMagazzinieri[i][IDMAGAZZINIERE] + "</td><td>"+ arrayDatiMagazzinieri[i][NOMEMAGAZZINIERE] + "</td><td>" + document.getElementById("textMagazziniereTotale" + i).value + "</td>";
        if(arrayDatiMagazzinieri[i][NOTEMAGAZZINIERE] == ''){
            createHTMLTalble += "<td> - </td>";
        }else{
            createHTMLTalble += "<td>" + arrayDatiMagazzinieri[i][NOTEMAGAZZINIERE] + "</td>";
        }
    }
    createHTMLTalble += "</tr>";
    createHTMLTalble += "</tbody></table></div>";

    document.getElementById("modalMagazzinieriTitolo").innerHTML = "<strong>" + dataGiornata[1] + "</strong>";
    document.getElementById("datiMagazzinieri").innerHTML = createHTMLTalble;
}

// Funzione che genera il PDF con i dati dei magazzinieri
function generaPDF(){
    var dataGiornata = document.getElementById("dataGiornataMagazzinieri").innerHTML.split(" ");
    var doc = new jsPDF({
        orientation: 'l', // landscape
        unit: 'pt', // points, pixels won't work properly
        format: ['850', '850'] // set needed dimensions for any element
    });

    doc.setFont("helvetica");
    doc.setFontSize(1);
    
    var source = window.document.getElementById("datiMagazzinieri");
    doc.fromHTML(source, 5, 0, null, null, 'center');
    doc.save("PresenzeMagazzinieri-" + dataGiornata[1]);

    var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close();
}

//Funzione che prende la data odierna, la parsa e la restituisce
function formatDate(date) {
    var d = new Date(date);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate(); 
    var year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

// Funzione che sottrae due date
function subTimes(t0, t1) { return timeFromMins(timeToMins(t1) - timeToMins(t0)); }

// Funzione che somma due date
function addTimes(t0, t1) { return timeFromMins(timeToMins(t0) + timeToMins(t1)); }

// Convert a time in hh:mm format to minutes
function timeToMins(time) { return time[0]*60 + +time[1]; }

// Funzione che converte la data in formato HH:mm, restituisce la data in un range 00-24
function timeFromMins(mins) {
    function z(n){return (n<10? '0':'') + n;}
    var h = (mins/60 |0) % 24;
    var m = mins % 60;
    return z(h) + ':' + z(m);
}

// Funzione che rimuove l'alert di successo o errore di aggiunta
function dismissDangerAlert(){
    document.getElementById("alertDangerMagazzinieri").style = 'display: none';
}
function dismissSuccessAlert(){
    document.getElementById("alertSuccessMagazzinieri").style = 'display: none';
}
function dismissWarningAlert(){
    document.getElementById("alertWarningMagazzinieri").style = 'display: none';
}