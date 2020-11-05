const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.result.create(data, { files });
    } else {
      // Save to Result table then to Response to display the pies
      entity = await strapi.services.result.create(ctx.request.body);
      await strapi.services.response.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.result });
  },
};
