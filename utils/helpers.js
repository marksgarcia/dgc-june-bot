const getEnvData = (process_obj, config_path) => {
  const infoObject = {};
  if (process_obj?.env?.token) {
    infoObject["clientId"] = process_obj.env.clientId;
    infoObject["token"] = process_obj.env.token;
    infoObject["guildId"] = process_obj.env.guildId;
    infoObject["secret"] = process_obj.env.secret;
  } else {
    const config = require(config_path);
    infoObject["clientId"] = config.clientId;
    infoObject["token"] = config.token;
    infoObject["guildId"] = config.guildId;
    infoObject["secret"] = config.secret;
  }
  return infoObject;
};

module.exports = { getEnvData };
