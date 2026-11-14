import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export const site = {
  name: "Saravanan",
  kicker: "The Portfolio of,",
  tagline: "Building Web Wonders with MERN Magic.",
  intro:
    "Passionate MERN Stack Developer dedicated to crafting user-friendly, inclusive digital solutions for exceptional web experiences.",
} as const;

export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export interface Social {
  label: string;
  href: string;
  icon: IconType;
}

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/saravanan-22", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saravanan-r-903311265/",
    icon: FaLinkedin,
  },
];

/**
 * EmailJS identifiers. These are public by design (EmailJS sends from the browser),
 * so they live in source; override per environment with VITE_EMAILJS_* if needed.
 */
export const emailJs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_ufunyy3",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_y9sax0w",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "tMwv9F49XPbjUML8H",
} as const;
