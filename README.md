# Progetto Reti di calcolatori


## Autori
Caprari Riccardo <br />
Douglas Scotti di Vigoleno Francesco


## Descrizione

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
Per la realizzazione del progetto abbiamo utilizzato:



## Utilizzo
Per utilizzare il progetto bisogna:

* Installare Docker ([Docker on Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository))
* Installare il docker-compose (```sudo apt install docker-compose ```)
* installare la docker-machine (``` base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo install /tmp/docker-machine /usr/local/bin/docker-machine ```)
* creare un gruppo docker (```sudo groupadd docker ```)
* aggiungesi al gruppo docker(```sudo usermod -aG docker $USER```)
* Dare i permessi ai file start e stop (```chmod +x FileName```)
* Avviare il docker container tramite il comando ```./start```
