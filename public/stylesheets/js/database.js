//Funzione che verifica se un utente è registrato
function isRegistered(email) {
    var x = localStorage.getItem(email);
    if(x === null) {
        return false;
    }
    return true;
}

//Funzione che registra un utente
function RegisterUser(mail,Nome,Cognome,Password,NumerodiTelefono,Indirizzo,CodiceFiscale,DatadiNascita,LuogodiNascita){
    /*
    legenda per accedere ai campi del file json
    'nome'
    'cognome'
    'password'
    'numeroditelefono'
    'indirizzo'
    'codicefiscale'
    'datadinascita'
    'luogodinascita'    
    'email'
    */
    var persona ={'nome': Nome,'cognome': Cognome,'password': Password,'numeroditelefono': NumerodiTelefono,'indirizzo': Indirizzo,'codicefiscale': CodiceFiscale,'datadinascita': DatadiNascita,'luogodinascita': LuogodiNascita,'email':mail};    
    localStorage.setItem(mail,JSON.stringify(persona));

    //ogni volta che aggiunto un utente esso dovra apaprarie nell'array del dottore
    //per fare questo non essendoci il side effect devo ricaricare nuovamente in memoria il nuovo storage
    
    updateAdmin(mail);
    //alert("utente aggiutno alal lista dell'admin"); debug
    
    return true;
    
}

//Funzione che ritorna il nome e cognome dall'email
function getNomeCognome(mail){
    var item = localStorage.getItem(mail);
    var mydati = JSON.parse(item);
    //alert("sono la getNomeCognome" + mydati.nome + mydati.cognome);
    return mydati.nome + " " + mydati.cognome;




}


//Funzione che prende l'email dell'utente loggato
function whoIsLogged() {
    return localStorage.getItem("logged");
}

//Funzione che cambia l'utente loggato
function changeLogged(email) {
    localStorage.setItem("logged",email);
}

//Funzione che verifica se l'utente loggato è un admin
function isAdmin() {
    var admin= JSON.parse(localStorage.getItem("ADMIN"));
    var log = JSON.parse(whoIsLogged());
    if(log.email == admin.mail) return true;
    return false;

}

//Funzione che verifica se un utente è attualmente loggato
function isLogged() {
    if(whoIsLogged() === null) return false;
    else return true;
}


//Funzione di login (controlla email/pwd e cambia il logged)
function setLogged() {
    if(!(isRegistered(document.form.email.value))) {
        window.alert("Non esiste un account con questa mail!");
        return false;
    }
    
    var miamail = document.form.email.value;
    var item= localStorage.getItem(miamail);
    var myjson= JSON.parse(item);
    
    if(document.form.password.value != myjson.password) {
        alert("La password inserita non è corretta!");
        return false;
    }

    localStorage.setItem("logged",JSON.stringify(myjson));
    return true;
}

//Funzione che setta il nome nelle pagine del paziente
function setNome() {
    var item= localStorage.getItem("logged");
    var mydati= JSON.parse(item);
    //alert("Bentornato " + mydati.nome + "!")
    document.getElementById("log").innerHTML = mydati.nome;
}

//Funzione che setta il nome nelle pagine del dottore
function setNomeAdmin() {
    var item= localStorage.getItem("logged");
    var mydati= JSON.parse(item);
   //alert("Bentornato " + mydati.nome + "!")
    document.getElementById("log").innerHTML = mydati.nome;
}

//Funzione che rimuove il logged a seguito di un logout
function removeLogged() {
    localStorage.removeItem("logged");
}

//Funzione che compila in automatico la cartella clinica del paziente
function popolaCartellaClinica() {
    var item= localStorage.getItem("logged");
    var mydati= JSON.parse(item);
    document.getElementById("nome").innerHTML = mydati.nome;
    document.getElementById("cognome").innerHTML = mydati.cognome;
    document.getElementById("telefono").innerHTML = mydati.numeroditelefono;
    document.getElementById("indirizzo").innerHTML = mydati.indirizzo;
    document.getElementById("codicefisc").innerHTML = mydati.codicefiscale;
    document.getElementById("datanascita").innerHTML = mydati.datadinascita;
    document.getElementById("luogonascita").innerHTML = mydati.luogodinascita;
}


