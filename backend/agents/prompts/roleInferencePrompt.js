// Prompt template to infer career roles based on user profile
const roleInferencePrompt = `
You are an expert career counselor. 
Given a user's skills, education, and interests, suggest 3 suitable career roles. 
Provide reasoning for each recommendation.
User Profile: {profile}
Respond in JSON format:
[
  {
    "role": "Job Role Name",
    "reason": "Why this role fits the user"
  }
]
`;

module.exports = roleInferencePrompt;
