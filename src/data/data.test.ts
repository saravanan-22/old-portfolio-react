import { describe, expect, it } from "vitest";
import { certifications, education } from "./education";
import { featuredProjects, miniProjects, showcaseShots } from "./projects";
import { socials } from "./site";
import { skills, tech } from "./tech";

const isHttps = (url: string) => new URL(url).protocol === "https:";

describe("portfolio data", () => {
  it("featured projects have screenshots, a known stack and https links", () => {
    for (const p of featuredProjects) {
      expect(p.images.length).toBeGreaterThan(1);
      for (const key of p.stack) expect(tech).toHaveProperty(key);
      expect(isHttps(p.code)).toBe(true);
      expect(isHttps(p.demo ?? "https://none")).toBe(true);
    }
  });

  it("loads screenshots in numeric order (2 before 10)", () => {
    const oqdb = featuredProjects.find((p) => p.slug === "open-question-database")!;
    expect(oqdb.images).toHaveLength(13);
    expect(oqdb.images[1]).toMatch(/oqdb-2/);
    expect(oqdb.images[9]).toMatch(/oqdb-10/);
  });

  it("mini projects each point at their own source folder", () => {
    const codeLinks = miniProjects.map((p) => p.code);
    expect(new Set(codeLinks).size).toBe(codeLinks.length);
    for (const p of miniProjects) expect(isHttps(p.code)).toBe(true);
  });

  it("has unique keys for lists", () => {
    expect(new Set(skills).size).toBe(skills.length);
    expect(new Set(education.map((e) => e.year)).size).toBe(education.length);
    expect(new Set(certifications.map((c) => c.title)).size).toBe(certifications.length);
    expect(new Set(featuredProjects.map((p) => p.slug)).size).toBe(featuredProjects.length);
  });

  it("socials and showcase are populated", () => {
    expect(socials.every((s) => isHttps(s.href))).toBe(true);
    expect(showcaseShots.length).toBeGreaterThan(0);
  });
});
