# Supabase einrichten

## 1. Projekt anlegen

- Bei Supabase anmelden
- Neues Projekt erstellen
- Projekt-URL und Anon Key notieren

## 2. Datenbank vorbereiten

- SQL Editor öffnen
- Inhalt aus `supabase/schema.sql` einfügen
- Ausführen

## 3. Anmeldung konfigurieren

- Bereich **Authentication** öffnen
- E-Mail-Anmeldung aktiv lassen
- Unter URL-Konfiguration als Site URL eintragen:
  - `https://kolle1979.github.io/tt-modellbahnsammlung-2026/`

## 4. Frontend konfigurieren

- Datei `config.public.js` öffnen
- Platzhalter für `supabaseUrl` und `supabaseAnonKey` ersetzen
- Committen

## 5. Funktion testen

- GitHub-Pages-Seite öffnen
- E-Mail-Adresse eintragen
- Magic Link anfordern
- Nach Anmeldung ein Testmodell speichern

## Wichtig

- Niemals Service-Role-Keys ins Repo schreiben
- Das Repo bleibt öffentlich, deshalb nur öffentliche Frontend-Werte eintragen
- Der Schutz der Daten erfolgt über Login und RLS
