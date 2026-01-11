export const LOCATIONS = [
  { id: "munich", label: "MUNICH" },
  { id: "coburg", label: "COBURG" },
] as const;

export type LocationId = (typeof LOCATIONS)[number]["id"];