//Funzione che registra l'admin in automatico con il campo aggiuntivo "clienti"
function RegisterAdmin(mail,Nome,Cognome,Password,NumerodiTelefono,Indirizzo,CodiceFiscale,DatadiNascita,LuogodiNascita,Cliente){
    /*
    legenda per accedere ai campi del file json
    'nome'
    'cognome'
    'password'
    'numeroditelefono'
    'indirizzo'
    'codicefiscale'
    'datadinascita'
    'luogodinascita'    
    'Clienti' di tipo vettore
    'email' mail del dotore
    */
    var persona ={'nome': Nome,'cognome': Cognome,'password': Password,'numeroditelefono': NumerodiTelefono,'indirizzo': Indirizzo,'codicefiscale': CodiceFiscale,'datadinascita': DatadiNascita,'luogodinascita': LuogodiNascita,'Clienti': Cliente, 'email' : mail};    
    localStorage.setItem(mail,JSON.stringify(persona));
    return true;
    
}

//funzione che aggiunge una variabikle globale ADMIN per avere accesso alla mail del dottore quando voglio
function setAdmin(email){
    var info = {'mail':email};
    localStorage.setItem('ADMIN',JSON.stringify(info));
   return true;

}


//funzione che genera in automatico il Dottore (per assenza del backend)
function initAdmin(){
    if(isRegistered("doctor@identistcare.com")){
      return true;
    }
    else {
        RegisterAdmin("doctor@identistcare.com","Francesco","Douglas","123","3488025988","Circonvalalzione tiburtina 4","DGLFNC96","04/08/1996","Roma",["null"]);
        setAdmin('doctor@identistcare.com');
        RegisterUser("samuele@samuele.samuele", "Samuele", "sabatucci", "password", "34880258988", "Via falsa", "fakecf", "11/11/1111", "roma");
        RegisterUser("Francesco.scotti@alice.it", "francesco", "Scotti", "password", "34880258988", "Via falsa", "fakecf", "11/11/1111", "roma");

        window.alert("dottore creato e caricato in memoria");
        return true;
    }

}


//Funzione che aggiorna i clienti dell'admin
function updateAdmin(newCliente){
    //vedo chi e' l'admin
    var Admin = localStorage.getItem("ADMIN");
    var mailAdmin = (JSON.parse(Admin)).mail;
    var dott = localStorage.getItem(mailAdmin);
    //prendo la lista di clienti dell'admin
    var listaClienti = JSON.parse(dott).Clienti

    //window.alert(listaClienti); //clienti prima del push
    //aggiorno la lista
    
    listaClienti.push(newCliente); //devo separe queste due perche' retorna la dimensione 
    
    //window.alert(nuoviClienti); //questo deve restituire un numero che e' la dimensione del vettore

    //mi salvo i dati dell'admin
    var Onome=JSON.parse(dott).nome;
    var Ocog=JSON.parse(dott).cognome;
    var pas=JSON.parse(dott).password;
    var num=JSON.parse(dott).numeroditelefono;
    var ind=JSON.parse(dott).indirizzo;
    var cf=JSON.parse(dott).codicefiscale;
    var dn=JSON.parse(dott).datadinascita;
    var ln=JSON.parse(dott).luogodinascita;
    var mail =JSON.parse(dott).email;
    
    //cancello l'admin
    //localStorage.removeItem(mail);
    //localStorage.removeItem("ADMIN");
    //setto l'admin
    RegisterAdmin(mail,Onome,Ocog,pas,num,ind,cf,dn,ln,listaClienti);
    setAdmin(mail);

    
    return true;
    

}


//Funzione che all'avvio richiede se si vuole pulire il local storage
function clearAllLocalStorage(){
   //return true; //commetare questo per poter ripulire lo storage
    if(window.confirm("vuoi ripulire il local storage?")){
        localStorage.clear();
        
    }
}
//Funzione che stora in memoria la data di prenotazione
function storeDate(data){
        localStorage.setItem(data,JSON.stringify("Prenotato"));


}

//Funzione che verifica se la data della prenotazione e' disponibile
function dataIsfree(data){
    if(data==="1111-11-11" || isRegistered(data )) return false;
    else {
        storeDate(data);   
        return true;
    }

}
//Funzione che manda una mail al destinatario con body
function sendMailto(email,body){
    window.open("mailto:"+email+'&subject='+"Prenotazione Visita"+'&body='+body);
    
    return true;

}

