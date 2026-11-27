# TheNextListen

- Hva er TheNextListen?
TheNextListen er en musikktjeneste for å holde oversikt over album man ønsker å sjekke ut.
På sikt vil tjenesten også utvides med funksjonalitet for å dele album med venner gjennom en egen feed.
I første versjon består løsningen av sidene Oppdag og Min musikk.
Oppdag-siden er integrert med iTunes Search API og gjør det mulig å søke etter album fra et stort utvalg artister.
Søkeresultatene kan lagres til Min musikk, hvor brukeren kan organisere album gjennom ulike statuskategorier.

- Fremtidige planer:
Foreløpig inneholder prosjektet en innloggingsside og en feed-side som fungerer som plassholdere for fremtidig utvikling.
På sikt er planen å implementere brukerprofiler, autentisering og muligheten til å dele album med andre brukere gjennom en sosial feed.

- Hvorfor laget jeg TheNextListen?
Jeg er veldig glad i musikk, og er stadig på søken etter nye artister og album å sjekke ut. Ofte legger jeg til album i Apple Music som er streamingtjenesten jeg benytter.
Men alt for fort forsvinner albumet nedover "Nylig lagt til" feeden, og plutselig er det ut av syne og jeg glemmer det før jeg engang har rukket og hørt nok på det.

I tillegg har jeg mange musikkinteresserte venner som jeg vet hører på masse musikk som jeg også garantert vil like, og ofte har jeg album som jeg er helt sikker på at flere venner også kunne tenke seg å sjekke ut. Dette er tanken bak del 2 av prosjektet som vil komme senere der jeg legger til rette for innlogging, en feed, og kanskje deling mellom venner.


- Lagring av data og API integrasjon
Applikasjonen kombinerer eksterne data fra Itunes Search API med lokal lagring i nettleseren gjennom Local Storage. API-et brukes til å hente albuminformasjon basert på brukerens søk, mens Local Storage benyttes til å lagre brukerens personlige albumsamling og valgte status. Denne kombinasjonen gjør at applikasjonen kan tilby dynamisk innhold uten behov for egen backend eller database.

Ingen API-nøkkel er nødvendig for å bruke denne API-en.


- Installasjon og oppstart

For å kjøre prosjektet lokalt må Python være installert på maskinen.
Start med å klone GitHub-repositoriet og åpne prosjektmappen i Visual Studio Code eller et annet valgfritt utviklingsmiljø.
Prosjektet benytter Flask som webserver. Dersom Flask ikke allerede er installert, må dette installeres før applikasjonen kan startes.
Når Flask er installert, kan applikasjonen startes ved å kjøre filen app.py.
Når serveren har startet, åpnes applikasjonen i nettleseren ved å navigere til adressen http://127.0.0.1:5000.
Applikasjonen kjører deretter lokalt og alle funksjoner kan testes gjennom nettleseren.


- Applikasjonen kan testes ved å følge disse stegene:

1. Åpne siden Oppdag.
2. Søk etter en artist eller et album ved hjelp av søkefeltet.
3. Trykk Enter for å hente søkeresultater fra iTunes Search API.
4. Legg til et album i samlingen ved å klikke på +-knappen.
5. Gå til siden Min musikk.
6. Kontroller at albumet vises i gruppen Skal sjekke ut.
7. Endre status ved hjelp av nedtrekkslisten:
    - Skal sjekke ut
    - Sjekker ut nå
    - Har sjekket ut
8. Kontroller at albumet flyttes til riktig gruppe.
9. Oppdater siden og bekreft at valgt status er bevart.
10. Fjern et album ved å klikke på −-knappen.
11. Bekreft slettingen i dialogboksen og kontroller at albumet fjernes fra både brukergrensesnittet og Local Storage.


- Kjente begrensninger
Album lagres lokalt i nettleseren ved hjelp av Local Storage.
Data synkroniseres ikke mellom ulike nettlesere eller enheter.
Prosjektet bruker iTunes Search API for søk etter album.
Løsningen benytter ikke database eller backend-lagring i denne versjonen.

- Prosjektet er utviklet med:

HTML5
CSS3
JavaScript (ES6)
Flask
iTunes Search API
Local Storage