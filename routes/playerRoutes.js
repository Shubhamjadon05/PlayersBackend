const express = require("express");
const {
  registerPlayer,

  getAllPlayers,
  getFilteredPlayer,
  getFindplayer,
  getFindsport,
  getFindbyLocation,
  getFindbyTimefrom,
  getClubregisterPlayer,
  getClubtable,
  getPlayerDashboard,
  getClubDashboard,
} = require("../controllers/playerController");
const router = express.Router();
router.post("/getClubregisterPlayer", getClubregisterPlayer);
router.post("/registerPlayer", registerPlayer);
router.post("/getAllPlayer", getAllPlayers);
router.post("/getFilteredPlayers", getFilteredPlayer);
router.post("/getFindplayer", getFindplayer);
router.post("/getFindsport", getFindsport);
router.post("/getFindbyLocation", getFindbyLocation);
router.post("/getFindbyTimefrom", getFindbyTimefrom);
router.post("/getClubtable", getClubtable);
router.get("/getPlayerDashboard", getPlayerDashboard);
router.get("/getClubtable", getClubtable);
router.get("/getClubDashboard", getClubDashboard);
module.exports = router;
