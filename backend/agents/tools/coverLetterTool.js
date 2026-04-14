// backend/agents/tools/coverLetterTool.js
const fs = require('fs');

const coverLetterTool = {
  name: "coverLetterTool",
  description: "Generates a simple text cover letter for a job",
  execute: async (profileData, jobTarget, companyName) => {
    const letter = `
Dear Hiring Manager,

I am excited to apply for the ${jobTarget} position at ${companyName}. 
With my skills in ${profileData.skills.join(', ')}, I believe I can make a strong contribution to your team.

I have experience in:
${profileData.experience.map(exp => `- ${exp.role} at ${exp.company}`).join('\n')}

Thank you for considering my application. I look forward to the opportunity to discuss my qualifications.

Sincerely,
${profileData.name}
`;

    const filePath = `./cover-letter-${Date.now()}.txt`;
    fs.writeFileSync(filePath, letter);
    return filePath;
  }
};

// module.exports = coverLetterTool;
module.exports = {
  name: "coverLetterTool",
  description: "Generate a personalized cover letter based on user profile and job target.",
  execute: async (profileData, jobTarget) => {
    // Logic to generate a cover letter
    // Example: Use a template and fill in user details
  },
};