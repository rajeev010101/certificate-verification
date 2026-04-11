module.exports = (html, data) => {
  let output = html;

  // Replace known variables
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    output = output.replace(regex, data[key] || "");
  });

  // 🔥 REMOVE leftover {{anything}} (IMPORTANT)
  output = output.replace(/{{\s*[\w]+\s*}}/g, "");

  return output;
};