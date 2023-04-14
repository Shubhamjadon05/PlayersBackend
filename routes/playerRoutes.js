const express = require("express");
const {
  getPlayer,
  getAllPlayers,
  getFilteredPlayer,
  getFindplayer,
  getFindsport,
  getFindbyLocation,
  getFindbyTimefrom,
} = require("../controllers/playerController");
const router = express.Router();

router.post("/getPlayer", getPlayer);
router.post("/getAllPlayer", getAllPlayers);
router.post("/getFilteredPlayers", getFilteredPlayer);
router.post("/getFindplayer", getFindplayer);
router.post("/getFindsport", getFindsport);
router.post("/getFindbyLocation", getFindbyLocation);
router.post("/getFindbyTimefrom", getFindbyTimefrom);
module.exports = router;
