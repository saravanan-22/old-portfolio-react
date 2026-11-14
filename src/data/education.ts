import careerSkills from "../assets/images/certs/career-skills.webp";
import css from "../assets/images/certs/css.webp";
import fundamentals from "../assets/images/certs/fundamentals.webp";
import html from "../assets/images/certs/html.webp";
import programmingFoundations from "../assets/images/certs/programming-foundations.webp";
import softwareDevelopment from "../assets/images/certs/software-development.webp";

export interface EducationItem {
  year: string;
  level: string;
  institution: string;
  result: string;
}

/** Newest first. */
export const education: EducationItem[] = [
  {
    year: "2023",
    level: "MERN Stack Web Development",
    institution: "Skill Safari, Coimbatore, Tamil Nadu",
    result: "Course completed",
  },
  {
    year: "2020",
    level: "BBA",
    institution: "Nandha Arts and Science College, Erode, Tamil Nadu",
    result: "67.70%",
  },
  {
    year: "2017",
    level: "HSC",
    institution: "Government Higher Secondary School, Tirupur, Tamil Nadu",
    result: "78.75%",
  },
  {
    year: "2015",
    level: "SSLC",
    institution: "Government Higher Secondary School, Tirupur, Tamil Nadu",
    result: "76.8%",
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export const certifications: Certification[] = [
  {
    title: "Career Essentials in Software Development",
    issuer: "Microsoft & LinkedIn",
    date: "Jun 2023",
    image: softwareDevelopment,
  },
  { title: "HTML Essential Training", issuer: "LinkedIn Learning", date: "Jun 2023", image: html },
  { title: "CSS Essential Training", issuer: "LinkedIn Learning", date: "Jun 2023", image: css },
  {
    title: "Introduction to Career Skills in Software Development",
    issuer: "LinkedIn Learning",
    date: "Jun 2023",
    image: careerSkills,
  },
  {
    title: "Programming Foundations: Fundamentals",
    issuer: "LinkedIn Learning",
    date: "Jun 2023",
    image: fundamentals,
  },
  {
    title: "Programming Foundations: Beyond the Fundamentals",
    issuer: "LinkedIn Learning",
    date: "Jun 2023",
    image: programmingFoundations,
  },
];
