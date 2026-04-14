// src/components/SkillChart.jsx
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function SkillChart({ userSkills = {}, roleSkills = {} }) {
  // userSkills and roleSkills are objects { skillName: value } 0-10
  const allSkills = Array.from(new Set([...Object.keys(userSkills), ...Object.keys(roleSkills)]));

  const userData = allSkills.map((s) => userSkills[s] ?? 0);
  const roleData = allSkills.map((s) => roleSkills[s] ?? 0);

  const data = {
    labels: allSkills,
    datasets: [
      {
        label: "You",
        data: userData,
        fill: true,
      },
      {
        label: "Target Role",
        data: roleData,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: { stepSize: 2 },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

// console.log("Chart Labels:", labels);
// console.log("You dataset:", userData);
// console.log("Target dataset:", targetData);

  return (
    // <div className="w-full h-96 p-4 bg-white rounded shadow">
    //   <Radar data={data} options={options} />
    // </div>
    <div style={{ width: "100%", height: "400px" }}>
  <Radar data={data} options={options} />
</div>
  );
}
