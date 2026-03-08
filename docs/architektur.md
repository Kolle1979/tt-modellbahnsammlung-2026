# Architektur

## Ziel

Die App soll auf GitHub Pages laufen, aber ihre Daten dauerhaft außerhalb des Browsers speichern.

## Warum nicht nur localStorage?

`localStorage` ist bequem, aber kein langfristig sicherer Datenspeicher. Wenn Browserdaten gelöscht werden, sind auch die Daten weg.

## Zielbild

- GitHub Pages liefert das Frontend aus
- Supabase speichert Modelle, Metadaten und Bildverweise dauerhaft
- Supabase Storage speichert Bilder dauerhaft
- Die App spricht Supabase direkt an

## Vorteil

- Nutzung im Browser
- dauerhafte Datenspeicherung
- einfache Weiterentwicklung durch andere
- klare Trennung zwischen Oberfläche und Daten
