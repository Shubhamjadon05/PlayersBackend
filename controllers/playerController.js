const { players } = require("../models");
const db = require("../models");
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const Players = db.players;

const getPlayer = async () => {};

const getAllPlayers = async () => {};

// find all data from databas

const getFilteredPlayer = async (req, res) => {
  console.log(req.body);
  let queryArray = [];

  if (req.body.sport) {
    queryArray.push({ sport: { [Op.like]: `%${req.body.sport}%` } });
  }
  if (req.body.day) {
    queryArray.push({ avail_day: { [Op.like]: `%${req.body.day}%` } });
  }

  const filterplayers = await Players.findAll({
    where: {
      [Op.and]: queryArray,
    },
  });
  if (filterplayers) {
    if (
      !req.body.selectedLocation ||
      !req.body.selectedLocation.lat ||
      !req.body.selectedLocation.lng
    ) {
      res.json({ status: "Error", error: "Long and Lat are required" });
      return;
    }
    locationPlayers = [];
    locationLat = req.body.selectedLocation.lat;
    locationLng = req.body.selectedLocation.lng;
    filterplayers.forEach((player) => {
      console.log(parseFloat(player.lat));
      if (
        parseFloat(player.lat) > locationLat - 0.5 &&
        parseFloat(player.lat) < locationLat + 0.5
      )
        locationPlayers.push(player);
    });
    res.json({ status: "success", filteredPlayer: locationPlayers });
  }
};

// find players data from chosing day
const getFindplayer = async (req, res) => {
  const fPlayers = await Players.findAll({});
  console.log("All Players:", JSON.stringify(fPlayers, null, 2));
  if (fPlayers) {
    locationPlayers = [];
    locationLat = 23.5;
    locationLng = 77.5;
    fPlayers.forEach((player) => {
      console.log(parseFloat(player.lat));
      if (
        parseFloat(player.lat) > locationLat - 0.5 &&
        parseFloat(player.lat) < locationLat + 0.5
      )
        locationPlayers.push(player);
    });
    res.json({ status: "success", fPlayers: locationPlayers });
  }
};

console.log(Players.avail_day);

// find players data from choseing sport
const getFindsport = async (req, res) => {
  const SPlayers = await Players.findAll({
    where: { sport: "cricket" },
  });
  console.log("All Players:", JSON.stringify(SPlayers, null, 2));
  if (SPlayers) {
    res.json({ status: "success", SPlayers: SPlayers });
  }
};

console.log(Players.sport);
// find by location

const getFindbyLocation = async (req, res) => {
  const BylocationPlayers = await Players.findAll({
    where: {
      address: " ",
    },
  });
  console.log("All Players:", JSON.stringify(BylocationPlayers, null, 2));
  if (BylocationPlayers) {
    res.json({ status: "success", BylocationPlayers: BylocationPlayers });
  }
};

console.log(Players.sport);

// find players select by time frpm
const getFindbyTimefrom = async (req, res) => {
  const ByTimePlayers = await Players.findAll({
    where: { _from: "center" },
  });
  console.log("All Players:", JSON.stringify(ByTimePlayers, null, 2));
  if (ByTimePlayers) {
    res.json({ status: "success", ByTimePlayers: ByTimePlayers });
  }
};

console.log(Players.sport);

module.exports = {
  getPlayer,
  getAllPlayers,
  getFilteredPlayer,
  getFindplayer,
  getFindsport,
  getFindbyLocation,
  getFindbyTimefrom,
};
