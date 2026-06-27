export type PoiCategory =
  | "railway"
  | "old town"
  | "cathedral"
  | "river"
  | "lake"
  | "mountain"
  | "castle"
  | "vineyard"
  | "city walk"
  | "market"
  | "garden"
  | "shopping"
  | "museum"
  | "museum/exterior";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  intro: string;
  guideScript: string;
  guideAudioUrl: string;
  guideAudioDuration: string;
  accent: string;
};

export type Poi = {
  id: string;
  destinationSlug: string;
  destination: string;
  region: string;
  title: string;
  subtitle: string;
  locationName: string;
  latitude: number;
  longitude: number;
  category: PoiCategory;
  recommendedVisitDuration: string;
  audioDuration: string;
  script: string;
  summary?: string;
  audioUrl: string;
  tags: string[];
  nextPoiId?: string;
};
