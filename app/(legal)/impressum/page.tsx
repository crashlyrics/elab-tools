import type { Metadata } from "next";

import LegalPage, {
  LegalPlaceholder,
  LegalSection,
} from "../../../components/LegalPage";

export const metadata: Metadata = {
  title: "Impressum | elab",
  description: "Impressum und Anbieterinformationen von elab.shop",
};

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      intro="Anbieterkennzeichnung und Kontaktinformationen für elab.shop."
    >
      <LegalSection title="Angaben gemäß § 5 DDG">
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
        </address>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          E-Mail:{" "}
          <a
            href="mailto:info@elab.shop"
            className="text-slate-800 transition hover:text-slate-950"
          >
            info@elab.shop
          </a>
          <br />
          Telefon: +49 69 456922
        </p>
      </LegalSection>

      <LegalSection title="Unternehmensangaben">
        <p>
          Rechtsform: Einzelunternehmen
          <br />
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{" "}
          DE176691657
          <br />
          Wirtschafts-Identifikationsnummer:{" "}
          DE176691657-00001
        </p>
      </LegalSection>

      <LegalSection title="Stand">
        <p>4. August 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
