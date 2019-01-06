# Progetto Reti di calcolatori


## Autori
Caprari Riccardo <br />
Douglas Scotti di Vigoleno Francesco


## Descrizione
Il progetto riguarda il back-end di [iDentistCare](https://github.com/FuocomanSap/ProgettoLTW), un front-end che abbiamo realizzato per il corso di Linguaggi e tecnologie per il web. Per la descrizione del client fare riferimento alla [documentazione](https://github.com/FuocomanSap/ProgettoLTW#descrizione).

Il server, e dunque il seguente progetto, è stato realizzato utilizzando 3 container Docker, con le seguenti immagini:
* Container n.1 : Node (principale per il server), Porta 3000
* Container n.2 : Node (per la websocket), Porta 1337
* Container n.3 : Mongo (per il database), Porta 27017

Per l'avvio dei 3 container abbiamo usato il [docker-compose](https://docs.docker.com/compose/overview/).
Mapping porte nel docker-compose:
* 3000 -> 80
* 1337 -> 1337
* 27017 -> 27017

Per muoversi all'interno del sito abbiamo definito i vari routes per le chiamate HTTP GET/POST verso il server:

* ```GET /```
<pre>
    Pagina HTML principale del sito.
</pre>
* ```GET /contatti```
<pre>
    Pagina HTML contatti dello studio.
</pre>
* ```GET /chisiamo```
* ```GET /dovesiamo```
curl -H "Authorization: Bearer $TOKEN" localhost/apicartellaclinica

## Architettura
Il progetto ha la seguente architettura:

<pre>
.
├── bin
│   └── www
├── models
│   └── Persona.js
├── passport 
│   └── init.js
│   └── login.js
│   └── signup.js
├── public
│   └── images
│   └── javascripts
│   └── stylesheets
├── routes 
│   └── index.js
├── views
│   └── ALL HTML FILES
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
├── README.md
├── server.js
├── start
├── reset
</pre>



## Tecnologie utilizzate
Per la realizzazione del progetto abbiamo utilizzato come tecnologie principali:
* Docker
* Nodejs
    * Express
    * Passport
    * Bcrypt-nodejs
    * Jsonwebtoken
    * Websocket

Tecnologie lato client -> [iDentistCare](https://github.com/FuocomanSap/ProgettoLTW#tecnologie-utilizzate)


## Utilizzo
Per utilizzare il progetto bisogna:

* Installare Docker ([Docker on Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository))
* Installare il docker-compose (```sudo apt install docker-compose ```)
* installare la docker-machine (``` base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo install /tmp/docker-machine /usr/local/bin/docker-machine ```)
* Creare un gruppo docker (```sudo groupadd docker ```)
* Aggiungesi al gruppo docker(```sudo usermod -aG docker $USER```)
* Dare i permessi ai file start e stop (```chmod +x FileName```)
* Avviare il docker container tramite il comando ```./start```
