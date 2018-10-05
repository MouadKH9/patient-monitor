module.exports.getCurrentDay = () => {
  var today = new Date();
  return today.toString().substring(0, 15);
};

module.exports.getHour = () => {
  var today = new Date();
  let min =
    today.getUTCMinutes() < 10
      ? "0" + today.getUTCMinutes()
      : today.getUTCMinutes();
  return today.getUTCHours() + ":" + min + " UTC";
};

module.exports.boardDict = {
  CC78AB82FE03: "11",
  CC78AB82F883: "12",
  CC78AB82FA83: "13",
  CC78AB82FE07: "14",
  CC78AB82FB87: "15",
  CC78AB830207: "16",
  CC78AB830083: "17",
  CC78AB830303: "18",
  CC78AB830086: "19",
  CC78AB82F783: "20",
  A0E6F8AF2184: "21"
};
