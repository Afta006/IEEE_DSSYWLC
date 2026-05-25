"use client";

import { useState } from "react";

type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  highlight: boolean;
  speakers?: string[];
};

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const day1: ScheduleItem[] = [
    {
      time: "08:30 AM",
      title: "Registration",
      description: "Participant Registration & Refreshment Kit",
      highlight: false,
    },
    {
      time: "10:00 – 11:30 AM",
      title: "Inauguration Ceremony",
      description: "Formal welcome & inaugural addresses",
      speakers: [
        "Prof. Anand Srivastava, Vice Chancellor NSUT",
        "Prof. Prerna Gaur, Chair — IEEE India Council",
        "Dr. Preeti Bajaj, Chair-Elect — IEEE India Council",
        "Prof. M.N. Hoda, Chairperson — IEEE Delhi Section",
        "Mr. Deepak Mathur, Director — IEEE Region 10",
        "Dr. S.S. Jamuar, Delhi Section LMAG Secretary",
        "Ms. Sneha Kabra, Secretary — IEEE Delhi Section",
        "DSW Ma'am",
      ],
      highlight: true,
    },
    {
      time: "11:30 AM – 12:00 PM",
      title: "Tea Break (Networking Session 1)",
      description: "Open networking session for all attendees",
      highlight: false,
    },
    {
      time: "12:00 – 12:30 PM",
      title: "Breaking the Ice",
      description: "",
      highlight: true,
    },
    {
      time: "12:30 – 01:15 PM",
      title: "Life Members Interacting with Young Professionals",
      description: "Senior IEEE Members engage with young professionals",
      highlight: false,
    },
    {
      time: "01:15 – 02:00 PM",
      title: "IEEE: Beyond Membership",
      description: "Guide to global IEEE resources",
      highlight: false,
    },
    {
      time: "02:00 – 03:00 PM",
      title: "Lunch Break (Networking Session 2)",
      description: "Open networking session for all attendees",
      highlight: false,
    },
    {
      time: "03:00 – 04:00 PM",
      title: "Women Who Led the Way — Panel Discussion",
      description:
        "WIE members talk about navigating male-dominated spaces in tech across different eras",
      highlight: true,
    },
    {
      time: "04:00 – 05:15 PM",
      title: "Cryptic Hunt",
      description:
        "The event challenges participants to solve a chain of logic, tech, and cryptography-based puzzles that simulate the technical process of penetration testing and \"breaking through\" seven",
      highlight: false,
    },
    {
      time: "05:15 – 06:00 PM",
      title: "Any Event",
      description: "",
      highlight: true,
    },
    {
      time: "06:00 – 07:00 PM",
      title: "Jamming Session",
      description: "",
      highlight: false,
    },
  ];

  const day2: ScheduleItem[] = [
    {
      time: "09:30 – 10:00 AM",
      title: "Breakfast (Networking Session 4)",
      description: "",
      highlight: false,
    },
    {
      time: "10:00 – 10:45 AM",
      title: "IEEE VTools Reporting",
      description:
        "Learn how to effectively use IEEE VTools to report events, manage records, and maintain proper documentation aligned with IEEE guidelines",
      highlight: false,
    },
    {
      time: "10:45 – 11:30 AM",
      title: "IEEE Funding & Scholarship Opportunities",
      description:
        "Explore IEEE funding avenues for student branches and chapters. Get insights on crafting strong proposals and securing financial support",
      highlight: false,
    },
    {
      time: "11:30 AM – 12:00 PM",
      title: "High Tea (Networking Session 5)",
      description: "",
      highlight: false,
    },
    {
      time: "12:00 – 02:00 PM",
      title: "Student Branch Chairs Meet & Presentation",
      description: "",
      highlight: true,
    },
    {
      time: "02:00 – 03:00 PM",
      title: "Lunch (Networking Session 6)",
      description: "",
      highlight: false,
    },
    {
      time: "03:00 – 03:45 PM",
      title: "Poetry & E-Gaming",
      description: "",
      highlight: false,
    },
    {
      time: "03:45 – 04:15 PM",
      title: "Hackathon / Business Pitch Presentations",
      description: "Presentation of hackathon or business pitch projects",
      highlight: false,
    },
    {
      time: "04:15 – 04:45 PM",
      title: "Tea Session (Networking Session 7)",
      description:
        "A light and refreshing break to recharge and unwind. Connect and relax with fellow participants",
      highlight: false,
    },
    {
      time: "04:45 – 06:30 PM",
      title: "Awards Ceremony",
      description: "",
      highlight: true,
    },
    {
      time: "06:30 – 07:00 PM",
      title: "Cultural Night",
      description:
        "An electrifying evening filled with music, dance, and vibrant performances celebrating diverse talents and cultures",
      highlight: true,
    },
    {
      time: "07:00 – 08:30 PM",
      title: "Dinner (Networking Session 8)",
      description: "",
      highlight: false,
    },
  ];

  const schedule = activeDay === 1 ? day1 : day2;

  return (
    <section className="py-20 bg-white" id="schedule">
      <div className="section-container">
        <div className="text-center mb-10 animate-on-scroll">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            Program Schedule
          </h2>
          <div className="w-16 h-0.5 bg-[#7B1F34] mx-auto mb-8"></div>

          {/* Day Tabs */}
          <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-6 py-2.5 text-sm font-bold transition-colors ${
                activeDay === 1
                  ? "bg-[#7B1F34] text-white"
                  : "bg-white text-slate-600 hover:bg-gray-50"
              }`}
            >
              Day 1 — Feb 7
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-6 py-2.5 text-sm font-bold transition-colors ${
                activeDay === 2
                  ? "bg-[#7B1F34] text-white"
                  : "bg-white text-slate-600 hover:bg-gray-50"
              }`}
            >
              Day 2 — Feb 8
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto animate-on-scroll">
          {schedule.map((item, i) => (
            <div
              key={i}
              className="flex gap-8 border-b border-gray-100 py-6 last:border-b-0 hover:bg-gray-50 transition-colors px-4 -mx-4 rounded"
            >
              {/* Time column */}
              <div className="w-36 flex-shrink-0 text-right">
                <span
                  className={`font-bold text-sm font-mono inline-block px-3 py-1 rounded ${
                    item.highlight ? "bg-[#7B1F34] text-white" : "text-gray-600"
                  }`}
                >
                  {item.time}
                </span>
              </div>
              {/* Vertical line */}
              <div className="w-px bg-gray-200 relative flex-shrink-0">
                <div className="absolute top-2 -left-[5px] w-[11px] h-[11px] rounded-full bg-[#7B1F34]"></div>
              </div>
              {/* Content */}
              <div className="flex-grow pb-2">
                <h3 className="text-slate-800 font-bold text-base mb-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-500 text-sm">{item.description}</p>
                )}
                {item.speakers?.length ? (
                  <ul className="mt-3 space-y-1">
                    {item.speakers.map((speaker, j) => (
                      <li
                        key={j}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7B1F34] mt-1.5 flex-shrink-0"></span>
                        {speaker}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
