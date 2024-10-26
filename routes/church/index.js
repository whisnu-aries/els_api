const express = require("express");
const router = express.Router();

const { adminMiddleware } = require("../../middleware");

// Import church routes
const listRoute = require("./list");
const detailRoute = require("./detail");
const insertRoute = require("./insert");
const updateRoute = require("./update");
const deleteRoute = require("./delete");

router.use("/", listRoute);
router.use("/detail", detailRoute);
router.use("/insert", adminMiddleware, insertRoute);
router.use("/update", adminMiddleware, updateRoute);
router.use("/delete", adminMiddleware, deleteRoute);

module.exports = router;
