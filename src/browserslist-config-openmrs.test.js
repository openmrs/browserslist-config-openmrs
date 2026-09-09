const browserslist = require("browserslist");
const {
  mkdtempSync,
  mkdirSync,
  symlinkSync,
  rmSync,
  writeFileSync,
} = require("fs");
const { tmpdir } = require("os");
const { join, resolve } = require("path");
const queries = require("./browserslist-config-openmrs.js");

describe("browserslist-config-openmrs", () => {
  it("preserves the browser policy from frontend RFC 0003", () => {
    expect(queries).toEqual([
      "Last 2 Safari major versions",
      "Last 3 Edge major versions",
      "Last 5 Chrome major versions",
      "Last 3 Firefox major versions",
      "Last 3 Opera major versions",
    ]);
  });

  it.each(queries)("resolves %s to a non-empty browser set", (query) => {
    expect(browserslist(query).length).toBeGreaterThan(0);
  });

  it("loads the package through a consumer's extends configuration", () => {
    const consumer = mkdtempSync(join(tmpdir(), "openmrs-browserslist-"));

    try {
      mkdirSync(join(consumer, "node_modules"));
      symlinkSync(
        resolve(__dirname, ".."),
        join(consumer, "node_modules", "browserslist-config-openmrs"),
        "junction",
      );
      writeFileSync(
        join(consumer, "package.json"),
        JSON.stringify({
          browserslist: ["extends browserslist-config-openmrs"],
        }),
      );

      expect(browserslist(undefined, { path: consumer })).toEqual(
        browserslist(queries),
      );
    } finally {
      browserslist.clearCaches();
      rmSync(consumer, { recursive: true, force: true });
    }
  });
});
