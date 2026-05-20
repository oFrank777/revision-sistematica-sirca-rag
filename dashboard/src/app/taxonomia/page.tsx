import { getTaxonomy, getPapers } from "@/lib/data";
import { TaxonomyClient } from "@/components/taxonomia/TaxonomyClient";

export const dynamic = "force-static";

export default async function TaxonomyPage() {
  const taxonomy = await getTaxonomy();
  const papers = await getPapers();

  return <TaxonomyClient taxonomy={taxonomy} papers={papers} />;
}
