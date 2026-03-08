# TT-Modellbahnsammlung 2026

Eine deutschsprachige Web-App für deine TT-Modellbahnsammlung, öffentlich gehostet über GitHub Pages und für dauerhafte Speicherung mit Supabase vorbereitet.

## Aktueller Stand

- GitHub Pages ist online
- die App ist jetzt auf **Supabase Auth + Datenbank** vorbereitet
- es werden weiterhin **keine privaten Bestandsdaten** mit ins Repository eingecheckt
- es werden **keine geheimen API-Schlüssel** veröffentlicht

## Sicherheitsprinzip

In ein öffentliches Repository gehören **niemals**:

- Service-Role-Keys
- Admin-Keys
- `.env`-Dateien
- Exportdateien deiner Sammlung
- private Bilder, wenn du sie nicht bewusst öffentlich machen willst

Erlaubt und normal in einer Browser-App sind dagegen:

- die Supabase-Projekt-URL
- der **öffentliche** Supabase Anon Key

Diese beiden Werte sind für Frontend-Apps gedacht. Die eigentliche Sicherheit kommt über **Supabase Auth** und **Row Level Security (RLS)**.

## Was jetzt eingebaut ist

- E-Mail-Anmeldung per Magic Link vorbereitet
- Laden, Anlegen, Bearbeiten und Löschen von Modellen über Supabase vorbereitet
- sichere Benutzertrennung über `user_id`
- Suchfunktion und einfache deutsche Oberfläche
- klare Statusanzeige, wenn Supabase noch nicht eingerichtet ist

## Was du jetzt tun musst

### 1. Supabase-Projekt anlegen

- Gehe auf [https://supabase.com](https://supabase.com)
- Erstelle ein neues Projekt
- Öffne den SQL Editor
- Führe den Inhalt aus `supabase/schema.sql` aus

### 2. E-Mail-Login aktivieren

- In Supabase zu **Authentication** gehen
- E-Mail-Login aktiviert lassen
- Unter URL-Konfiguration als Site URL deine GitHub-Pages-Adresse eintragen:
  - `https://kolle1979.github.io/tt-modellbahnsammlung-2026/`

### 3. Öffentliche Frontend-Konfiguration eintragen

Öffne die Datei `config.public.js` im Repository und trage dort ein:

- `supabaseUrl`
- `supabaseAnonKey`

Wichtig: **Nur** den öffentlichen Anon Key eintragen, niemals einen Service-Role-Key.

### 4. Änderungen committen

Sobald `config.public.js` mit deinen öffentlichen Supabase-Daten gefüllt ist, funktioniert die App produktiv über GitHub Pages.

## Dateien

- `index.html` – App-Oberfläche
- `styles.css` – Design
- `app.js` – Auth + CRUD-Logik
- `config.public.js` – öffentliche Frontend-Konfiguration mit Platzhaltern
- `docs/supabase-setup.md` – einfache Einrichtungsanleitung
- `docs/security.md` – Sicherheitsregeln
- `supabase/schema.sql` – Tabellen + RLS-Policies

## Noch offen

- Bild-Upload mit Supabase Storage
- komfortablere Filter
- Import/Export für Backups
- mobile Optimierung

## Lizenz

MIT
