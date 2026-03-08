# TT-Modellbahnsammlung 2026

Eine einfache, deutschsprachige Web-App zur Verwaltung einer TT-Modellbahnsammlung.

## Ziel

Dieses Repository soll eine leicht nutzbare Lösung für die private Verwaltung einer Modellbahnsammlung bieten und gleichzeitig offen genug sein, damit andere sie weiterentwickeln können.

## Wichtiger Hinweis zur Datenspeicherung

Eine reine GitHub-Pages-App mit nur `localStorage` ist **nicht** ausreichend für langfristige Datensicherheit.
Darum ist dieses Repository auf eine Architektur mit:

- Frontend über GitHub Pages
- dauerhafter Datenspeicherung über eine externe Datenbank
- dauerhafter Bildspeicherung über externen Storage

vorbereitet.

## Empfohlene Architektur

- **Frontend:** statische Website auf GitHub Pages
- **Datenbank:** Supabase (PostgreSQL)
- **Bildspeicher:** Supabase Storage
- **Zugriff:** Browser ruft Supabase direkt über API an

## Geplanter Funktionsumfang

- Modelle anlegen, bearbeiten und löschen
- Bilder pro Modell verwalten
- Suche und Filter
- Übersicht mit Stammdaten
- verständliche deutsche Oberfläche
- robuste Datenspeicherung außerhalb des Browsers

## Projektstruktur

- `index.html` – Startseite / Platzhalter für GitHub Pages
- `supabase/schema.sql` – Datenbankstruktur
- `docs/architektur.md` – einfache Projektbeschreibung
- `LICENSE` – freie Lizenz

## So geht es weiter

### 1. Repository auf GitHub Pages veröffentlichen

- Repository öffnen
- **Settings** > **Pages**
- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/** (root)
- Speichern

Danach ist die Seite nach kurzer Zeit über GitHub Pages erreichbar.

### 2. Supabase-Projekt anlegen

- Auf [https://supabase.com](https://supabase.com) ein Konto anlegen
- Neues Projekt erstellen
- Unter SQL Editor den Inhalt aus `supabase/schema.sql` ausführen
- Danach URL und Public API Key notieren

### 3. App erweitern

Aktuell ist das Repository als saubere Basis angelegt.
Im nächsten Schritt sollte die bestehende HTML-App auf Supabase umgestellt werden, damit Datensätze und Bilder dauerhaft gespeichert werden.

## Für Mitwirkende

Beiträge sind willkommen. Bitte Änderungen klein, verständlich und dokumentiert halten.

## Lizenz

MIT
