import type { Metadata } from "next";

import LegalPage, { LegalSection } from "../../../components/LegalPage";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen | elab",
  description:
    "Allgemeine Geschäftsbedingungen für die kostenpflichtige Nutzung von elab Pro.",
};

const numberedList = "list-decimal space-y-3 pl-5";
const letteredList = "list-[lower-alpha] space-y-2 pl-5";
const bulletList = "list-disc space-y-2 pl-5";

export default function AgbPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen für elab Pro"
      intro="Vertragsbedingungen für das elab Pro Monatsabo und den elab Pro Jahreszugang."
    >
      <LegalSection title="1. Anbieter und Geltungsbereich">
        <ol className={numberedList}>
          <li>
            <p>Anbieter von elab Pro ist:</p>
            <address className="mt-3 not-italic">
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
            <p className="mt-3">nachfolgend „elab“ genannt.</p>
          </li>
          <li>
            Diese Allgemeinen Geschäftsbedingungen gelten für kostenpflichtige
            Verträge über die Nutzung von elab Pro, die über elab.shop
            geschlossen werden.
          </li>
          <li>
            Für die unentgeltliche Nutzung der frei zugänglichen Werkzeuge
            gelten ergänzend die Hinweise zur Nutzung auf elab.shop.
          </li>
          <li>
            Abweichende Bedingungen des Kunden werden nicht
            Vertragsbestandteil, sofern elab ihrer Geltung nicht ausdrücklich
            zugestimmt hat.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="2. Vertragsgegenstand">
        <ol className={numberedList}>
          <li>
            elab Pro ermöglicht dem Kunden die Nutzung erweiterter Funktionen
            der auf elab.shop angebotenen browserbasierten Online-Werkzeuge.
          </li>
          <li>
            Der konkrete Leistungsumfang richtet sich nach der Beschreibung des
            gewählten Tarifs, die dem Kunden bei Abschluss des Vertrags
            angezeigt wird.
          </li>
          <li>
            elab Pro wird als digitale Dienstleistung über das Internet
            bereitgestellt. Eine Überlassung von Software zur dauerhaften
            Installation auf einem Gerät des Kunden ist nicht geschuldet.
          </li>
          <li>
            Beim <strong>elab Pro Monatsabo</strong> können bis zu zehn
            Rezepturen gleichzeitig im Kundenkonto gespeichert und verwaltet
            werden.
          </li>
          <li>
            Der <strong>elab Pro Jahreszugang</strong> umfasst ein
            Rezeptarchiv ohne tarifbedingte zahlenmäßige Begrenzung. Dies
            bezieht sich auf die Anzahl der Rezepturen im Rahmen einer
            gewöhnlichen vertragsgemäßen Nutzung und bedeutet nicht die
            Bereitstellung unbegrenzten allgemeinen Datei- oder
            Onlinespeichers.
          </li>
          <li>
            Maßgeblich ist der bei Vertragsschluss ausdrücklich angegebene
            Leistungsumfang. Lediglich angekündigte, geplante oder noch nicht
            veröffentlichte Funktionen sind nicht Bestandteil des Vertrags.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="3. Berechnungsergebnisse und Verantwortung des Kunden">
        <ol className={numberedList}>
          <li>
            Die von den Online-Werkzeugen ausgegebenen Ergebnisse beruhen auf
            den Angaben und Eingaben des Kunden.
          </li>
          <li>
            Der Kunde ist dafür verantwortlich, die von ihm eingegebenen
            Ausgangsdaten auf Richtigkeit und Vollständigkeit zu prüfen.
          </li>
          <li>
            Die Werkzeuge ersetzen keine individuelle fachliche, rechtliche
            oder sicherheitsbezogene Prüfung einer Rezeptur. Insbesondere
            bleibt der Kunde dafür verantwortlich, vor einer praktischen
            Verwendung zu prüfen, ob eine Rezeptur für den vorgesehenen Zweck
            geeignet und sicher ist und ob gesetzliche Kennzeichnungs-,
            Informations- oder sonstige Anforderungen eingehalten werden.
          </li>
          <li>
            Die gesetzlichen Rechte des Kunden bei einer fehlerhaften Funktion
            oder Berechnung des von elab bereitgestellten Werkzeugs bleiben
            unberührt.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="4. Technische Voraussetzungen und Kundenkonto">
        <ol className={numberedList}>
          <li>
            Für die Nutzung von elab Pro benötigt der Kunde einen
            Internetzugang, ein geeignetes Endgerät und einen aktuellen,
            marktüblichen Webbrowser.
          </li>
          <li>
            Für elab Pro ist ein persönliches Kundenkonto erforderlich. Der
            Kunde muss eine erreichbare E-Mail-Adresse angeben.
          </li>
          <li>
            <p>Die Anmeldung ist wahlweise möglich:</p>
            <ol className={`${letteredList} mt-3`}>
              <li>
                über einen zeitlich begrenzten Anmeldelink, der an die
                hinterlegte E-Mail-Adresse gesendet wird, oder
              </li>
              <li>
                mit der hinterlegten E-Mail-Adresse und einem freiwillig
                eingerichteten Passwort.
              </li>
            </ol>
          </li>
          <li>
            Die Einrichtung eines Passworts ist für die Nutzung von elab Pro
            nicht zwingend erforderlich.
          </li>
          <li>
            Der Kunde ist verpflichtet, den Zugang zu seinem E-Mail-Konto, sein
            Passwort und sonstige Zugangsdaten vor einem Zugriff durch
            unbefugte Dritte zu schützen.
          </li>
          <li>
            Bestehen Anhaltspunkte für eine unbefugte Nutzung des
            Kundenkontos, soll der Kunde elab unverzüglich informieren und sein
            Passwort ändern beziehungsweise einen neuen Anmeldelink anfordern.
          </li>
          <li>
            Das Kundenkonto ist persönlich und darf nicht ohne Zustimmung von
            elab auf eine andere Person übertragen oder dauerhaft gemeinsam
            mit Dritten genutzt werden.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="5. Vertragsschluss">
        <ol className={numberedList}>
          <li>
            Die Darstellung von elab Pro auf der Website stellt noch kein
            rechtlich bindendes Vertragsangebot dar.
          </li>
          <li>
            Der Kunde wählt den gewünschten Tarif aus, gibt die erforderlichen
            Angaben ein und wählt eine der angebotenen Zahlungsmethoden.
          </li>
          <li>
            Vor Abgabe der Bestellung werden dem Kunden insbesondere der
            gewählte Tarif, der Leistungsumfang, der Gesamtpreis, die Laufzeit
            und gegebenenfalls die automatische Verlängerung angezeigt.
            Eingabefehler können bis zur Abgabe der Bestellung berichtigt
            werden.
          </li>
          <li>
            Durch Betätigung der abschließenden, eindeutig auf die
            Zahlungspflicht hinweisenden Bestellschaltfläche gibt der Kunde ein
            verbindliches Angebot zum Abschluss des ausgewählten Vertrags ab.
          </li>
          <li>
            Der Vertrag kommt zustande, sobald elab die Annahme des Angebots
            per E-Mail bestätigt oder den Pro-Zugang freischaltet, je nachdem,
            welches Ereignis zuerst eintritt.
          </li>
          <li>
            Die Bestelldaten und die für den Vertrag geltenden Bestimmungen
            werden von elab gespeichert. Der Kunde erhält die
            Vertragsbestätigung einschließlich der bei Vertragsschluss
            geltenden Vertragsbestimmungen per E-Mail.
          </li>
          <li>Vertragssprache ist Deutsch.</li>
        </ol>
      </LegalSection>

      <LegalSection title="6. Preise, Zahlung und Rechnungen">
        <ol className={numberedList}>
          <li>
            Es gelten die bei Abgabe der Bestellung angezeigten Preise.
          </li>
          <li>
            Gegenüber Verbrauchern werden sämtliche Preise als Gesamtpreise
            einschließlich der gesetzlichen Umsatzsteuer angegeben.
          </li>
          <li>
            Beim Monatsabo wird der Preis für den jeweiligen monatlichen
            Abrechnungszeitraum im Voraus fällig.
          </li>
          <li>
            Beim Jahreszugang wird der Preis für die gesamten zwölf Monate im
            Voraus fällig.
          </li>
          <li>
            Die verfügbaren Zahlungsmethoden werden dem Kunden vor Abgabe der
            Bestellung angezeigt. Die Zahlungsabwicklung kann durch einen
            hierfür eingesetzten Zahlungsdienstleister erfolgen.
          </li>
          <li>
            Rechnungen und Zahlungsbelege werden dem Kunden in elektronischer
            Form zur Verfügung gestellt oder per E-Mail übersandt.
          </li>
          <li>
            Kann eine fällige Zahlung aus einem vom Kunden zu vertretenden
            Grund nicht ausgeführt werden, kann elab den Kunden zur
            Aktualisierung seiner Zahlungsdaten oder zur Begleichung des
            offenen Betrags auffordern.
          </li>
          <li>
            elab kann den Pro-Zugang nach vorheriger Mitteilung vorübergehend
            sperren, solange sich der Kunde mit einer fälligen Zahlung in
            Verzug befindet. Die gesetzlichen Rechte beider Parteien bleiben
            unberührt.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="7. Bereitstellung und Beginn des Nutzungszeitraums">
        <ol className={numberedList}>
          <li>
            elab Pro wird nach Zustandekommen des Vertrags und erfolgreicher
            Zahlungsbestätigung freigeschaltet.
          </li>
          <li>
            Das Monatsabo beziehungsweise der zwölfmonatige Jahreszugang
            beginnt mit der Freischaltung des Pro-Zugangs.
          </li>
          <li>
            Das nächste Abrechnungsdatum des Monatsabos wird dem Kunden im
            Bestellvorgang oder im Kundenkonto angezeigt.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="8. elab Pro Monatsabo">
        <ol className={numberedList}>
          <li>Das Monatsabo wird auf unbestimmte Zeit geschlossen.</li>
          <li>
            Es verlängert sich jeweils automatisch um einen weiteren
            monatlichen Abrechnungszeitraum, sofern es nicht gekündigt wird.
          </li>
          <li>
            Das Monatsabo kann jederzeit mit Wirkung zum Ende des laufenden,
            bereits bezahlten Abrechnungszeitraums gekündigt werden.
          </li>
          <li>
            Die Kündigung kann insbesondere über die auf elab.shop
            bereitgestellte Kündigungsfunktion oder in Textform, beispielsweise
            per E-Mail, erklärt werden.
          </li>
          <li>
            Nach Zugang der Kündigung erhält der Kunde eine elektronische
            Bestätigung mit dem Beendigungszeitpunkt.
          </li>
          <li>
            Bis zum Ende des bereits bezahlten Abrechnungszeitraums kann elab
            Pro weiter genutzt werden. Eine anteilige Erstattung für einen vom
            Kunden nicht genutzten Teil dieses Zeitraums erfolgt bei einer
            ordentlichen Kündigung nicht.
          </li>
          <li>
            Das Recht beider Parteien zur außerordentlichen Kündigung aus
            wichtigem Grund sowie sonstige gesetzliche Beendigungsrechte
            bleiben unberührt.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="9. elab Pro Jahreszugang">
        <ol className={numberedList}>
          <li>
            Der Jahreszugang wird für einen festen Zeitraum von zwölf Monaten
            geschlossen.
          </li>
          <li>
            Er endet nach Ablauf dieser zwölf Monate automatisch, ohne dass
            eine Kündigung erforderlich ist.
          </li>
          <li>Der Jahreszugang verlängert sich nicht automatisch.</li>
          <li>
            Eine ordentliche vorzeitige Kündigung verkürzt den vereinbarten
            Nutzungszeitraum nicht. Das gesetzliche Widerrufsrecht, die
            gesetzlichen Rechte bei einer nicht vertragsgemäßen Leistung und
            das Recht zur außerordentlichen Kündigung aus wichtigem Grund
            bleiben unberührt.
          </li>
          <li>
            elab kann den Kunden vor Ablauf des Jahreszugangs per E-Mail auf
            die Möglichkeit eines erneuten Vertragsabschlusses hinweisen.
          </li>
          <li>
            Für einen erneut bestellten Jahreszugang gilt der zum Zeitpunkt der
            neuen Bestellung angezeigte Preis.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="10. Tarifwechsel">
        <ol className={numberedList}>
          <li>
            Ein Wechsel vom Monatsabo zum Jahreszugang kann zum Ende des
            laufenden monatlichen Abrechnungszeitraums erfolgen.
          </li>
          <li>
            Nach dem Ende des Jahreszugangs kann der Kunde ein Monatsabo oder
            einen neuen Jahreszugang abschließen.
          </li>
          <li>
            Wechselt der Kunde aus einem Tarif mit unbegrenztem Rezeptarchiv in
            das Monatsabo und sind mehr als zehn Rezepturen gespeichert, kann
            er bestimmen, welche zehn Rezepturen im Monatsabo weiter bearbeitet
            werden sollen.
          </li>
          <li>
            Die übrigen Rezepturen bleiben zunächst nach Maßgabe von Abschnitt
            15 einsehbar und exportierbar.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="11. Verfügbarkeit, Wartung und Sicherheit">
        <ol className={numberedList}>
          <li>
            elab bemüht sich um eine möglichst unterbrechungsfreie
            Verfügbarkeit der digitalen Dienstleistung. Eine jederzeitige und
            vollständig störungsfreie Verfügbarkeit wird nicht zugesichert,
            sofern in der Leistungsbeschreibung keine bestimmte Verfügbarkeit
            ausdrücklich vereinbart wurde.
          </li>
          <li>
            Vorübergehende Einschränkungen können insbesondere durch
            erforderliche Wartungsarbeiten, Sicherheitsmaßnahmen, technische
            Störungen oder Umstände entstehen, die außerhalb des zumutbaren
            Einflussbereichs von elab liegen.
          </li>
          <li>
            Planbare Wartungsarbeiten, die zu einer wesentlichen Einschränkung
            führen, werden nach Möglichkeit rechtzeitig angekündigt und so
            durchgeführt, dass die Interessen der Kunden angemessen
            berücksichtigt werden.
          </li>
          <li>
            Die gesetzlichen Rechte des Kunden bei einer unterbliebenen oder
            nicht vertragsgemäßen Bereitstellung bleiben unberührt.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="12. Aktualisierungen und Änderungen an elab Pro">
        <ol className={numberedList}>
          <li>
            elab stellt während des vereinbarten Bereitstellungszeitraums die
            Aktualisierungen bereit, die erforderlich sind, um die
            Vertragsmäßigkeit, Funktionsfähigkeit und Sicherheit von elab Pro
            aufrechtzuerhalten.
          </li>
          <li>
            <p>
              elab kann darüber hinaus Änderungen vornehmen, wenn hierfür ein
              triftiger Grund besteht. Ein solcher Grund kann insbesondere
              vorliegen bei:
            </p>
            <ol className={`${letteredList} mt-3`}>
              <li>
                der Anpassung an geänderte gesetzliche oder behördliche
                Anforderungen,
              </li>
              <li>der Schließung von Sicherheitslücken,</li>
              <li>
                der Anpassung an technische Entwicklungen oder geänderte
                Browser- und Systemumgebungen,
              </li>
              <li>
                der Verbesserung der Bedienbarkeit oder Leistungsfähigkeit oder
              </li>
              <li>
                der Verhinderung von Missbrauch oder schädlichen Nutzungen.
              </li>
            </ol>
          </li>
          <li>
            Durch Änderungen nach Absatz 2 entstehen dem Kunden keine
            zusätzlichen Kosten.
          </li>
          <li>
            Beeinträchtigt eine Änderung die Zugriffsmöglichkeit oder
            Nutzbarkeit von elab Pro nicht nur unerheblich, informiert elab den
            Kunden innerhalb einer angemessenen Frist vor der Änderung per
            E-Mail. Die gesetzlichen Rechte des Kunden, insbesondere ein
            gegebenenfalls bestehendes Recht zur unentgeltlichen
            Vertragsbeendigung, bleiben unberührt.
          </li>
          <li>
            Zusätzliche Funktionen können ohne Mehrkosten bereitgestellt
            werden. Ein Anspruch darauf, dass jede später eingeführte Funktion
            in allen Tarifen enthalten ist, besteht nicht.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="13. Zulässige Nutzung">
        <ol className={numberedList}>
          <li>
            Der Kunde darf elab Pro ausschließlich im Rahmen des vereinbarten
            Funktionsumfangs und für rechtmäßige Zwecke nutzen.
          </li>
          <li>
            <p>Untersagt sind insbesondere:</p>
            <ol className={`${letteredList} mt-3`}>
              <li>
                die Umgehung von Zugriffsbeschränkungen oder tarifbedingten
                Begrenzungen,
              </li>
              <li>
                Eingriffe, die die Sicherheit, Stabilität oder
                Funktionsfähigkeit der Website beeinträchtigen können,
              </li>
              <li>
                automatisierte Zugriffe in einem Umfang, der über eine
                gewöhnliche vertragsgemäße Nutzung hinausgeht,
              </li>
              <li>
                das Einschleusen von Schadsoftware oder schädlichem
                Programmcode oder
              </li>
              <li>
                die Nutzung des Kundenkontos zur Bereitstellung eines eigenen
                Dienstes für eine unbestimmte Anzahl Dritter.
              </li>
            </ol>
          </li>
          <li>
            Bei einem erheblichen Verstoß kann elab den Kunden zunächst zur
            Unterlassung auffordern und den Zugang erforderlichenfalls
            vorübergehend beschränken.
          </li>
          <li>
            Eine sofortige Beschränkung ist zulässig, wenn dies zur Abwehr
            einer gegenwärtigen Gefahr für die Sicherheit oder
            Funktionsfähigkeit von elab Pro oder zum Schutz anderer Nutzer
            erforderlich ist.
          </li>
          <li>
            Weitergehende gesetzliche Rechte sowie der Grundsatz der
            Verhältnismäßigkeit bleiben unberührt.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="14. Rechte an Rezepturen und sonstigen Kundeninhalten">
        <ol className={numberedList}>
          <li>
            Die Rechte an den vom Kunden eingegebenen oder erstellten
            Rezepturen und sonstigen Inhalten verbleiben beim Kunden
            beziehungsweise beim jeweiligen Rechteinhaber.
          </li>
          <li>
            Der Kunde räumt elab die für die Vertragsdurchführung
            erforderlichen, nicht ausschließlichen und zeitlich auf die
            Vertragsabwicklung beschränkten Rechte ein, die Inhalte technisch
            zu speichern, zu verarbeiten, darzustellen, zu vervielfältigen und
            zum Abruf durch den Kunden bereitzuhalten.
          </li>
          <li>
            elab darf die gespeicherten Rezepturen nicht ohne eine gesonderte
            Rechtsgrundlage für Werbung, eine Veröffentlichung oder andere
            vertragsfremde Zwecke verwenden.
          </li>
          <li>
            Der Kunde darf nur Inhalte speichern, die nicht gegen geltendes
            Recht oder Rechte Dritter verstoßen.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="15. Rezepturen nach Tarifwechsel oder Vertragsende">
        <ol className={numberedList}>
          <li>
            Nach dem Ende des Pro-Zugangs werden die gespeicherten Rezepturen
            für mindestens 30 Tage in einen eingeschränkten Zugriffsmodus
            überführt.
          </li>
          <li>
            <p>Während dieses Zeitraums können die Rezepturen:</p>
            <ul className={`${bulletList} mt-3`}>
              <li>eingesehen,</li>
              <li>
                in einem von elab bereitgestellten gängigen Format exportiert
                und
              </li>
              <li>durch den Kunden gelöscht werden.</li>
            </ul>
          </li>
          <li>
            Eine weitere Bearbeitung vorhandener Rezepturen oder die
            Speicherung neuer Rezepturen ist während dieses
            Übergangszeitraums nicht möglich.
          </li>
          <li>
            Schließt der Kunde innerhalb des Übergangszeitraums erneut einen
            geeigneten Pro-Vertrag ab, können die noch vorhandenen Rezepturen
            wieder freigeschaltet werden.
          </li>
          <li>
            elab informiert den Kunden vor einer beabsichtigten endgültigen
            Löschung per E-Mail. Nach Ablauf des Übergangszeitraums können die
            Rezepturen gelöscht werden, sofern der Kunde nicht rechtzeitig
            einen Export oder eine weitere gesetzlich vorgesehene
            Bereitstellung verlangt hat.
          </li>
          <li>
            Gesetzliche Rechte des Kunden auf Bereitstellung der von ihm
            eingegebenen oder erstellten Inhalte bleiben unberührt.
          </li>
          <li>
            Gesetzlich aufzubewahrende Vertrags-, Rechnungs- und Zahlungsdaten
            sind von der Löschung der Rezepturen nicht betroffen.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="16. Gesetzliche Rechte bei Mängeln">
        <ol className={numberedList}>
          <li>
            Für Verbraucher gelten die gesetzlichen Vorschriften über Verträge
            zur Bereitstellung digitaler Produkte.
          </li>
          <li>
            Ist elab Pro nicht oder nicht vertragsgemäß bereitgestellt worden,
            stehen dem Kunden die gesetzlichen Rechte zu.
          </li>
          <li>
            Der Kunde kann Störungen oder Fehler über die im Impressum
            beziehungsweise im Kundenkonto angegebene Kontaktmöglichkeit
            melden.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="17. Haftung">
        <ol className={numberedList}>
          <li>
            <p>elab haftet unbeschränkt:</p>
            <ol className={`${letteredList} mt-3`}>
              <li>bei Vorsatz oder grober Fahrlässigkeit,</li>
              <li>
                bei schuldhafter Verletzung des Lebens, des Körpers oder der
                Gesundheit,
              </li>
              <li>nach den Vorschriften des Produkthaftungsgesetzes,</li>
              <li>im Umfang einer ausdrücklich übernommenen Garantie und</li>
              <li>bei arglistigem Verschweigen eines Mangels.</li>
            </ol>
          </li>
          <li>
            Bei leicht fahrlässiger Verletzung einer wesentlichen
            Vertragspflicht haftet elab auf den bei Vertragsschluss
            vorhersehbaren, vertragstypischen Schaden. Wesentliche
            Vertragspflichten sind solche Pflichten, deren Erfüllung die
            ordnungsgemäße Durchführung des Vertrags erst ermöglicht und auf
            deren Einhaltung der Kunde regelmäßig vertrauen darf.
          </li>
          <li>
            Im Übrigen ist die Haftung für Schäden ausgeschlossen, die durch
            eine leicht fahrlässige Pflichtverletzung verursacht wurden.
          </li>
          <li>
            Die vorstehenden Haftungsregelungen gelten entsprechend für
            gesetzliche Vertreter und Erfüllungsgehilfen von elab.
          </li>
          <li>
            Zwingende gesetzliche Ansprüche und Rechte des Kunden bei digitalen
            Produkten bleiben unberührt.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="18. Widerrufsrecht für Verbraucher">
        <p>
          Verbrauchern steht bei Vorliegen der gesetzlichen Voraussetzungen ein
          Widerrufsrecht zu. Einzelheiten ergeben sich aus der gesonderten
          Widerrufsbelehrung, die dem Verbraucher vor Abgabe seiner Bestellung
          zur Verfügung gestellt und anschließend per E-Mail übermittelt wird.
        </p>
      </LegalSection>

      <LegalSection title="19. Preise bei späteren Vertragsabschlüssen">
        <ol className={numberedList}>
          <li>
            Für ein bestehendes und ununterbrochen fortgeführtes Monatsabo gilt
            der bei Vertragsschluss vereinbarte Preis.
          </li>
          <li>
            Wird ein beendetes Monatsabo später neu abgeschlossen, handelt es
            sich um einen neuen Vertrag. Für diesen gilt der dann angezeigte
            Preis.
          </li>
          <li>
            Der Jahreszugang endet nach zwölf Monaten. Bei einer erneuten
            Bestellung gilt der zu diesem Zeitpunkt angezeigte Preis.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="20. Verbraucherstreitbeilegung">
        <p>
          elab ist weder verpflichtet noch bereit, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection title="21. Anwendbares Recht">
        <ol className={numberedList}>
          <li>Es gilt das Recht der Bundesrepublik Deutschland.</li>
          <li>
            Ist der Kunde Verbraucher und hat er seinen gewöhnlichen Aufenthalt
            in einem anderen Staat, bleiben zwingende
            Verbraucherschutzbestimmungen dieses Staates unberührt, soweit sie
            nach den anwendbaren gesetzlichen Vorschriften nicht durch eine
            Rechtswahl ausgeschlossen werden können.
          </li>
        </ol>
      </LegalSection>

      <LegalSection title="22. Schlussbestimmungen">
        <p>
          Sollte eine Bestimmung dieser Allgemeinen Geschäftsbedingungen ganz
          oder teilweise unwirksam sein oder werden, gelten an ihrer Stelle die
          gesetzlichen Vorschriften. Die Wirksamkeit der übrigen Bestimmungen
          bleibt unberührt.
        </p>
      </LegalSection>

      <LegalSection title="Stand">
        <p>5. August 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
