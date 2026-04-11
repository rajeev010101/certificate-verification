const compileTemplate = require("../../utils/templateEngine");
const generateQR = require("../../utils/qrGenerator");

exports.buildCertificateHTML = async ({
  template,
  name,
  course,
  certificateId,
  logo
}) => {
  const verifyUrl = `${process.env.BASE_URL}/verify/${certificateId}`;
  const qr = await generateQR(verifyUrl);

  return compileTemplate(template.html, {
    name,
    course,
    date: new Date().toLocaleDateString(),
    description: "Successfully completed the program",
    certificateId,
    qr,
    logo,
    issuerName: template.issuerName,
    issuerRole: template.issuerRole,
    signature1: template.signatures?.[0]?.image,
    signature2: template.signatures?.[1]?.image
  });
};