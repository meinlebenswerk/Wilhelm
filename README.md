# wilhelm  

Eine kleine **Nuxt** und **Typescript** basierte WebApp, für die Organisation einer "öffentlich" (WG) genutzten Tafel.

Im Hintergrund läuft ein express-basiertes API, das in nuxt als serverMiddleware implementiert ist.
Das kümmert sich um die Datenbank (via **lowdb**) und das versenden von E-Mails mit **nodemailer**.

Nutzer können sich mit ihrem Namen und einer E-Mail registrieren, um sich ein Feld auf der Tafel auszusuchen.

Die App ist an sich sehr simpel, nur das versenden vom E-Mails ist etwas kompliziert, weil Nuxt eigentlich kein "statisches" HTML ausgeben will, und das meiste Styling und die Elemente aus normalem HTML nicht E-Mail kompatibel sind.


## Konfiguration 
Die App kann mit ein paar Umgebungsvariablen (in `.env`) konfiguriert werden:

    EMAIL_USER="" # Benutzername für das E-Mail konto
    EMAIL_PASS="" # Passwort für das E-Mail konto
    GRID_SIZE_X="1" # Anzahl der Kästchen der Kunstwand in X-Richtung
    GRID_SIZE_Y="1" # Anzahl der Kästchen der Kunstwand in Y-Richtung
    HOST="" # (Optional), überschreibt den host in nuxt.config.js
 Die Datei `.env_example` enthält alle variablen und muss nur noch konfiguriert und in `.env` umbenannt werden.

## Setup
```bash

# dependencies mit npm installieren
$ npm install

# startet den dev-server
$ npm run dev

# production Build und server starten
$ npm run build
$ npm run start

```

## Issues
Das API funktioniert momentan in production (aka. build) nicht, das scheint ein bekanntes Problem zu sein, vielleicht behebe ich es noch.
