| Branch | Pipeline | Healthcheck | Version |
| - | - | - | - |
| main | [![pipeline](https://github.com/MaxLehmann01/rumble-coding-challenge/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/MaxLehmann01/rumble-coding-challenge/commit/main) | [![healthcheck](https://gcb.maxlehmann.dev/badges/healthcheck?url=https://wordpress.maxlehmann.dev)](https://wordpress.maxlehmann.dev) [![healthcheck](https://gcb.maxlehmann.dev/badges/healthcheck?url=https://rumble-news-feed.maxlehmann.dev)](https://rumble-news-feed.maxlehmann.dev) | [![version](https://gcb.maxlehmann.dev/badges/version?project=rumble-coding-challenge)](https://github.com/MaxLehmann01/rumble-coding-challenge/tree/main) |

# Rumble Coding Challenge (Rumble News Feed)

## Aufgabenstellung

> Die Aufgabenstellung dieser Coding Challenge besteht darin, die zwölf neuesten Artikel von einer WordPress-API zu beziehen und diese als Kachel mit einem Bild, dem Titel, dem Autor, der Kategorie und dem Veröffentlichungsdatum darzustellen.

## Abweichungen / Zusatzfunktionen

> Mit folgenden Punkten bin ich von der Aufgabenstellung abgewichen, um weitere Zusatzfunktionen zu implementieren.

### Anzeigen von allen Kategorien

> Da das Attribut ***"categories"*** bei einem Artikel ein Array ist und ein Artikel somit mehrere Kategorien haben kann, werden anstatt nur einer Kategorie, alle Kategorien angezeigt.

### Infinite Scrolling

> Initial werden wie vorgegeben die zwölf neuesten Artikel geladen. \
Zusätzlich werden, wenn der Benutzer nach unten scrollt, immer wieder die nächsten zwölf Artikel geladen.

### Ladeindikatoren

> Solange Requests zur WordPress-API nicht vollständig abgeschlossen sind, werden verschiedene Ladeindikatoren angezeigt. \
> Beim Laden der ersten Artikel wird ein großer Ladeindikator in der Mitte des Bildschirms angezeigt. \
> Wenn weitere Artikel beim Infinite-Scrolling nicht schnell genug geladen werden, wird am Ende des Scroll-Containers ein weiterer, kleinerer Ladeindikator angezeigt.

### Autoren

> Neben dem Namen des Autors wird zusätzlich dessen Profilbild (falls vorhanden) angezeigt. \
> Außerdem kann mit einem Klick auf ein Profilbild, die Profilseite des jeweiligen Autors aufgerufen werden.

### Kachelanordnung

> Bis zu einer Fensterbreite von 768px nehmen alle Artikel-Cards die komplette Fensterbreite ein und werden untereinander angeordnet. \
> Ab einer Fensterbreite von 768px wird die Breite einer Artikel-Card von der Länge des Titels bestimmt.\
> Dadurch können bspw. mehrere Artikel mit kurzen Titeln nebeneinander angeordnet werden.

## WordPress

> Da ich bisher noch keine Berührungspunkte mit WordPress hatte, musste ich mich zunächst in WordPress einarbeiten. \
> Ich habe eine WordPress-Instanz via Docker aufgesetzt und ein Plugin ***"rumble-news-feed"*** erstellt. \
> Nach dem Aktivieren des Plugins habe ich eine neue Seite angelegt und den News-Feed via Shortcode eingebunden. \
> Zusätzlich habe ich per Code-Editor noch weitere Styles hinzugefügt, damit der Scroll-Container an der korrekten Stelle overflowed und somit das Infinite-Scrolling funktioniert.

## Techstack

> [ReactJS](https://react.dev/): Frontend-Framework \
> [TailwindCSS](https://tailwindcss.com/): Klassenbasiertes CSS-Framework \
> [MaterialUI](https://mui.com/): Komponentenbibliothek

### Zusätzliche npm-packages

> [Axios](https://www.npmjs.com/package/axios): HTTP-Client Library \
> [@ant-design/colors](https://www.npmjs.com/package/@ant-design/colors): Sammlung von Farbpaletten

### Deployment

> [Docker](https://www.docker.com/): Containerisierungsplatform \
> [Github-Actions](https://github.com/features/actions): On-Push Pipeline, welche die React App baut, diese in einen Docker-Container verpackt, den Docker-Container deployed und parallel die App direkt in WordPress deployed.

## URLs

> Die App wurde zwei mal deployed. \
Einmal per WordPress und einmal direkt als React-App via Docker. \
\
> [https://wordpress.maxlehmann.dev](https://wordpress.max.lehmann.dev): WordPress \
> [https://rumble-news-feed.maxlehmann.dev](https://rumble-news-feed.maxlehmann.dev): React-App (Docker)

## Fragen / Antworten

### Wenn du mehr Zeit gehabt hättest, was hättest du anders gemacht?

> Wenn ich mehr Zeit gehabt hätte, hätte ich mich einerseits weiter in WordPress eingearbeitet und eine schönere Webseite mit weiteren Zusatzfunktionen erstellt.
> Beispiele für weitere Zusatzfunktionen wären eine On-Hover-Vorschau für Artikel, die Darstellung des kompletten Artikels und Filter-/Suchfunktionen.

### Wenn du ein Framework eingebunden hast, warum hast du dieses gewählt?

> Da ich mich bereits gut mit **ReactJS** auskenne, konnte ich die Kernfunktionen schnell implementieren. \
> Dadurch hatte ich mehr Zeit, um weitere Zusatzfunktionen auszuarbeiten und umsetzen. \
> Gleichzeitig hatte ich mehr Zeit, um mich in WordPress einzuarbeiten. \
> \
> **TailwindCSS** nutze ich schon seit Jahren in all meinen Frontendprojekten, da mir die selbsterklärenden Klassenbezeichnungen eine einfache Entwicklung ermöglichen. \
> Außerdem trägt meiner Ansicht nach eine klare Strukturierung der Tailwind-Klassen zur Übersichtlichkeit und zum Punkt "Clean-Code" bei.

### Was bedeutet für dich "Clean Code" und wendest du dies an? Wenn Ja, was davon?

> "Clean Code" bedeutet für mich, dass Code im gesamten Projekt gleich strukturiert und dadurch einfach zu lesen ist. \
> Beispielsweise gehe ich bei meinen React-Projekten in Komponenten immer nach folgender Reihenfolge vor:
>
> 1. Import Custom-Hooks
> 2. Deklaration/Initialisierung von States und References
> 3. API-Fetch-Funktionen
> 4. Handler-Funktionen
> 5. Alle anderen Funktionen
> 6. useEffects
> 7. Early Returns
> 8. Main-Return

### Programmierst du "funktional" oder "OOP"? Bitte mit kurzer Begründung

> In der Frontend-Entwicklung mit React programmiere ich größtenteils funktional. \
> Durch das Nutzen von "Functional Components" und Hooks wie "useState" und "useEffect" wird dies auch selbst vom Framework sehr begünstigt. \
> \
> In der Backend-Entwicklung ist es dann eher gemischt. \
> In ExpressJS setze ich beispielsweise Datenbank-, Websocket- oder Messagebrokerservices objektorientiert um. \
> Middlewares und Route-Definitions setze ich dann beispielsweise wiederum funktional um.
