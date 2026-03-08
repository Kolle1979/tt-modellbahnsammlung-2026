# TT-Modellbahnsammlung 2026

Eine einfache, deutschsprachige Web-App für eine TT-Modellbahnsammlung.

## Was bereits sicher eingerichtet ist

- Öffentliches GitHub-Repository
- Startseite für GitHub Pages
- einfache App-Oberfläche als sichere Basis
- keine echten API-Schlüssel im Repository
- keine privaten Sammlungsdaten im Repository
- Vorlagen und Dokumentation für eine spätere dauerhafte Datenspeicherung

## Wichtiger Sicherheitsgrundsatz

Solange keine echte Datenbank eingerichtet ist, werden **keine privaten Bestandsdaten automatisch veröffentlicht**.
Die aktuelle Basis läuft absichtlich im sicheren Platzhaltermodus, damit nichts versehentlich öffentlich wird.

## GitHub Pages aktivieren

1. Repository öffnen
2. **Settings** öffnen
3. Links auf **Pages** klicken
4. Unter **Build and deployment** bei **Source** `Deploy from a branch` wählen
5. Branch `main` und Ordner `/(root)` wählen
6. **Save** klicken

Danach ist die Seite nach kurzer Zeit online.

## Warum noch keine dauerhafte Speicherung aktiv ist

Dauerhafte Speicherung ohne Datenverlust braucht eine echte externe Datenbank.
Ein statisches GitHub-Pages-Repository allein reicht dafür nicht aus.

## Empfohlene Zielarchitektur

- Frontend: GitHub Pages
- Datenbank: Supabase PostgreSQL
- Bildspeicher: Supabase Storage
- Zugriff: Browser -> Supabase API

## Was absichtlich noch NICHT veröffentlicht wurde

- keine echten API-Schlüssel
- keine `.env`-Datei
- keine Exportdatei deiner Sammlung
- keine Bilder deiner privaten Bestände
- keine Zugangsdaten

## Nächster sicherer Schritt

Bevor echte Speicherung live geht, muss ein eigenes Supabase-Projekt angelegt werden.
Erst danach wird eine produktive App-Version mit dauerhaftem Speichern von Datensätzen und Bildern angebunden.

## Dateien im Repository

- `index.html` – Startseite der App
- `styles.css` – Layout
- `app.js` – sichere Demo-/Basislogik ohne Veröffentlichung privater Daten
- `config.example.js` – Vorlage ohne echte Schlüssel
- `docs/security.md` – Sicherheitsregeln
- `supabase/schema.sql` – vorbereitetes Datenbankschema

## Für Mitwirkende

Bitte niemals echte Schlüssel, Exportdateien oder private Sammlungsdaten direkt committen.

## Lizenz

MIT
