# Sicherheitsregeln

## Niemals veröffentlichen

- echte API-Schlüssel
- `.env`-Dateien
- Exportdateien deiner Sammlung
- Bilder aus privaten Beständen, wenn du sie nicht bewusst öffentlich machen willst
- Zugangsdaten oder Tokens
- Admin- oder Service-Schlüssel externer Dienste

## Erlaubt als öffentliche Basis

- HTML, CSS, JavaScript ohne Geheimnisse
- Dokumentation
- SQL-Schema ohne Zugangsdaten
- Platzhalterdateien wie `config.example.js`

## Vor jedem Commit prüfen

- Ist irgendwo ein echter Schlüssel eingetragen?
- Liegt eine `.env`-Datei im Projekt?
- Wurde eine Export-JSON deiner Sammlung mit hochgeladen?
- Sind Bilder enthalten, die privat bleiben sollen?
- Wurden Zugangsdaten in README oder Kommentaren erwähnt?

## Für spätere Supabase-Nutzung

Nur ein sicher freigegebener Browser-Zugang darf im Frontend verwendet werden.
Admin- oder Service-Zugänge gehören niemals in ein öffentliches Repository.
