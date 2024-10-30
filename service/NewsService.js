const { Op } = require("sequelize");
const { News, ServiceNews } = require("../db/models");

const exclude = ["id", "authorId"];

class NewsService {
  constructor(transaction) {
    this.transaction = transaction;
  }

  async listNews() {
    return News.findAll({ attributes: { exclude } });
  }

  async findNews(key) {
    return News.findOne({
      attributes: { exclude },
      where: {
        [Op.or]: [{ uuid: key }, { slug: key }],
      },
    });
  }

  async createNews(formData, churchId, serviceId) {
    const slug = await this.generateUniqueSlug(formData.slug);
    const news = await News.create(
      { ...formData, slug },
      { transaction: this.transaction }
    );
    await this.createOrUpdateServiceNews(churchId, serviceId, news.id);
    return news;
  }

  async updateNews(uuid, formData, churchId, serviceId) {
    const { slug: newSlug, ...updateData } = formData;
    const news = await this.findNewsByUuid(uuid);

    const slug = await this.generateUniqueSlug(newSlug || news.slug, news.id);
    await news.update(
      { ...updateData, slug },
      { transaction: this.transaction }
    );
    await this.createOrUpdateServiceNews(churchId, serviceId, news.id);

    return news;
  }

  async deleteNews(key) {
    const news = await this.findNewsByUuid(key);
    await news.destroy();
    return news;
  }

  async findNewsByUuid(uuid) {
    const news = await News.findOne({ where: { uuid } });
    if (!news) throw new Error("News not found");
    return news;
  }

  async generateUniqueSlug(baseSlug, excludeId = null) {
    let slug = baseSlug;
    let count = 1;
    const condition = excludeId
      ? { slug, id: { [Op.ne]: excludeId } }
      : { slug };

    while (await News.findOne({ where: condition })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }
    return slug;
  }

  async createOrUpdateServiceNews(churchId, serviceId, newsId) {
    const serviceNews = await ServiceNews.findByPk(newsId);
    if (serviceNews) {
      await serviceNews.update(
        { churchId, serviceId },
        { transaction: this.transaction }
      );
    } else {
      await ServiceNews.create(
        { churchId, serviceId, newsId },
        { transaction: this.transaction }
      );
    }
  }
}

module.exports = NewsService;
