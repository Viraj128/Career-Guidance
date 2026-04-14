// // // src/components/ResumePreview.jsx
// // import React from "react";

// // export default function ResumePreview({ content }) {
// //   const downloadTxt = () => {
// //     const blob = new Blob([content || ""], { type: "text/plain;charset=utf-8" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "resume.txt";
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   };

// //   return (
// //     <div className="bg-white p-4 rounded shadow">
// //       <div className="flex justify-between items-center">
// //         <h3 className="font-semibold">Resume Preview</h3>
// //         <button onClick={downloadTxt} className="bg-slate-800 text-white text-sm px-3 py-1 rounded">Download</button>
// //       </div>

// //       <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{content || "No resume generated yet."}</pre>
// //     </div>
// //   );
// // 

// // src/components/ResumePreview.jsx
// import React from "react";

// export default function ResumePreview({ data }) {
//   if (!data) {
//     return (
//       <div className="bg-white p-4 rounded shadow">
//         <h3 className="font-semibold">Resume Preview</h3>
//         <p className="text-sm text-slate-500 mt-2">No data entered yet.</p>
//       </div>
//     );
//   }

//   const { name, education, skills, experience } = data;

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h3 className="font-semibold mb-2">Resume Preview</h3>
//       <div className="text-sm text-slate-700 whitespace-pre-wrap">
//         <p><strong>Name:</strong> {name || "Not provided"}</p>
//         <p><strong>Education:</strong> {education || "Not provided"}</p>
//         <p><strong>Skills:</strong> {skills || "Not provided"}</p>
//         <p><strong>Experience:</strong> {experience || "Not provided"}</p>
//       </div>
//     </div>
//   );
// }



// src/components/ResumePreview.jsx
// import React from "react";

// export default function ResumePreview({ content }) {
//   if (!content) {
//     return (
//       <div className="bg-white p-4 rounded shadow">
//         <h3 className="font-semibold">Resume Preview</h3>
//         <p className="text-sm text-slate-500 mt-2">No resume generated yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h3 className="font-semibold mb-2">Resume Preview</h3>
//       <div className="text-sm text-slate-700 whitespace-pre-wrap">
//         {content}
//       </div>
//     </div>
//   );
// }



// src/components/ResumePreview.jsx
import React, { useRef } from "react";
import { jsPDF } from "jspdf";

export default function ResumePreview({ content }) {
  const resumeRef = useRef();

  const formatContent = (text) => {
  if (!text) return "";

  const lines = text.split("\n");
  let html = "";
  let inList = false;

  lines.forEach((line) => {
    let trimmed = line.trim();
    if (!trimmed) return;

    // Convert Markdown bold **text** to <strong>text</strong>
    trimmed = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Headings
    if (["Summary", "Skills", "Experience", "Education", "Projects"].includes(trimmed)) {
      html += `<h2 style="font-size:16pt; margin-top:20px; margin-bottom:12px; font-weight:bold;">${trimmed}</h2>`;
      return;
    }

    // Bullet points
    if (/^(\*|•|-)\s+/.test(trimmed)) {
      if (!inList) {
        html += `<ul style="margin-bottom:10px; padding-left:20px;">`;
        inList = true;
      }
      html += `<li style="margin-bottom:6px; font-size:12.5pt;">${trimmed.replace(/^(\*|•|-)\s+/, "")}</li>`;
      return;
    } else {
      if (inList) {
        html += `</ul>`;
        inList = false;
      }
    }

    // Normal paragraph
    html += `<p style="margin-bottom:10px; font-size:12pt; line-height:1.5;">${trimmed}</p>`;
  });

  if (inList) html += `</ul>`;
  return html;
};


  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    // const pageHeight = pdf.internal.pageSize.getHeight();
    // const a4Width = 595;
    const margin = 40;
    // const contentWidth = a4Width - margin * 2;

    try {
      await pdf.html(resumeRef.current, {
        callback: (doc) => doc.save("resume.pdf"),
        x: margin,
        y: margin,
        width: pageWidth - 2 * margin,
        windowWidth: pageWidth,
        html2canvas: {
          scale: 1.4,
          logging: false,
          // width: contentWidth,
          backgroundColor: "#ffffff",
        },
        autoPaging: "text",
        margin: [margin, margin, margin, margin],
      });
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  return (
    <div style={{ padding: "16px", fontFamily: "times, serif" }}>
      <h3 style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "18pt" }}>
        Resume Preview
      </h3>

      <div
        ref={resumeRef}
        style={{
          fontFamily: "times, serif",
          fontSize: "12pt",
          lineHeight: "1.5",
          color: "#000",
          width: "550px",
          padding: "20px",
        }}
        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      />

      <button
        onClick={handleDownloadPDF}
        style={{
          marginTop: "16px",
          backgroundColor: "#1e293b",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </div>
  );
}
