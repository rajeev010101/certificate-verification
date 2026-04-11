const ExcelJS = require("exceljs");

module.exports = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.worksheets[0];

  const data = [];

  const headers = [];
  sheet.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber] = cell.value;
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const obj = {};

    row.eachCell((cell, colNumber) => {
      obj[headers[colNumber]] = cell.value;
    });

    data.push(obj);
  });

  return data;
};