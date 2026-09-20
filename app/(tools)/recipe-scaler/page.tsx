import RecipeScalerApp from "../../../components/recipe-scaler/RecipeScalerApp";
import { getProAccess } from "@/lib/pro-access";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { isPro } = await getProAccess();

  return <RecipeScalerApp isPro={isPro} />;
}
