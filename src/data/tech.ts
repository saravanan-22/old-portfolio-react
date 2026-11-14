import type { IconType } from "react-icons";
import { FaCloud } from "react-icons/fa6";
import {
  SiBootstrap,
  SiCss,
  SiExpress,
  SiFirebase,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNetlify,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiThemoviedatabase,
  SiVercel,
} from "react-icons/si";

export interface Tech {
  name: string;
  icon: IconType;
  /** Brand colour, used for hover accents. */
  color: string;
}

export const tech = {
  html: { name: "HTML", icon: SiHtml5, color: "#e34f26" },
  css: { name: "CSS", icon: SiCss, color: "#663399" },
  bootstrap: { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
  javascript: { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  react: { name: "React", icon: SiReact, color: "#61dafb" },
  node: { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  express: { name: "Express", icon: SiExpress, color: "#ffffff" },
  mongodb: { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  firebase: { name: "Firebase", icon: SiFirebase, color: "#ffca28" },
  mui: { name: "Material UI", icon: SiMui, color: "#007fff" },
  postman: { name: "Postman", icon: SiPostman, color: "#ff6c37" },
  github: { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  vercel: { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  netlify: { name: "Netlify", icon: SiNetlify, color: "#00c7b7" },
  cyclic: { name: "Cyclic", icon: FaCloud, color: "#64ffda" },
  tmdb: { name: "TMDB API", icon: SiThemoviedatabase, color: "#01b4e4" },
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof tech;

/** Skills shown in the Skills section, in display order. */
export const skills: TechKey[] = [
  "html",
  "css",
  "bootstrap",
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "firebase",
  "mui",
  "postman",
  "github",
  "vercel",
  "netlify",
];
