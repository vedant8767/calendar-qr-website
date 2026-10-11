import {
  Activity,
  Baby,
  Bug,
  Droplet,
  Gauge,
  HeartPulse,
  Ribbon,
  ShieldPlus,
  Wind,
} from "lucide-react";

const campaignIcons = {
  activity: Activity,
  baby: Baby,
  bug: Bug,
  droplet: Droplet,
  gauge: Gauge,
  heart: HeartPulse,
  ribbon: Ribbon,
  shield: ShieldPlus,
  wind: Wind,
};

export function CampaignIcon({ name, ...props }) {
  const Icon = campaignIcons[name] ?? Ribbon;
  return <Icon {...props} />;
}
