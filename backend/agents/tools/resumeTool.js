// backend/agents/tools/resumeTool.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

const resumeTool = {
  name: "resumeTool",
  description: "Generates a resume PDF based on user profile and job target",
  execute: async (profileData, jobTarget) => {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument();
        const filePath = `./generated-resume-${Date.now()}.pdf`;
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(20).text(profileData.name, { align: 'center' });
        doc.fontSize(12).text(`Email: ${profileData.email}`);
        doc.text(`Phone: ${profileData.phone}`);
        doc.moveDown();
        doc.fontSize(14).text(`Target Role: ${jobTarget}`);
        doc.moveDown();

        doc.fontSize(12).text("Skills:");
        profileData.skills.forEach(skill => doc.text(`• ${skill}`));
        doc.moveDown();

        doc.text("Experience:");
        profileData.experience.forEach(exp => {
          doc.text(`${exp.role} at ${exp.company} (${exp.years})`);
        });

        doc.end();
        stream.on('finish', () => resolve(filePath));
      } catch (err) {
        reject(err);
      }
    });
  }
};

// module.exports = resumeTool;
module.exports = {
  name: "resumeTool",
  description: "Generate a professional resume based on user input.",
  execute: async (data) => {
    // Logic to generate a resume
  },
};
