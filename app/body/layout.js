import BodyShell from "@/components/body/BodyShell";

export const metadata = {
  title: {
    default: "Inside You · 3D Organs",
    template: "%s in 3D · Health Calendar 2027",
  },
  description: "Explore the heart, lungs, brain and more in interactive 3D — see how they work and how to keep them healthy.",
};

export default function BodyLayout({ children }) {
  return <BodyShell>{children}</BodyShell>;
}
