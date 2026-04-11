const QRCode = require("qrcode");

module.exports = async (data) => {
  return await QRCode.toDataURL(data); // MUST return base64
};