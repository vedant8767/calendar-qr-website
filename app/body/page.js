import OrganInfo from "@/components/body/OrganInfo";
import { organs } from "@/lib/organs";

export default function BodyPage() {
  return <OrganInfo slug={organs[0].slug} />;
}