//Funzione che prende l'attuale mail del cliente
function getCurrentMail(){  
    var item= localStorage.getItem("logged");
    var mydati= JSON.parse(item);
    return mydati.email;
}

//Funzione che controlla se un utente è loggato e lo reindirizza sulla pagina giusta
function updatePage(){
    if(isLogged()) {
        if(isAdmin()){ 
            window.location.href = "afterLogin/afteradminloginindex.html";
        }else{ 
            window.location.href = 'afterLogin/afterloginindex.html';
        }
    }
}

//Funzione che controlla se un utente è loggato e lo reindirizza su dovesiamo
function updateDoveSiamoPage(){
    if(isLogged()) {
        if(isAdmin()){ 
            window.location.href = 'afterLogin/afterloginAdmin/dovesiamo.html';
        }else{ 
            window.location.href = 'afterLogin/dovesiamo.html';
        }
        
    }
}
//Funzione che controlla se un utente è loggato e lo reindirizza su contatti 
function updateContattiPage(){
    if(isLogged()) {
        if(isAdmin()){ 
            window.location.href = 'afterLogin/afterloginAdmin/contatti.html';
        }else{ 
            window.location.href = 'afterLogin/contatti.html';
        }
    }
}

//Funzione che controlla se un utente è disconnesso e lo reindirizza
function updateAfterLoginPage() {
    if(!isLogged()){
        window.location.href = "../login.html";
    } else {
        if(isAdmin()) {
            window.location.href = '/afterLogin/afteradminloginindex.html'; 
        }
    }
}

//Funzione che controlla se un admin è disconnesso e lo reindirizza
function updateAfterLoginAdminPage()  {
    if(!isLogged()){
        window.location.href = "../login.html";
    } else {
        if(!isAdmin()) {
            window.location.href = '/afterLogin/afterloginindex.html'; 
        }
    }
}


//funzione che stampa il json in una alert, usare solo per debug
function printFromAlert(mail){
    window.alert("recived:" + mail);
    var item = localStorage.getItem(mail);
    var mydati = JSON.parse(item);
    window.alert(item);
    document.getElementById("nome").innerHTML = mydati.nome;
    document.getElementById("cognome").innerHTML = mydati.cognome;
    document.getElementById("telefono").innerHTML = mydati.numeroditelefono;
    document.getElementById("indirizzo").innerHTML = mydati.indirizzo;
    document.getElementById("codicefisc").innerHTML = mydati.codicefiscale;
    document.getElementById("datanascita").innerHTML = mydati.datadinascita;
    document.getElementById("luogonascita").innerHTML = mydati.luogodinascita;
    return true;

}




//funzione che elimina un utente dallo storgae

function removeUser(mailtodelete){
    
    //rimuovo i dati utente dal db
    //window.alert("recived" + mailtodelete);
    localStorage.removeItem(mailtodelete);
    

    //adesso devo rimuovere l'eamil dalla lista dei clienti

    //vedo chi e' l'admin
    var Admin = localStorage.getItem("ADMIN");
    var mailAdmin = (JSON.parse(Admin)).mail;
    var dott = localStorage.getItem(mailAdmin);
    //prendo la lista di clienti dell'admin
    var listaClienti = JSON.parse(dott).Clienti
    //aggiorno la lista
            //funzione che permette di trovre l'elemtno desiderato nell'aray

            function findEqual(element) {
                return element == mailtodelete;


            }
    var index = listaClienti.findIndex(findEqual); 
    listaClienti.splice(index,1); //questo elimina il singolo elemneto
   
    
    

    //mi salvo i dati dell'admin
    var Onome = JSON.parse(dott).nome;
    var Ocog = JSON.parse(dott).cognome;
    var pas = JSON.parse(dott).password;
    var num = JSON.parse(dott).numeroditelefono;
    var ind = JSON.parse(dott).indirizzo;
    var cf = JSON.parse(dott).codicefiscale;
    var dn = JSON.parse(dott).datadinascita;
    var ln = JSON.parse(dott).luogodinascita;
    var mail = JSON.parse(dott).email;

    //aggiorno
    RegisterAdmin(mail, Onome, Ocog, pas, num, ind, cf, dn, ln, listaClienti);
    //setAdmin(mail);
    alert("rimosso utente"+ mailtodelete);
    return true;
}