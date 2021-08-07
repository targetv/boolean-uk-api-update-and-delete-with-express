const express = require("express");

const { createOne, getAll, getOneById, updateOne } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updateOne);

module.exports = router;
