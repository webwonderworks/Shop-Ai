# Shop Designer Platform - TODO

## MONTAG-PRÄSENTATION CHECKLIST (Valgux.com)

### Phase 1: Backend & Auth ✅
- [x] Backend-Server läuft (Port 3000)
- [x] Prisma/Drizzle Datenbankschema
- [x] CORS aktiviert
- [x] Auth-Routen (login/register)
- [ ] Auth mit Datenbank speichern (nicht nur Demo)
- [ ] Password Hashing (bcrypt)

### Phase 2: Frontend Landing Page ✅
- [x] Landing Page mit Features & Pricing
- [x] Navigation mit Login-Button
- [x] Responsive Design
- [ ] Performance-Optimierung

### Phase 3: Dashboard & Projektmanagement
- [x] Dashboard Layout
- [ ] Projekt-Erstellung funktioniert
- [ ] Projekt-Liste wird angezeigt
- [ ] Projekt-Bearbeitung
- [ ] Projekt-Löschung

### Phase 4: Design-Editor
- [ ] Editor-UI mit Live-Preview
- [ ] Drag-Drop für Design-Elemente
- [ ] Design-Parameter ändern (Farben, Fonts)
- [ ] Echtzeit-Vorschau
- [ ] Speichern funktioniert

### Phase 5: AI-Integration
- [ ] Design-Vorschläge generieren
- [ ] KI-Analyse für Shop-Typ
- [ ] Farb- & Typografie-Empfehlungen

### Phase 6: Export & Integration
- [ ] JSON-Export
- [ ] Mauve System3 Export
- [ ] Shopify Export

### Phase 7: Sicherheit & Production
- [ ] reCAPTCHA auf Registrierung
- [ ] Rate-Limiting
- [ ] CSRF-Protection
- [ ] Input-Validierung
- [ ] Production-Build testen

### Phase 8: Deployment auf Valgux.com
- [ ] Domain-Konfiguration
- [ ] SSL-Zertifikat
- [ ] Production-Build deployen
- [ ] Monitoring & Logs

## Alte Phase-Struktur (Referenz)

## Phase 1: Datenbankschema und Backend-Grundstruktur
- [x] Datenbankschema für Projekte, Templates und Designs definieren
- [x] Mauve-Template-Schema als JSON-Struktur modellieren
- [x] Datenbank-Migrationen durchführen
- [x] Backend-Router für Projektmanagement erstellen
- [x] Authentifizierung und Autorisierung testen

## Phase 2: Mauve-Template-System und Design-Wizard
- [x] Mauve System3 Template-Slots definieren (Header, Footer, Hero, Produktkarten, etc.)
- [x] Design-Wizard-Komponenten erstellen (Step 1-4)
- [x] Formular-Validierung für Wizard-Schritte
- [x] Template-Slot-Rendering-Engine implementieren
- [ ] Mauve-Kompatibilität-Checks inbauen

## Phase 3: KI-Integration für Design-Vorschläge und Analyse
- [x] LLM-Integration für Design-Vorschläge
- [x] KI-Prompt für Shop-Typ-Analyse
- [x] Farb- und Typografie-Vorschläge generieren
- [x] UX-Analyse-Engine implementieren
- [ ] Conversion-Optimierungs-Empfehlungen

## Phase 4: Frontend-UI mit Live-Vorschau und Dashboard
- [x] Dashboard-Layout mit Projektübersicht
- [x] Wizard-UI mit Multi-Step-Navigation
- [x] Live-Vorschau-Komponente (Mock-Shop)
- [x] Design-Parameter-Editor
- [x] Projekt-Verwaltung (Erstellen, Bearbeiten, Löschen)

## Phase 5: Export- und Git-Integration
- [ ] Template-Export als JSON
- [ ] GitHub OAuth-Integration
- [ ] Git-Commit-Generator
- [ ] Automatisches Push zu Mauve-Repository
- [ ] Export-Validierung

## Phase 6: Testen, Optimieren und Dokumentation
- [ ] Unit-Tests für Backend-Router
- [ ] Integration-Tests für Wizard-Flow
- [ ] Performance-Optimierung
- [ ] Benutzer-Dokumentation
- [ ] Deployment-Vorbereitung
