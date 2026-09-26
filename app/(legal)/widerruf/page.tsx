import Link from "next/link";

import type { Metadata } from "next";

import LegalPage, { LegalSection } from "../../../components/LegalPage";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung | elab",
  description: "Widerrufsbelehrung für elab Pro.",
};

export default function WiderrufPage() {
  return (
    <LegalPage
      title="Widerrufsbelehrung"
      intro="Informationen zum Widerrufsrecht für Verbraucher bei Verträgen über elab Pro."
    >
    <div className="mb-8">
      <Link
        href="/widerruf/erklaeren"
        className="inline-flex rounded-[1rem] bg-slate-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-600"
      >
        Vertrag widerrufen
      </Link>
    </div>
      <LegalSection title="Widerrufsrecht">
        <p>
          Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
          diesen Vertrag zu widerrufen.
        </p>

        <p>
          Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
          Vertragsabschlusses.
        </p>

        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
        </p>

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
          Telefon: +49 69 456922
          <br />
          E-Mail: info@elab.shop
        </address>

        <p>
          mittels einer eindeutigen Erklärung, zum Beispiel eines mit der Post
          versandten Briefes oder einer E-Mail, über Ihren Entschluss
          informieren, diesen Vertrag zu widerrufen.
        </p>

        <p>
          Sie können dafür das unten aufgeführte Muster-Widerrufsformular
          verwenden, das jedoch nicht vorgeschrieben ist.
        </p>

        <p>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
          über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
          absenden.
        </p>
      </LegalSection>

      <LegalSection title="Folgen des Widerrufs">
        <p>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
          die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen
          vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
          Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
        </p>

        <p>
          Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie
          bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit
          Ihnen wurde ausdrücklich etwas anderes vereinbart. In keinem Fall
          werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
        </p>
      </LegalSection>

      <LegalSection title="Muster-Widerrufsformular">
        <p>
          Wenn Sie den Vertrag widerrufen wollen, können Sie dieses Formular
          verwenden und an uns senden:
        </p>

        <div className="space-y-4">
          <p>
            An:
            <br />
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
            Telefon: +49 69 456922
            <br />
            E-Mail: info@elab.shop
          </p>

          <p>
            Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag
            über die Erbringung der folgenden Dienstleistung:
          </p>

          <p>________________________________________</p>

          <p>
            Bestellt am:
            <br />
            ________________________________________
          </p>

          <p>
            Name des/der Verbraucher(s):
            <br />
            ________________________________________
          </p>

          <p>
            Anschrift des/der Verbraucher(s):
            <br />
            ________________________________________
          </p>

          <p>
            Unterschrift des/der Verbraucher(s), nur bei Mitteilung auf Papier:
            <br />
            ________________________________________
          </p>

          <p>
            Datum:
            <br />
            ________________________________________
          </p>
        </div>
      </LegalSection>

      <LegalSection title="Stand">
        <p>24. September 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
