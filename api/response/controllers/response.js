const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    // console.log(ctx.request.body);
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.response.create(data, { files });
    } else {
      entity = await strapi.services.response.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.response });
  },

  findOneBySurvey: async (ctx) => {
    const { id } = ctx.params;
    const entity = await strapi.services.response.findBySurvey(id);
    return sanitizeEntity(entity, { model: strapi.models.response });
  }

};
