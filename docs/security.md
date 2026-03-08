# Sicherheitsregeln

## Niemals veröffentlichen

- Service-Role-Key
- geheime Admin-Schlüssel
- `.env`-Dateien
- Exportdateien deiner Sammlung
- private Bilder ohne Absicht zur Veröffentlichung
- Zugangsdaten, Tokens oder Passwörter

## Öffentlich erlaubt

- HTML, CSS, JavaScript ohne Geheimnisse
- Dokumentation
- SQL-Schema ohne Zugangsdaten
- Supabase-Projekt-URL
- öffentlicher Supabase Anon Key

## Warum der Anon Key erlaubt ist

Bei Supabase-Browser-Apps ist der Anon Key für das Frontend gedacht.
Die eigentliche Absicherung muss über Anmeldung und Row Level Security erfolgen.

## Vor jedem Commit prüfen

- Ist irgendwo ein Service-Role-Key eingetragen?
- Liegt eine `.env`-Datei im Projekt?
- Wurde eine Export-JSON deiner Sammlung mit hochgeladen?
- Sind Bilder enthalten, die privat bleiben sollen?
- Wurden Passwörter oder Tokens in Kommentaren hinterlassen?
