# Rumble Coding Challenge

## Aufgabenstellung

> Die Aufgabenstellung dieser Coding Challenge besteht darin, die zwölf neusten Artikel von einer WordPress API zu beziehen und diese als Kachel mit einem Bild, dem Titel, dem Autor, der Kategorie und dem Veröffentlichungsdatum darzustellen

## Abweichungen / Zusatzfunktionen

> Mit folgenden Punkten bin ich von von der Aufgabenstellung abgewichen, um weitere Zusatzfunktionen zu implementieren.

### Anzeige von allen Kategorien

> Da das Attribut ***categories*** bei einem Artikel ein Array ist und ein Artikel somit mehrere Kategorien haben kann, werden anstatt einer Kategorie, alle Kategorien angezeigt.

### Infinite Scrolling

> Initial werden wie von der Aufgabenstellung vorgegeben, die neusten zwölf Einträge geladen. Zusätzlich werden wenn der Benutzer weiter nach unten scrollt immer wieder die nächsten Einträge geladen.

### Ladeindikatoren

> Solange Requests zur WordPress-API nicht vollständig abgeschlossen sind, werden verschiedene Ladeindikatoren angezeigt. \
> Bei dem Laden der ersten Artikel wird ein großer Ladeindikator in der Mitte des Bildschirms angezeigt. \
> Wenn weitere Artikel bei dem Infinite-Scrolling nicht schnell genug geladen werden, wird am Ende des Scroll-Containers ein weiterer, kleinerer Ladeindikator angezeigt.

### Autoren

> Neben dem Namen des Autoren wird zusätzlich dessen Profilbild (falls vorhanden) angezeigt. \
> Außerdem gelangt man mit einem Klick auf das Profilbild eines Autoren auf dessen Profilseite.

### Kachelanordnung

> Bis zu einer Fensterbreite von 768px nehmen alle Artikel-Cards die komplette Fensterbreite ein und werden untereinander angeordnet. \
> Ab einer Fensterbreite von 768px wird die Breite einer Artikel-Card von der Länge des Titels bestimmt. Dadurch können bspw. mehrere Artikel mit kurzen Titeln nebeneinander angeordnet werden.

## Wordpress

> Da bisher noch keine Berührungspunkte mit Wordpress hatte, musste ich mich erstmal in das Thema einarbeiten. \
> Um die Aufgabenstellung zu erfüllen habe ich via Docker eine Wordpress Instanz aufgesetzt und ein Plugin für den News-Feed erstellt. \
> Nach dem Aktivieren des Plugins habe ich eine neue Seite angestellt und den News-Feed via Shortcode eingebunden. Zusätzlich habe ich per Code-Editor noch CSS hinzufügen müssen, damit der Container an der korrekten Stelle overflowed und somit das Infinite-Scrolling korrekt funktioniert.
> \
> \
> Die "fertige" Seite ist unter [https://wordpress.maxlehmann.dev](https://wordpress.maxlehmann.dev) erreichbar.

## Techstack

### Kernkomponenten

>[ReactJS](https://react.dev/): Frontend-Framework \
[TailwindCSS](https://tailwindcss.com/): Klassenbasiertes CSS-Framework \
[MaterialUI](https://mui.com/): Komponentenbibliothek

### Zusätzliche npm-packages

> [Axios](https://www.npmjs.com/package/axios): HTTP-Client Library \
> [@ant-design/colors](https://www.npmjs.com/package/@ant-design/colors): Sammlung von Farbpaletten

### Deployment

> [Docker](https://www.docker.com/): Containerisierungsplatform
> [Github-Actions](https://github.com/features/actions): On-Push Pipeline, welche die React App baut, diese in einen Docker-Container verpackt, den Docker-Container deployed und parallel die App in Wordpress deployed.
