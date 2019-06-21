# install

````
bundle install
rails s
````

# bgmr web hosting bei sinumX

- Website liegt in bgmr_web/
- Datenbank sqlite liegt in bgmr_web/db/ (!)
- Logs: bgmr_web/logs

## deployment

1. Bei porath.net (plesk) als bgmr einloggen
2. Git pull
    * Im Menü Sektion "Git" aufrufen
    * "Updates mithilfe von Pull abrufen"
    * Seite neu laden, um letzten Commit zu sehen
3. Dateien kopieren
    * "Vom Repository bereitstellen" -> Dateien werden nach bgmr_web/ kopiert (Datenbank wird nicht überschrieben)
4. "bundle install"
    * Im Menü Sektion "Ruby" aufrufen
    * "Paketinstallation" anklicken
5. Rake tasks ausführen
    * "Rake-Aufgabe ausführen" anklicken
    * Verfügbare Tasks (Auswahl)
        * assets:precompile (wenn css oder js geändert)
        * db:migrate (wenn Datenbank geändert)
        * paperclip:refresh:missing_styles (Wenn es neue Paperclip styles gibt)
6. Rails restart
    * "App neu starten" anklicken

siehe auch bin/prepare

## installation notes

* Repository wird von Github geholt
* Rake-Task "rake secret" muss ausgeführt werden, das Secret kommt in die ENV-Variable SECRET_KEY_BASE
* Da kein NPM verfügbar ist, muss node_modules eingecheckt werden
* Aus dem gleichen Grund wurde das Gem "therubyracer" installiert, welches eine Ausführingsumgebung für javascript zur Verfügung stellt, um die Assets zu bearbeiten
* Backups werden in Plask vom "Backup-Manager" erstellt