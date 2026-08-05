const USE_VERCEL_PRO_TEXT = false;

import type { Metadata } from "next";

import LegalPage, { LegalSection } from "../../../components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz | elab",
  description: "Datenschutzerklärung für elab.shop",
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      intro="Informationen darüber, welche personenbezogenen Daten beim Besuch und bei der Nutzung von elab.shop verarbeitet werden."
    >
      <LegalSection title="1. Verantwortlicher">
        <address className="not-italic">
          Alejandro Mestre Vives
          <br />
          elab.shop
          <br />
          Raiffeisenstraße 46
          <br />
          60386 Frankfurt am Main
          <br />
          Deutschland
          <br />
          E-Mail: info@elab.shop
        </address>
      </LegalSection>

      <LegalSection title="2. Allgemeine Hinweise">
        <p>
          Personenbezogene Daten sind alle Informationen, die sich auf eine
          identifizierte oder identifizierbare Person beziehen. Wir verarbeiten
          personenbezogene Daten nur, soweit dies für den Betrieb dieser
          Website, die Bereitstellung ihrer Funktionen oder die Bearbeitung von
          Anfragen erforderlich ist.
        </p>
      </LegalSection>

      <LegalSection title="3. Hosting und Server-Protokolldaten">
        <p>
          Diese Website wird über Vercel bereitgestellt. Beim Aufruf der Website
          können technisch erforderliche Verbindungs- und Protokolldaten
          verarbeitet werden. Dazu können insbesondere IP-Adresse, Datum und
          Uhrzeit des Zugriffs, aufgerufene Seite oder Datei, Referrer-URL,
          Browsertyp, Betriebssystem sowie der HTTP-Statuscode gehören.
        </p>

        <p>
          Die Verarbeitung erfolgt zur sicheren, stabilen und effizienten
          Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO. Unser berechtigtes Interesse liegt im sicheren und
          funktionsfähigen Betrieb des Online-Angebots.
        </p>

        <p>
          Hosting-Anbieter: Vercel Inc., USA.
          <br />
          Speicherdauer der Protokolldaten:{" "}
          {USE_VERCEL_PRO_TEXT ? (
            <>
              Im derzeit verwendeten Vercel-Pro-Tarif werden Runtime-Logs im
              Vercel-Dashboard für bis zu einen Tag vorgehalten. Die
              Verarbeitung technischer Verbindungsdaten erfolgt zur
              Bereitstellung der Website, zur Fehleranalyse sowie zur
              Gewährleistung ihrer Stabilität und Sicherheit. Darüber hinaus
              verarbeitet Vercel technische Daten nach Maßgabe der eigenen
              Datenschutzbestimmungen.
            </>
          ) : (
            <>
              Im derzeit verwendeten kostenlosen Vercel-Hobby-Tarif werden
              Runtime-Logs im Vercel-Dashboard für bis zu eine Stunde
              vorgehalten. Die Verarbeitung technischer Verbindungsdaten
              erfolgt zur Bereitstellung der Website, zur Fehleranalyse sowie
              zur Gewährleistung ihrer Stabilität und Sicherheit. Darüber
              hinaus verarbeitet Vercel technische Daten nach Maßgabe der
              eigenen Datenschutzbestimmungen.
            </>
          )}
        </p>

        <p>
          Die Nutzung der Vercel-Dienste erfolgt auf Grundlage des von Vercel
          bereitgestellten Vertrags zur Auftragsverarbeitung. Eine Verarbeitung
          personenbezogener Daten kann auch in den USA stattfinden. Vercel ist
          nach dem EU-US Data Privacy Framework zertifiziert. Soweit eine
          Datenübermittlung nicht auf diesen Angemessenheitsbeschluss gestützt
          werden kann, dienen die Standardvertragsklauseln der Europäischen
          Kommission als zusätzliche Übermittlungsgrundlage.
        </p>
      </LegalSection>

      <LegalSection title="4. Nutzung der digitalen Werkzeuge">
        <p>
          Die im Rezept- und Einkaufsplaner eingegebenen Daten werden
          ausschließlich lokal im Browser verarbeitet. Eine Übermittlung der
          Rezept-, Mengen- oder Einkaufsdaten an uns oder an Dritte findet
          nicht statt. Die Anwendung speichert diese Eingaben nicht dauerhaft.
          Bei Nutzung der Funktion „Kopieren“ wird die erzeugte Einkaufsliste
          auf Veranlassung des Nutzers in die Zwischenablage seines Endgeräts
          übertragen.
        </p>

        <p>
          Sofern Eingaben ausschließlich lokal im Browser verarbeitet werden,
          erhalten wir diese Inhalte nicht. Werden künftig Konten,
          Synchronisierung, Speicherung oder andere serverseitige Funktionen
          eingeführt, wird diese Datenschutzerklärung vor deren Aktivierung
          entsprechend ergänzt.
        </p>
      </LegalSection>

      <LegalSection title="5. Lokale Speicherung, Cookies und ähnliche Technologien">
        <p>
          elab.shop setzt derzeit keine eigenen Cookies ein. Auch Local Storage,
          Session Storage, IndexedDB oder vergleichbare dauerhafte
          Speicherbereiche des Browsers werden nicht genutzt. Eingaben in die
          angebotenen Werkzeuge werden lediglich vorübergehend im
          Arbeitsspeicher des Browsers verarbeitet und nicht dauerhaft auf dem
          Endgerät gespeichert. Beim Neuladen der Seite werden diese Eingaben
          verworfen.
        </p>
      </LegalSection>

      <LegalSection title="6. Kontaktaufnahme">
        <p>
          Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen
          übermittelten Angaben zur Bearbeitung Ihrer Anfrage und möglicher
          Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn
          Ihre Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen
          gerichtet ist; im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Unser
          berechtigtes Interesse liegt in der sachgerechten Bearbeitung Ihrer
          Anfrage.
        </p>

        <p>
          Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet
          ist und keine gesetzlichen Aufbewahrungspflichten oder sonstigen
          berechtigten Gründe für eine weitere Speicherung bestehen.
        </p>
      </LegalSection>

      <LegalSection title="7. Zahlungen und Kundenkonten">
        <p>
          Kostenpflichtige Angebote, Kundenkonten und die Zahlungsabwicklung
          sind für Besucher von elab.shop derzeit noch nicht aktiviert. Daher
          erheben oder übermitteln wir derzeit keine personenbezogenen Daten zur
          Registrierung, Abonnementverwaltung oder Abwicklung von
          Kundenzahlungen.
        </p>

        <p>
          Vor der Aktivierung dieser Funktionen wird diese
          Datenschutzerklärung um Angaben zu den jeweils verarbeiteten Daten,
          den Verarbeitungszwecken, Rechtsgrundlagen, Empfängern,
          Speicherdauern und gegebenenfalls Drittlandübermittlungen ergänzt.
        </p>
      </LegalSection>

      <LegalSection title="8. Analyse- und Marketingdienste">
        <p>
          Wir setzen derzeit keine Analyse-, Tracking- oder Marketingdienste
          ein. Insbesondere erstellen wir keine personenbezogenen
          Nutzungsprofile zu Analyse- oder Werbezwecken und übermitteln zu
          diesen Zwecken keine personenbezogenen Daten an entsprechende
          Drittanbieter.
        </p>
      </LegalSection>

      <LegalSection title="9. Rechtsgrundlagen">
        <ul className="list-disc space-y-2 pl-5">
          <li>Art. 6 Abs. 1 lit. a DSGVO bei erteilter Einwilligung,</li>
          <li>
            Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung oder Durchführung
            vorvertraglicher Maßnahmen,
          </li>
          <li>
            Art. 6 Abs. 1 lit. c DSGVO zur Erfüllung rechtlicher Pflichten,
          </li>
          <li>
            Art. 6 Abs. 1 lit. f DSGVO zur Wahrung berechtigter Interessen,
            sofern nicht Ihre Interessen oder Grundrechte überwiegen.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Speicherdauer">
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie dies für
          den jeweiligen Zweck erforderlich ist. Darüber hinaus können
          gesetzliche Aufbewahrungsfristen oder die Sicherung und Durchsetzung
          rechtlicher Ansprüche eine weitere Speicherung erfordern.
        </p>
      </LegalSection>

      <LegalSection title="11. Ihre Rechte">
        <p>
          Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht
          auf:
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>Auskunft über Ihre verarbeiteten personenbezogenen Daten,</li>
          <li>Berichtigung unrichtiger oder unvollständiger Daten,</li>
          <li>Löschung oder Einschränkung der Verarbeitung,</li>
          <li>Widerspruch gegen bestimmte Verarbeitungen,</li>
          <li>Datenübertragbarkeit, soweit die Voraussetzungen vorliegen,</li>
          <li>
            Widerruf einer Einwilligung mit Wirkung für die Zukunft, ohne dass
            die Rechtmäßigkeit der bisherigen Verarbeitung berührt wird.
          </li>
        </ul>

        <p>
          Außerdem haben Sie das Recht, sich bei einer
          Datenschutz-Aufsichtsbehörde zu beschweren.
        </p>
      </LegalSection>

      <LegalSection title="12. Automatisierte Entscheidungen">
        <p>
          Eine ausschließlich automatisierte Entscheidungsfindung
          einschließlich Profiling mit rechtlicher oder ähnlich erheblicher
          Wirkung findet derzeit nicht statt.
        </p>
      </LegalSection>

      <LegalSection title="13. Sicherheit und Aktualisierung">
        <p>
          Wir treffen angemessene technische und organisatorische Maßnahmen zum
          Schutz personenbezogener Daten. Diese Datenschutzerklärung wird
          angepasst, sobald sich Funktionen, Dienstleister oder gesetzliche
          Anforderungen ändern.
        </p>
      </LegalSection>

      <LegalSection title="Stand">
        <p>5. August 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
