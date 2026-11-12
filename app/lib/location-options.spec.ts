import { describe, expect, it } from "vitest";

import { locationCitiesByState, locationStatesByCountry } from "./location-options";

describe("location form options", () => {
  it("offers states and cities that match the selected country", () => {
    expect(locationStatesByCountry.Canada).toContain("Ontario");
    expect(locationStatesByCountry["United Kingdom"]).toContain("England");
    expect(locationCitiesByState.Ontario).toContain("Toronto");
    expect(locationCitiesByState.England).toContain("London");
    expect(locationCitiesByState.Telangana).toContain("Hyderabad");
  });

  it("does not supply unrelated options for an unknown selection", () => {
    expect(locationStatesByCountry.Unknown).toBeUndefined();
    expect(locationCitiesByState.Unknown).toBeUndefined();
  });
});
