# P2.spoergeskema

## INFOMATION OM BRUG AF PROGRAM

Denne README bruges som en referance til hvordan du kan navigere rundt i programmet. Her vil du kunne finde ud af hvor du skal placere din ny kode samt sammenhængen bag programmet.

### restapi

Programmet er udarbejde med Model View Controller (MVC) arkitekturen. Ved installation af repository husk at bruge _npm install_ for at installere alle npm pakker der er installeret i projektet. Hertil er det vigtig at du opretter din .env fil gemmer din node_moduls i den den samt Secrets mm.

> Brug _npm test_ for at starte serveren.

### bin mappen

Bin mappen indeholder en fil ved navn _www_. Denne fil fungerer som startpunktet for en Node.js Express-server. Den sørger for at hente den tilhørende Express-applikation, definere en serverport, og starte en HTTP-server, der kan håndtere indgående forespørgsler. Derudover håndterer den fejl, der kan opstå under opstart, såsom en allerede optaget port eller manglende tilladelser. Den bruger også debug-modulet til at logge statusoplysninger.

#### Hvilke funktioner kan tilføjes?

- HTTPS-understøttelse: Hvis du vil køre serveren sikkert, kan du bruge https.createServer med et SSL-certifikat.
- Miljøvariabel-håndtering: Brug f.eks. dotenv til at hente konfigurationer fra en .env-fil.
- Graceful Shutdown: Tilføj en funktion, der lukker serveren pænt ved SIGINT eller SIGTERM.

### controllers

controllers fungerer som bindeled mellem brugerens forespørgsler, datamodeller og API-respons. De håndterer logikken bag forskellige funktioner og kommunikerer med databasen for at hente, opdatere eller slette data.

Mappen controllers/ indeholder blandt andet:

controller_admin.js, der håndterer administratorrelaterede opgaver som login, brugerhåndtering og systemindstillinger.
controller_survey.js, der styrer spørgeskemafunktioner, herunder oprettelse, visning og besvarelse af surveys.
Disse controllers samarbejder med models/ (databasen), routes/ (API-endpoints) og views/ (hvis der er en brugergrænseflade) for at strukturere applikationen.

Controllerne bruges til at behandle forespørgsler, validere data og returnere svar, mens de kan udvides med fejlhåndtering, autentificering og optimering af databaseforespørgsler for bedre stabilitet og ydeevne.

### db, data og public

Public indeholder stylingen for hele projectet. Db er hvor du vil kunne finde vores database. data indeholder vores som sagt data så som xml filer med spørgsmål.

### routes

routes/ indeholder applikationens routing-logik og definerer, hvordan HTTP-anmodninger håndteres og sendes videre til de relevante controllers. Den sikrer, at hver endpoint har en klar funktion og kobler brugerens forespørgsler til den rigtige behandling i controllers.

Følgende filer findes i denne mappe:

admin.js: Indeholder ruter til administratorrelaterede funktioner såsom registrering og login. Den håndterer både visning af formularer og grundlæggende API-respons.
index.js: Definerer hovedruterne for applikationen, herunder forsiden og eventuelle API-endpoints. Den fungerer som en central hub for routing.
survey.js: Ruter relateret til spørgeskemafunktionalitet, der sender forespørgsler videre til den relevante controller for håndtering.

Disse ruter sikrer, at brugerforespørgsler sendes korrekt til controllerne, som derefter håndterer logikken og kommunikerer med databasen. Systemet kan udvides med flere ruter for at understøtte nye funktioner eller API-endpoints, alt efter behov.

### views

Mappen views/ indeholder applikationens frontend-skabeloner, som er skrevet i Pug.

Filerne i views/ er struktureret som følger:

layout.pug: Grundlæggende skabelon, der bruges som base for andre sider. Den indeholder HTML-rammen og en placeholder (block content), hvor individuelle sider kan indsætte deres indhold.
index.pug: Hovedsiden, der viser en velkomstbesked og applikationens titel.
login.pug: Indeholder en login-formular, hvor brugeren kan indtaste deres e-mail og adgangskode.
register.pug: En registreringsformular, hvor nye brugere kan oprette en konto med e-mail, adgangskode og en kort biografi.
error.pug: En fejlside, der viser fejlmeddelelser og fejlkoder, hvis noget går galt i applikationen.
Disse skabeloner forbindes med routes, hvor serveren render dem og sender dem til klienten, så brugeren får en dynamisk oplevelse. Systemet kan udvides med flere views for at understøtte nye sider eller funktioner.

### app.js

app.js er hovedfilen i applikationen, der initialiserer Express-serveren, opsætter middleware, definerer routes, og håndterer fejl.

Den konfigurerer Pug som template engine, aktiverer sikkerheds- og logging-middleware som helmet, cors og morgan, samt håndterer cookies og JSON-data.

Routes fra index og admin tilknyttes applikationen, og ukendte anmodninger sendes til en fejlhåndtering, der renderer error.pug.

Som central del af MVC-arkitekturen binder app.js applikationens komponenter sammen og kan udvides med flere middleware, databaser og autentificering.
