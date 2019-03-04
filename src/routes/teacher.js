const express = require("express");
const controller = require("../controller/teachers");

const router = express.Router();

router.get("/teachers/:id", controller.searchOne);

router.get("/teachers", controller.searchAll);

router.post("/teachers", controller.create);

router.put("/teachers/:id", controller.updating);

router.delete("/teachers/:id", controller.delete);

module.exports = router;