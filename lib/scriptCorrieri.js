const IDCORRIERE = 0;
const GIROCORRIERE = 1;
const NOMECORRIERE = 2;
const TARGACORRIERE = 3;
const NOTECORRIERE = 4;
const EXTRACORRIERE = 5

var arrayDatiCorrieri = [
    //ID |    GIRO     |         NOME        |     TARGA   | NOTE | EXTRA
    ['01',   "VOL01",       "GASPERETTI",   "FH293HJ",  "",             ""], 
    ['02',   "VOL02",       "BORDEJANU",    "FM574KL",  "",             ""],
    ['03',   "VOL03",       "ELAADAOUI",    "FV049CD",  "",             ""],
    ['04',   "01",          "RMAL",         "GC690HR",  "",             ""],
    ['05',   "01A",         "OIHBI N.",     "FH252HJ",  "",             ""],
    ['06',    "01B",        "SENDREA",      "FS990RY",  "",             ""],
    ['07',    "03",         "JELBAOUI",     "GA399CH",  "",             ""],
    ['08',    "04",         "ZEMAMA",       "GA399CH",  "",             ""],
    ['09',    "04A",        "TABABI AH.",   "FV484ED",  "",             ""],
    ['10',    "05",         "SELLOUM J.",   "FJ621ZC",  "",             ""],
    ['11',    "05A",        "VAMES",        "GC802DZ",  "",             ""],
    ['12',    "05B",        "ARINZE",       "FG133LN",  "",             ""],
    ['13',    "06",         "MAHMOOD",      "FW448GW",  "",             ""],
    ['14',    "06A",        "BENSHERIER",   "FF530VD",  "",             ""],
    ['15',    "07",         "LEKBIBA",      "GB845CD",  "",             ""],
    ['16',    "08",         "HASMOUI E.",   "GC961DZ",  "",             ""],
    ['17',    "FX2 | 9",    "KUKHTA",       "GC081RN",  "",             ""],
    ['18',    "10",         "PANE",         "FH290HJ",  "",             ""],
    ['19',    "12",         "EL MAJDOUB",   "FG102LN",  "",             ""],
    ['20',    "14",         "HADANE",       "FH266HJ",  "",             ""],
    ['21',    "15",         "BENCHELH",     "FG143LN",  "",             ""],
    ['22',    "16",         "CHABBAKI",     "FF800FR",  "",             ""],
    ['23',    "J01",        "OUESLATI",     "FF531VD",  "",             ""],
    ['24',    "J04",        "DRIDI",        "FV051ED",  "",             ""],
    ['25',    "J05",        "BERTORLDI",    "GC698YL",  "",             ""],
    ['26',    "FX1",        "BON",          "FN847ZH",  "",             ""],
    ['27',    "22",         "PETREANU",     "GC680CH",  "",             ""],
    ['28',    "23",         "LIMAMI",       "FY6255D",  "",             ""],
    ['29',    "J02",        "TABABI A.",    "GC660DZ",  "",             ""],
    ['30',    "",           "HASMAOU S.",   "",         "MALATTIA",     ""], 
    ['31',    "",           "AJANA",        "",         "",             ""], 
    ['32',    "",           "SELLOUM M.",   "",         "PERMESSO",     ""]
];

function dismissAlert(){
    document.getElementById("alertDangerCorriere").style = 'display: none';
    document.getElementById("alertSuccessCorriere").style = 'display: none';
}

