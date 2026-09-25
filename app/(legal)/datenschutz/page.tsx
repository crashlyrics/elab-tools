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
          können technisch erforderliche Verbindungs- und Protokolldaten verarbeitet
          werden. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
          aufgerufene Seite oder Datei, Referrer-URL, Browsertyp, Betriebssystem sowie
          der HTTP-Statuscode gehören.
        </p>

        <p>
          Die Verarbeitung erfolgt zur sicheren, stabilen und effizienten
          Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
          Unser berechtigtes Interesse liegt im sicheren und funktionsfähigen Betrieb
          des Online-Angebots.
        </p>

        <p>
          Hosting-Dienstleister ist Vercel Inc., USA. Vercel verarbeitet technische
          Daten im Rahmen der Bereitstellung und des Betriebs der Website. Dabei kann
          eine Verarbeitung personenbezogener Daten auch in den USA oder in anderen
          Staaten stattfinden, in denen Vercel oder von Vercel eingesetzte
          Unterauftragnehmer Daten verarbeiten.
        </p>

        <p>
          Vercel ist nach dem EU-US Data Privacy Framework zertifiziert. Soweit eine
          Übermittlung personenbezogener Daten nicht auf einen
          Angemessenheitsbeschluss gestützt werden kann, sieht Vercel weitere
          geeignete Übermittlungsmechanismen vor, insbesondere die
          Standardvertragsklauseln der Europäischen Kommission.
        </p>
      </LegalSection>

      <LegalSection title="4. Nutzung der digitalen Werkzeuge">
        <p>
          Die im Rezept- und Einkaufsplaner eingegebenen Rezept-, Mengen- und
          Einkaufsdaten werden derzeit ausschließlich lokal im Browser verarbeitet.
          Eine Übermittlung dieser Inhalte an elab oder an Dritte findet nicht statt.
          Die Anwendung speichert diese Eingaben derzeit nicht dauerhaft.
        </p>

        <p>
          Bei Nutzung der Funktion „Kopieren“ wird die erzeugte Einkaufsliste auf
          Veranlassung des Nutzers in die Zwischenablage seines Endgeräts übertragen.
          Auch der PDF-Export wird lokal im Browser erzeugt. Eine dauerhafte
          Speicherung der dabei verwendeten Rezept- oder Einkaufsdaten durch elab
          findet derzeit nicht statt.
        </p>

        <p>
          Hiervon zu unterscheiden sind die für das Kundenkonto, die Freischaltung
          von elab Pro und die Zahlungsabwicklung erforderlichen Daten. Diese werden
          serverseitig verarbeitet und in den nachfolgenden Abschnitten beschrieben.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies und lokale Speicherung">
        <p>
          Für die Anmeldung und die Aufrechterhaltung einer angemeldeten Sitzung
          werden technisch erforderliche Cookies verwendet. Sie dienen dazu, einen
          angemeldeten Nutzer wiederzuerkennen und den Zugriff auf das Kundenkonto
          sowie auf freigeschaltete Funktionen von elab Pro zu ermöglichen.
        </p>

        <p>
          Für die Authentifizierung wird Neon Auth eingesetzt. Dabei werden
          insbesondere Sitzungsinformationen verarbeitet. Die hierfür verwendeten
          Session-Cookies sind für die Bereitstellung der vom Nutzer gewünschten
          Anmelde- und Kontofunktionen erforderlich.
        </p>

        <p>
          Cookies zu Analyse-, Werbe- oder Marketingzwecken werden derzeit nicht
          eingesetzt.
        </p>

        <p>
          Die in den Online-Werkzeugen eingegebenen Rezept-, Mengen- und
          Einkaufsdaten werden derzeit nicht mittels Local Storage, Session Storage,
          IndexedDB oder vergleichbarer dauerhafter Speicherbereiche des Browsers
          gespeichert. Beim Neuladen der Seite werden diese Eingaben verworfen.
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

      <LegalSection title="7. Kundenkonto, Authentifizierung und Zahlungen">
        <p>
          Für die Nutzung von elab Pro ist ein persönliches Kundenkonto erforderlich.
          Dabei werden insbesondere die angegebene E-Mail-Adresse, eine interne
          Benutzerkennung sowie die für Anmeldung und Sitzungsverwaltung erforderlichen
          Authentifizierungsdaten verarbeitet. Wird freiwillig ein Passwort eingerichtet,
          wird dieses nicht im Klartext gespeichert.
        </p>

        <p>
          Für Kundenkonto, Authentifizierung und Datenbankfunktionen wird Neon eingesetzt.
          Dort werden die für das Kundenkonto und die Bereitstellung von elab Pro
          erforderlichen Daten verarbeitet. Hierzu gehören insbesondere die Zuordnung
          des Kundenkontos, Tarif, Zugangsstatus und Gültigkeitszeitraum sowie technische
          Referenzen, die zur Zuordnung von Zahlungen und Abonnements erforderlich sind.
          Die Verarbeitung erfolgt zur Durchführung des Vertrags beziehungsweise
          vorvertraglicher Maßnahmen auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
        </p>

        <p>
          Für den Versand von Anmeldelinks und sonstigen für das Kundenkonto
          erforderlichen E-Mails wird die E-Mail-Infrastruktur von STRATO eingesetzt.
          Dabei werden insbesondere die E-Mail-Adresse sowie die für den Versand
          erforderlichen technischen Daten verarbeitet. Die Verarbeitung erfolgt,
          soweit sie der Bereitstellung des Kundenkontos oder der Vertragsdurchführung
          dient, auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
        </p>

        <p>
          Für die Zahlungsabwicklung wird Mollie als Zahlungsdienstleister eingesetzt.
          Im Rahmen einer Zahlung verarbeitet Mollie die für die gewählte Zahlungsart
          erforderlichen personenbezogenen und zahlungsbezogenen Daten. elab verarbeitet
          zur Zuordnung und Verwaltung des Vertrags insbesondere Zahlungsstatus,
          Transaktions- und Kundenreferenzen sowie bei wiederkehrenden Zahlungen die
          erforderlichen Abonnementreferenzen.
        </p>

        <p>
          Mollie verarbeitet personenbezogene Daten im Zusammenhang mit
          Zahlungstransaktionen in eigener datenschutzrechtlicher Verantwortung. Weitere
          Informationen zur Verarbeitung durch Mollie ergeben sich aus der
          Datenschutzerklärung von Mollie.
        </p>

        <p>
          Vertrags-, Zahlungs- und Zugangsdaten werden so lange gespeichert, wie dies
          für die Durchführung und Abwicklung des Vertrags erforderlich ist. Soweit
          gesetzliche Aufbewahrungspflichten bestehen oder Daten zur Geltendmachung,
          Ausübung oder Verteidigung von Rechtsansprüchen benötigt werden, kann eine
          längere Speicherung erfolgen.
        </p>

        <p>
          Neon verarbeitet personenbezogene Daten als Auftragsverarbeiter im Auftrag
          von elab. Eine Verarbeitung kann dabei auch in den USA oder in anderen
          Staaten erfolgen, in denen Neon oder von Neon eingesetzte Unterauftragnehmer
          tätig sind. Für Übermittlungen europäischer personenbezogener Daten sieht
          Neon geeignete Übermittlungsmechanismen vor, insbesondere das EU-US Data
          Privacy Framework und, soweit erforderlich, die Standardvertragsklauseln der
          Europäischen Kommission.
        </p>
      </LegalSection>

      <LegalSection title="8. Analyse- und Marketingdienste">
        <p>
          elab.shop setzt derzeit keine Analyse-, Tracking- oder
          Marketingdienste ein.
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
        <p>24. September 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
