const { pick } = require("lodash/fp");
const _ = require("lodash");

module.exports = {
  async findUserNames(ctx) {
    const { query } = ctx.request;

    const { results, pagination } = await strapi.admin.services.user[
      "findPage"
    ]({ pageSize: "10", page: "1", _sort: "firstname:ASC" });
    const { id } = query;
    // console.log(results, id);
    ctx.body = results.map(pick(["username", "id"]));
  },
};
