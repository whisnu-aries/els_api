const express = require("express");
const router = express.Router();

const { adminMiddleware } = require("../middleware");

const {
  listNews,
  detailNews,
  insertNews,
  updateNews,
  deleteNews,
} = require("../controllers/NewsControllers");
const { insertServiceValidation } = require("../validation/NewsValidation");

router.get("/", listNews);
router.get("/detail/:key", detailNews);
router.post("/insert", [adminMiddleware, insertServiceValidation], insertNews);
router.put(
  "/update/:uuid",
  [adminMiddleware, insertServiceValidation],
  updateNews
);
router.delete("/delete/:uuid", adminMiddleware, deleteNews);

module.exports = router;
