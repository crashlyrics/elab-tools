import type { Metadata } from "next";

import LegalPage, {
  LegalPlaceholder,
  LegalSection,
} from "../../../components/LegalPage";

export const metadata: Metadata = {
  title: "Hinweise zur Nutzung | elab",
  description: "Hinweise zur Nutzung der digitalen Werkzeuge auf elab.shop",
};

export default function NutzungshinweisePage() {
  return (
    <LegalPage
      title="Hinweise zur Nutzung"
      intro="Wichtige Hinweise zur Verwendung der auf elab.shop bereitgestellten digitalen Werkzeuge und ihrer Ergebnisse."
    >
      <LegalSection title="1. Zweck der Werkzeuge">
        <p>
          Die auf elab.shop bereitgestellten Werkzeuge dienen der Unterstützung
          bei organisatorischen, rechnerischen und planerischen Aufgaben. Sie
          ersetzen keine individuelle fachliche Beratung und keine eigene
          Prüfung der Ergebnisse.
        </p>
      </LegalSection>

      <LegalSection title="2. Prüfung der Ergebnisse">
        <p>
          Trotz sorgfältiger Entwicklung können Eingabe-, Berechnungs-, Rundungs-
          oder Darstellungsfehler nicht vollständig ausgeschlossen werden.
          Ergebnisse sollten deshalb vor ihrer praktischen Verwendung auf
          Plausibilität und Vollständigkeit geprüft werden.
        </p>
        <p>
          Nutzerinnen und Nutzer bleiben für die eingegebenen Daten, die Auswahl
          der Einstellungen und die Verwendung der ausgegebenen Ergebnisse
          verantwortlich.
        </p>
      </LegalSection>

      <LegalSection title="3. Besondere Hinweise zum Rezept- und Einkaufsplaner">
        <p>
          Mengenangaben und Einkaufslisten sind rechnerische Hilfen. Insbesondere
          bei Rundungen, Portionsgrößen, Verpackungseinheiten, Garverlusten und
          individuellen Ernährungsbedürfnissen können Abweichungen entstehen.
        </p>
        <p>
          Angaben zu Allergenen, Unverträglichkeiten, Haltbarkeit, Lagerung,
          Hygiene, Zubereitungstemperaturen und Lebensmittelsicherheit müssen
          eigenständig geprüft werden. Das Werkzeug bietet hierzu keine
          medizinische, ernährungswissenschaftliche oder lebensmittelrechtliche
          Beratung.
        </p>
      </LegalSection>

      <LegalSection title="4. Verfügbarkeit und Änderungen">
        <p>
          Wir bemühen uns um eine zuverlässige Bereitstellung, können jedoch keine
          ununterbrochene oder fehlerfreie Verfügbarkeit gewährleisten. Funktionen
          können aus technischen, sicherheitsbezogenen oder inhaltlichen Gründen
          geändert, ergänzt oder vorübergehend eingestellt werden.
        </p>
      </LegalSection>

      <LegalSection title="5. Haftung">
        <p>
          Die Haftung richtet sich nach den gesetzlichen Vorschriften. Diese
          Hinweise schränken eine zwingende gesetzliche Haftung, insbesondere für
          Vorsatz, grobe Fahrlässigkeit, Schäden an Leben, Körper oder Gesundheit
          sowie nach dem Produkthaftungsgesetz, nicht ein.
        </p>
        <p>
          {/* TODO vor Live-Schaltung:
              AGB, Widerrufsbelehrung, Online-Widerrufsfunktion und
              gegebenenfalls Kündigungsbutton passend zum Verkaufsmodell umsetzen.
          */}
        </p>
      </LegalSection>

      <LegalSection title="6. Inhalte und Schutzrechte">
        <p>
          Die Rechte an den eigenen Inhalten, Gestaltungen und Anwendungen auf
          elab.shop liegen, soweit nicht anders gekennzeichnet, bei Alejandro
          Mestre Vives. Eine Vervielfältigung, Bearbeitung, Verbreitung oder
          sonstige Nutzung außerhalb der gesetzlichen Erlaubnisse bedarf der
          vorherigen Zustimmung. Rechte an Inhalten Dritter bleiben unberührt.
        </p>

        {/* TODO:
            Prüfen, ob verwendete Schriftarten, Grafiken oder Open-Source-Komponenten
            einen ausdrücklich sichtbaren Lizenzhinweis verlangen.
        */}
      </LegalSection>

      <LegalSection title="7. Externe Links">
        <p>
          Soweit diese Website auf externe Angebote verweist, sind deren Betreiber
          für die jeweiligen Inhalte und Datenschutzpraktiken verantwortlich.
          Externe Inhalte werden bei Verlinkung geprüft; eine fortlaufende
          Kontrolle ohne konkrete Anhaltspunkte ist jedoch nicht möglich.
        </p>
      </LegalSection>

      <LegalSection title="8. Rückmeldungen zu Fehlern und Anregungen">
        <p>
          Hinweise auf technische oder inhaltliche Fehler sowie Anregungen und Vorschläge zur Optimierung und Weiterentwicklung können an{" "}
          <a
            href="mailto:feedback@elab.shop"
            className="font-[550] text-slate-800 transition hover:text-slate-950"
          >
            feedback@elab.shop
          </a>{" "}
          gesendet werden.
          Eine möglichst genaue Beschreibung der Eingaben, der Einstellungen, des
          beobachteten Ergebnisses sowie gegebenenfalls gewünschter Funktionen erleichtert die Prüfung.
        </p>
      </LegalSection>

      <LegalSection title="Stand">
        <p>4. August 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
