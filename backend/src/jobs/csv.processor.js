const queue = require("./certificate.queue");
const parseExcel = require("../utils/excelParser");

module.exports = async (filePath) => {
  try {
    const rows = await parseExcel(filePath);

    for (const row of rows) {
      // ✅ Strong validation
      if (!row.name || !row.course || !row.email) {
        console.log("❌ Invalid row skipped:", row);
        continue;
      }

      await queue.add("generate", row);
    }

    console.log("✅ Excel processing done safely");
  } catch (err) {
    console.error("❌ Excel parsing failed:", err.message);
  }
};