//Funzione che prende la data odierna e la parsa e la restituisce
function formatDate(date) {
    var d = new Date(date);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate(); 
    var year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

// Funzione che prende la data corrente e popola il DOM con la data parsata
function getDateLavoro(){
    var d = new Date();
    dataGiornata = formatDate(d);
    document.getElementById("dataGiornataCorrieri").innerHTML = "PRESENZE: " + dataGiornata;
}

function tableCreate() {
    let tableData = document.getElementById("tableCorrieri"); 
    //set header of table
    let table = `
        <table class="table table-striped table-dark" id = "myTable" style="min-width:75%; text-align:center;">
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">CORRIERE</th>
            <th scope="col">GIRO</th>
            <th scope="col">TARGA</th>
            <th scope="col">NOTE</th>
            <th scope="col">EXTRA</th>
            <th scope="col" colspan="2">OPERAZIONI</th>
            </tr>
        </thead>
        <tbody>`;

    for(var i=0; i<arrayDatiCorrieri.length; i++){
        idC = i;
        nomeC = arrayDatiCorrieri[i][NOMECORRIERE];
        giroC = arrayDatiCorrieri[i][GIROCORRIERE];
        targaC = arrayDatiCorrieri[i][TARGACORRIERE];
        noteC = arrayDatiCorrieri[i][NOTECORRIERE];
        extraC = arrayDatiCorrieri[i][EXTRACORRIERE];

        var idSubmit = "submitCorrire"+ idC;
        var idModifica = "modificaCorrire"+ idC;

        var chiamataModifica = "modificaDatiCorriere(" + idC + ")";
        var chiamataSubmit = "salvaDatiCorriere(" + idC + ")";

        var idNome = "textCorrireNome" + idC;
        var idGiro = "textCorrireGiro" + idC;
        var idTarga = "textCorrireTarga" + idC;
        var idNote = "textCorrireNote" + idC;
        var idExtra = "textCorrireExtra" + idC;

        table = table + "<tr>";
        table += "<form class='form-inline' style='opacity:0.5;'>";
        table += "<th scope='row'>"+ idC +"</th>";
        table += "<td>" + "<input class='input-group-text' type='text' value='" + nomeC + "' id='" + idNome + "' disabled></td>";
        table += "<td>" + "<input class='input-group-text' type='text' value='" + giroC + "' id='" + idGiro + "' disabled></td>";        
        table += "<td>" + "<select name='targaCorriere' id='" + idTarga + "' size='1' class='form-select form-select-lg' disabled>";
        for(var j=0; j<arrayDatiCorrieri.length; j++){
            if(arrayDatiCorrieri[j][TARGACORRIERE] == targaC){
                table += "<option value='" + arrayDatiCorrieri[j][TARGACORRIERE] + "' selected='selected' style='text-align: center;'>" + arrayDatiCorrieri[j][TARGACORRIERE] + "</option>";
            }else{
                table += "<option value='" + arrayDatiCorrieri[j][TARGACORRIERE] + "'>" + arrayDatiCorrieri[j][TARGACORRIERE] + "</option>";
            }
        }
        table += "</select></td>";
        table += "<td>" + "<input class='input-group-text' type='text' style='margin: 0 auto;' value='" + noteC + "' id='" + idNote + "' disabled></td>";
        table += "<td>" + "<input class='input-group-text' type='text' style='margin: 0 auto;' value='" + extraC + "' id='" + idExtra + "' disabled></td>";

        table += "<td>" + "<button type='submit' class='btn btn-primary mb-2' id='" + idSubmit + "' onclick='" + chiamataSubmit + "' disabled>SALVA</button</td>"
        table += "<td>" + "<button type='submit' class='btn btn-primary mb-2' id='" + idModifica + "' onclick='" + chiamataModifica + "'> MODIFICA</button></td>"
        table += "</form></tr>";
    }
    //close off table
    table = table + `</tbody></table>`;
    tableData.innerHTML = table;
}

// TODO: sistemare la funzione di salvataggio 
// Controllare se è stato inserito qualcosa o una stinga vuota
// per note e extra mostrare solo il popup
// aggiungere Popup warning per dimenticanza di dati
// sistemare 'innerHMTL' con <strong> per il messaggio di warning e di success
function salvaDatiCorriere(id){
    document.getElementById("submitCorrire" + id).style = "background-color: none;";
    document.getElementById("submitCorrire" + id).disabled = true;
    document.getElementById("modificaCorrire" + id).style = "background-color: none;";

    var newNome = document.getElementById("textCorrireNome" + id).value;
    var newGiro = document.getElementById("textCorrireGiro" + id).value;
    var newTarga = document.getElementById("textCorrireTarga" + id).value;
    var newNote = document.getElementById("textCorrireNote" + id).value;
    var newExtra = document.getElementById("textCorrireExtra" + id).value;

    arrayDatiCorrieri[id][NOMECORRIERE] = newNome;
    arrayDatiCorrieri[id][GIROCORRIERE] = newGiro;
    arrayDatiCorrieri[id][TARGACORRIERE] = newTarga;
    arrayDatiCorrieri[id][NOTECORRIERE] = newNote;
    arrayDatiCorrieri[id][EXTRACORRIERE] = newExtra;

    document.getElementById("textCorrireNome" + id).disabled = true;
    document.getElementById("textCorrireGiro" + id).disabled = true;
    document.getElementById("textCorrireTarga" + id).disabled = true;
    document.getElementById("textCorrireNote" + id).disabled = true;
    document.getElementById("textCorrireExtra" + id).disabled = true;

    document.getElementById("modificaCorrire" + id).innerText = "MODIFICA";

    document.getElementById("alertSuccessCorriere").style = 'display: block';
    document.getElementById("nomeCorriereSuccess").innerText = arrayDatiCorrieri[id][NOMECORRIERE];
    
}

function modificaDatiCorriere(id){
    if(document.getElementById("submitCorrire" + id).disabled == true){
        document.getElementById("submitCorrire" + id).disabled = false;
        document.getElementById("submitCorrire" + id).style = "background-color: green;";

        document.getElementById("modificaCorrire" + id).style = "background-color: red;";

        document.getElementById("textCorrireGiro" + id).disabled = false;
        document.getElementById("textCorrireTarga" + id).disabled = false;
        document.getElementById("textCorrireNote" + id).disabled = false;
        document.getElementById("textCorrireExtra" + id).disabled = false;
    }else{
        document.getElementById("submitCorrire" + id).disabled = true;
        document.getElementById("submitCorrire" + id).style = "background-color: none;";

        document.getElementById("modificaCorrire" + id).style = "background-color: none;";

        document.getElementById("textCorrireGiro" + id).disabled = true;
        document.getElementById("textCorrireTarga" + id).disabled = true;
        document.getElementById("textCorrireNote" + id).disabled = true;
        document.getElementById("textCorrireExtra" + id).disabled = true;
    }
}

function generaPresenzeCorrieri(){
    var dataGiornata = document.getElementById("dataGiornataCorrieri").innerHTML.split(" ");
    var createHTMLTalble = "<div>";
    createHTMLTalble += "<h2>PRESENZE CORRIERI: " + dataGiornata[1] + "</h2>";
    createHTMLTalble += "<table class='table table-striped'>";
    createHTMLTalble += "<thead><tr>";
    createHTMLTalble += "<th>ID</th><th>NOMINATIVO</th><th>GIRO</th><th>TARGA</th><th>NOTE</th><th>EXTRA</th>";
    createHTMLTalble += "</tr></thead>";
    createHTMLTalble += "<tbody>"
    for(var i=0; i<arrayDatiCorrieri.length;i++){
        createHTMLTalble += "<tr>";
        createHTMLTalble += "<td>"+ arrayDatiCorrieri[i][IDCORRIERE] + "</td><td>"+ arrayDatiCorrieri[i][NOMECORRIERE] + "</td><td>" + arrayDatiCorrieri[i][GIROCORRIERE] + "</td>" + "</td><td>" + arrayDatiCorrieri[i][TARGACORRIERE] + "</td>";
            if(arrayDatiCorrieri[i][NOTECORRIERE] == ''){
                createHTMLTalble += "<td> - </td>";
            }else{
                createHTMLTalble += "<td>" + arrayDatiCorrieri[i][NOTECORRIERE] + "</td>";
            }
            if(arrayDatiCorrieri[i][EXTRACORRIERE] == ''){
                createHTMLTalble += "<td> - </td>";
            }else{
                createHTMLTalble += "<td>" + arrayDatiCorrieri[i][EXTRACORRIERE] + "</td>";
            }
        }
        createHTMLTalble += "</tr>";
    createHTMLTalble += "</tbody></table></div>"

    document.getElementById("modalCorrieriTitolo").innerHTML = "<strong>" + dataGiornata[1] + "</strong>";
    document.getElementById("datiCorrieri").innerHTML = createHTMLTalble;
}

function generaPDF(){
    var dataGiornata = document.getElementById("dataGiornataCorrieri").innerHTML.split(" ");
    var doc = new jsPDF({
        orientation: 'l', // landscape
        unit: 'pt', // points, pixels won't work properly
        format: ['850', '850'] // set needed dimensions for any element
  });

    doc.setFont("helvetica");
    doc.setFontSize(1);
    
    var source = window.document.getElementById("datiCorrieri");
    doc.fromHTML(source, 5, 0, null, null, 'center');
    doc.save("PresenzeCorrieri-" + dataGiornata[1]);

    var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close();
}