const { Worker } = require("bullmq");
const redis = require("../config/redis");

new Worker("certificateQueue", async (job) => {

  const data = job.data;

  await certificateService.createCertificate({
    ...data,
    templateId: data.templateId,
    organizationId: data.organizationId,
    userId: data.userId
  });

});