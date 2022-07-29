
const { connect } = require("./db");

beforeAll(async () => await connect());

describe("Tests for User", () => {
    it("it should register a new user", () => {});
    it("it should signin and retreive a temporal token", () => {});
    it("it should get a list of users", () => {});
});
