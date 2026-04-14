// // backend/controllers/resumeController.js
// const Artifact = require("../models/Artifact");
// const resumeService = require("../services/resumeService");

// // POST /resume/generate
// // Body: { profile: {...}, jobTarget: "...", format?: "pdf"|"txt" }
// exports.generateResume = async (req, res, next) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     if (!uid) return res.status(401).json({ error: "Unauthorized: uid missing" });

//     const { profile, jobTarget, format = "pdf" } = req.body;
//     if (!profile || !jobTarget) {
//       return res.status(400).json({ error: "profile and jobTarget are required" });
//     }

//     // service returns { filePath, filename, meta }
//     const result = await resumeService.generateResume({ profile, jobTarget, format });

//     const artifact = await Artifact.create({
//       firebaseUid: uid,
//       type: "resume",
//       path: result.filePath,
//       filename: result.filename,
//       metadata: { jobTarget, format, ...(result.meta || {}) },
//     });

//     res.json({ message: "Resume generated", artifactId: artifact._id, path: result.filePath });
//   } catch (err) {
//     next(err);
//   }
// };

// // POST /resume/cover-letter
// // Body: { profile: {...}, jobTarget: "...", companyName: "..." }
// exports.generateCoverLetter = async (req, res, next) => {
//   try {
//     const uid = req.user?.uid || req.body.uid;
//     if (!uid) return res.status(401).json({ error: "Unauthorized: uid missing" });

//     const { profile, jobTarget, companyName } = req.body;
//     if (!profile || !jobTarget || !companyName) {
//       return res.status(400).json({ error: "profile, jobTarget and companyName are required" });
//     }

//     const result = await resumeService.generateCoverLetter({ profile, jobTarget, companyName });

//     const artifact = await Artifact.create({
//       firebaseUid: uid,
//       type: "cover_letter",
//       path: result.filePath,
//       filename: result.filename,
//       metadata: { jobTarget, companyName, ...(result.meta || {}) },
//     });

//     res.json({ message: "Cover letter generated", artifactId: artifact._id, path: result.filePath });
//   } catch (err) {
//     next(err);
//   }
// };

// // GET /resume/artifacts
// exports.listArtifacts = async (req, res, next) => {
//   try {
//     const uid = req.user?.uid || req.query.uid;
//     if (!uid) return res.status(401).json({ error: "Unauthorized: uid missing" });

//     const artifacts = await Artifact.find({ firebaseUid: uid }).sort({ createdAt: -1 });
//     res.json({ artifacts });
//   } catch (err) {
//     next(err);
//   }
// };

// // GET /resume/artifacts/:id
// exports.getArtifact = async (req, res, next) => {
//   try {
//     const uid = req.user?.uid || req.query.uid;
//     if (!uid) return res.status(401).json({ error: "Unauthorized: uid missing" });

//     const { id } = req.params;
//     const artifact = await Artifact.findOne({ _id: id, firebaseUid: uid });
//     if (!artifact) return res.status(404).json({ error: "Artifact not found" });

//     res.json(artifact);
//   } catch (err) {
//     next(err);
//   }
// };



// backend/controllers/resumeController.js
const Artifact = require("../models/Artifact");
const resumeService = require("../services/resumeService");

exports.generateResume = async (req, res) => {
  try {
    const uid = req.user?.uid || req.body.uid;
    const { profileData } = req.body;

    if (!profileData) {
      return res.status(400).json({ error: "Profile data is required" });
    }

    // const resumeBuffer = await resumeService.generateResume(profileData);
    const resumeText = await resumeService.generateResumeText(profileData);
    const artifact = new Artifact({
      uid,
      type: "resume",
      content: resumeText,
    });
    await artifact.save();

    res.json({
      message: "Resume generated",
      artifactId: artifact._id,
      resume: resumeText,
    });
  } catch (error) {
    console.error("Generate Resume Error:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
};

exports.generateCoverLetter = async (req, res) => {
  try {
    const uid = req.user?.uid || req.body.uid;
    const { jobDescription, profileData } = req.body;

    if (!jobDescription || !profileData) {
      return res
        .status(400)
        .json({ error: "Job description and profile data are required" });
    }

    const coverLetter = await resumeService.generateCoverLetter(
      profileData,
      jobDescription
    );

    const artifact = new Artifact({
      uid,
      type: "coverLetter",
      content: coverLetter, // ✅ use 'content' for consistency
    });
    await artifact.save();

    // ❌ FIX: remove 'resumeBuffer' (not defined)
    res.json({
      message: "Cover letter generated",
      artifactId: artifact._id,
      coverLetter: coverLetter, // ✅ return coverLetter instead
    });
  } catch (error) {
    console.error("Generate Cover Letter Error:", error);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
};

// New endpoint for AI-generated resume preview
exports.generateResumePreview = async (req, res) => {
  try {
    const { profileData } = req.body;

    if (!profileData) {
      return res.status(400).json({ error: "Profile data is required" });
    }

    // Ask AI to generate resume text with proper formatting
    const aiResume = await resumeService.generateResumeText(profileData);

    res.json({ resumeText: aiResume });
  } catch (error) {
    console.error("Generate Resume Preview Error:", error);
    res.status(500).json({ error: "Failed to generate resume preview" });
  }
};


