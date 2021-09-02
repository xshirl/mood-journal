const { Router } = require("express")
const router = Router()
const controller = require("../controllers")
const restrict = require("../helpers")

router.get("/", (req, res) => res.send("root"))

// users
router.post("/signup", (req, res) => controller.signUp(req, res))
router.post("/signin", (req, res) => controller.signIn(req, res))
router.get("/verifyuser", (req, res) => controller.verifyUser(req, res))

// journals
router.get("/journals", (req, res) => controller.getJournals(req, res))
router.get("/journals/:id", (req, res) => controller.getJournal(req, res))
router.post("/journals/", (req, res) => controller.createJournal(req, res))
router.put("/journals/:id", (req, res) => controller.editJournal(req, res))
router.delete("/journals/:id", (req, res) => controller.deleteJournal(req, res))


module.exports = router
