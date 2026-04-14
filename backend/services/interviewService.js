// Placeholder for generating interview Qs
const generateMockQuestions = async (role) => {
  // Could integrate OpenAI GPT for real questions
  return [
    `What is your experience relevant to ${role}?`,
    `Explain a project where you used skills required for ${role}.`,
    `How would you handle a challenge specific to ${role}?`,
  ];
};

module.exports = { generateMockQuestions };
