import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "IBMPlexSans",
  fonts: [
    {
      src: "/fonts/IBMPlexSans-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "/fonts/IBMPlexSans-Medium.ttf",
      fontWeight: 500,
    },
    {
      src: "/fonts/IBMPlexSans-SemiBold.ttf",
      fontWeight: 600,
    },
    {
      src: "/fonts/IBMPlexSans-Bold.ttf",
      fontWeight: 700,
    },
 ], 
});

Font.registerHyphenationCallback((word) => [word]);

export type RecipePdfIngredient = {
  name: string;
  amount: string;
  unit?: string;
  detail?: string;
};

type RecipePdfDocumentProps = {
  recipeName: string;
  basePortions: number;
  targetPortions: number;
  ingredients: RecipePdfIngredient[];
};

const styles = StyleSheet.create({
  page: {
    size: "A4",
    paddingTop: 54,
    paddingRight: 54,
    paddingBottom: 66,
    paddingLeft: 54,
    fontFamily: "IBMPlexSans",
    fontWeight: 400,
    fontSize: 10,
    color: "#111111",
    lineHeight: 1.35,
  },

  titleBlock: {
    marginBottom: 22,
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: -0.2,
    color: "#999999",
    marginBottom: 10,
  },

  titleRule: {
    height: 2,
    backgroundColor: "#999999",
    width: "100%",
    marginBottom: 12,
  },

  meta: {
    flexDirection: "row",
    gap: 6,
    fontSize: 9.5,
    color: "#444444",
  },

  metaStrong: {
    fontWeight: 700,
    color: "#111111",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 9,
  },

  table: {
    width: "100%",
  },

  tableHeader: {
    flexDirection: "row",
    paddingBottom: 6,
    marginBottom: 3,
    borderBottomWidth: 0.7,
    borderBottomColor: "#666666",
  },

  headerText: {
    fontSize: 8,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#666666",
  },

  row: {
    flexDirection: "row",
    minHeight: 25,
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
  },

  amountColumn: {
    width: 76,
    paddingRight: 8,
  },

  amountValue: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
  },

  amountPrefix: {
    width: 17,
    paddingRight: 3,
    textAlign: "right",
  },

  amountWhole: {
    width: 25,
    textAlign: "right",
  },

  amountSeparator: {
    width: 4,
    textAlign: "center",
  },

  amountFraction: {
    width: 14,
    textAlign: "left",
  },

  unitColumn: {
    width: 82,
    paddingRight: 18,
  },

  ingredientColumn: {
    flexGrow: 1,
    flexShrink: 1,
  },

  amount: {
    fontWeight: 600,
    fontVariant: "tabular-nums",
  },

  unit: {
    color: "#666666",
  },

  ingredient: {
    fontSize: 10.5,
  },

  detail: {
    marginTop: 1.5,
    fontSize: 8.5,
    color: "#666666",
  },

    footer: {
    position: "absolute",
    left: 54,
    right: 54,
    bottom: 36,
    fontSize: 8,
    color: "#888888",
    textAlign: "center",
  },
});

function PdfAmount({ value }: { value: string }) {
  const match = value.match(/^(ca\.\s*)?(-?\d+)(?:,(\d{1,2}))?$/);

  if (!match) {
    return (
      <Text style={[styles.amountColumn, styles.amount]}>
        {value}
      </Text>
    );
  }

  const prefix = match[1]?.trim() ?? "";
  const whole = match[2];
  const fraction = match[3] ?? "";

  return (
    <View style={[styles.amountColumn, styles.amountValue]}>
      <Text style={[styles.amount, styles.amountPrefix]}>
        {prefix}
      </Text>

      <Text style={[styles.amount, styles.amountWhole]}>
        {whole}
      </Text>

      <Text style={[styles.amount, styles.amountSeparator]}>
        {fraction ? "," : ""}
      </Text>

      <Text style={[styles.amount, styles.amountFraction]}>
        {fraction}
      </Text>
    </View>
  );
}

export default function RecipePdfDocument({
  recipeName,
  basePortions,
  targetPortions,
  ingredients,
}: RecipePdfDocumentProps) {
  return (
    <Document
      title={recipeName || "Rezept"}
      author="elab.shop"
      subject="Skaliertes Rezept"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>
            {recipeName.trim() || "Rezept"}
          </Text>

          <View style={styles.titleRule} />

          <View style={styles.meta}>
            <Text>
              Ausgangsmenge:{" "}
              <Text style={styles.metaStrong}>{basePortions}</Text>
            </Text>

            <Text>·</Text>

            <Text>
              Zielmenge:{" "}
              <Text style={styles.metaStrong}>{targetPortions}</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Einkaufsliste</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.amountColumn]}>
              Menge
            </Text>

            <Text style={[styles.headerText, styles.unitColumn]}>
              Einheit
            </Text>

            <Text style={[styles.headerText, styles.ingredientColumn]}>
              Zutat
            </Text>
          </View>

          {ingredients.map((ingredient, index) => (
            <View
              key={`${ingredient.name}-${index}`}
              style={styles.row}
              wrap={false}
            >
              <PdfAmount value={ingredient.amount} />

              <Text style={[styles.unitColumn, styles.unit]}>
                {ingredient.unit ?? ""}
              </Text>

              <View style={styles.ingredientColumn}>
                <Text style={styles.ingredient}>
                  {ingredient.name}
                </Text>

                {ingredient.detail && (
                  <Text style={styles.detail}>
                    {ingredient.detail}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer} fixed>
          https://www.elab.shop
        </Text>
      </Page>
    </Document>
  );
}
