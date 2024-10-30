const { v4: uuidV4 } = require("uuid");
const slugify = require("slugify");

const { sequelize } = require("../db/models");
const NewsService = require("../service/NewsService");
const {
  validateChurchAndService,
  validateCategory,
} = require("../validation/NewsValidation");
const {
  sendResponse,
  sendErrorResponse,
  handleValidationErrors,
} = require("../utils/responseUtils");

const handleError = (res, error, message) => {
  console.error(message, error);
  sendErrorResponse(res, 500, res.__("loadDataServerError"));
};

const createNewsService = (transaction) => new NewsService(transaction);

const validateRequest = async (req, res) => {
  const validationErrorResponse = handleValidationErrors(req, res);
  if (validationErrorResponse) return validationErrorResponse;

  const { churchId, serviceId } = req.body;
  if (!churchId && !serviceId) {
    return sendErrorResponse(res, 422, req.__("churchOrServiceIsRequired"));
  }

  const { church, service } = await validateChurchAndService(
    churchId,
    serviceId
  );
  if (!church && !service) {
    return sendErrorResponse(res, 422, req.__("churchOrServiceIsNotFound"));
  }

  return { church, service };
};

const prepareNewsData = (req, category) => ({
  uuid: uuidV4(),
  authorId: req.accountId,
  slug: slugify(req.body.title, { lower: true }),
  category: validateCategory(category),
  ...req.body,
});

const handleNewsTransaction = async (req, res, isUpdate = false) => {
  const transaction = await sequelize.transaction();
  const newsService = createNewsService(transaction);

  try {
    const { church, service } = await validateRequest(req, res);
    if (!church && !service) return;

    const newsData = prepareNewsData(req, req.body.category);
    const uuid = isUpdate ? req.params.uuid : undefined;

    const news = isUpdate
      ? await newsService.updateNews(uuid, newsData, church?.id, service?.id)
      : await newsService.createNews(newsData, church?.id, service?.id);

    await transaction.commit();
    sendResponse(res, 200, true, "", news);
  } catch (error) {
    await transaction.rollback();
    handleError(
      res,
      error,
      isUpdate ? "Error updating news:" : "Error inserting news:"
    );
  }
};

const insertNews = (req, res) => handleNewsTransaction(req, res, false);
const updateNews = (req, res) => handleNewsTransaction(req, res, true);

const deleteNews = async (req, res) => {
  const { uuid } = req.params;
  const transaction = await sequelize.transaction();
  const newsService = createNewsService(transaction);

  try {
    await newsService.deleteNews(uuid);
    await transaction.commit();
    sendResponse(res, 200, true, "", "");
  } catch (error) {
    await transaction.rollback();
    handleError(res, error, "Error deleting news:");
  }
};

const listNews = async (req, res) => {
  try {
    const newsService = createNewsService();
    const news = await newsService.listNews();
    sendResponse(res, 200, true, "", news);
  } catch (error) {
    handleError(res, error, "Error fetching news:");
  }
};

const detailNews = async (req, res) => {
  try {
    const newsService = createNewsService();
    const news = await newsService.findNews(req.params.key);
    sendResponse(res, 200, true, "", news);
  } catch (error) {
    handleError(res, error, "Error finding news:");
  }
};

module.exports = {
  listNews,
  detailNews,
  insertNews,
  updateNews,
  deleteNews,
};
