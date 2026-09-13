import type { CollectibleRank } from "../types/collectibles";

type CollectibleRankStyle = {
  border: string;
  badge: string;
  label: string;
  radialGradient: string;
  text: string;
};

export const COLLECTIBLE_RANK_STYLES: Record<CollectibleRank, CollectibleRankStyle> = {
  NORMAL: { border: "border-gray-03", badge: "bg-label-bg-01 text-label-text-01", label: "일반", radialGradient: "radial-gradient(circle, #E4E7EB 0%, #F1F2F4 48%, #FFFFFF 72%)", text: "text-label-text-01" },
  RARE: { border: "border-label-text-02/25", badge: "bg-label-bg-02 text-label-text-02", label: "희귀", radialGradient: "radial-gradient(circle, #D7ECFA 0%, #E8F5FF 48%, #FFFFFF 72%)", text: "text-label-text-02" },
  EPIC: { border: "border-label-text-03/25", badge: "bg-label-bg-03 text-label-text-03", label: "영웅", radialGradient: "radial-gradient(circle, #E8DAF7 0%, #F3ECFF 48%, #FFFFFF 72%)", text: "text-label-text-03" },
  LEGENDARY: { border: "border-label-text-04/25", badge: "bg-label-bg-04 text-label-text-04", label: "전설", radialGradient: "radial-gradient(circle, #FBE4B5 0%, #FFF3D6 48%, #FFFFFF 72%)", text: "text-label-text-04" },
};
