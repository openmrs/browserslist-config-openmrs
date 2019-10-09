const browserslist = require("browserslist");
const queries = require("./browserslist-config-openmrs.js");

describe("browserslist-config-openmrs", () => {
  it(`exports a valid browserslist config that is what we want for OpenMRS`, () => {
    const browsers = browserslist(queries);
    expect(browsers).toMatchSnapshot();
  });
});
