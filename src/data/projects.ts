import type { TechKey } from "./tech";

import calculator from "../assets/images/mini/calculator.webp";
import colorFlipper from "../assets/images/mini/color-flipper.webp";
import counter from "../assets/images/mini/counter.webp";
import guessNumber from "../assets/images/mini/guess-number.webp";
import letterChecker from "../assets/images/mini/letter-checker.webp";
import notesApp from "../assets/images/mini/notes-app.webp";
import repeatedWords from "../assets/images/mini/repeated-words.webp";
import todoList from "../assets/images/mini/todo-list.webp";

/** Loads numbered screenshots (e.g. quiz-1.webp … quiz-8.webp) in numeric order. */
function screenshots(modules: Record<string, string>): string[] {
  const num = (p: string) => Number(p.match(/-(\d+)\.webp$/)?.[1] ?? 0);
  return Object.entries(modules)
    .sort(([a], [b]) => num(a) - num(b))
    .map(([, url]) => url);
}

// Glob options must be inline literals for Vite to analyse them.
const quizShots = screenshots(
  import.meta.glob<string>("../assets/images/projects/quiz-*.webp", {
    eager: true,
    import: "default",
  }),
);
const oqdbShots = screenshots(
  import.meta.glob<string>("../assets/images/projects/oqdb-*.webp", {
    eager: true,
    import: "default",
  }),
);
const movieShots = screenshots(
  import.meta.glob<string>("../assets/images/projects/movie-*.webp", {
    eager: true,
    import: "default",
  }),
);

export interface FeaturedProject {
  slug: string;
  category: string;
  title: string;
  description: string;
  images: string[];
  stack: TechKey[];
  demo?: string;
  code: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "quiz-game",
    category: "MERN Project",
    title: "Quiz Game",
    description:
      "An engaging quiz platform offering a fun and educational experience for users of all ages. Built on the MERN stack (MongoDB, Express.js, React and Node.js), with the backend hosted on Cyclic and the frontend on Vercel. Users can test their knowledge across a wide range of topics, from science and history to pop culture and sports. Secure registration and login let anyone create an account and start exploring, with an intuitive interface and real-time scoring.",
    images: quizShots,
    stack: [
      "react",
      "node",
      "express",
      "mongodb",
      "bootstrap",
      "mui",
      "firebase",
      "vercel",
      "cyclic",
    ],
    demo: "https://quizgame2023.vercel.app/",
    code: "https://github.com/saravanan-22/mern-quiz-app",
  },
  {
    slug: "open-question-database",
    category: "React Project",
    title: "Open Question Database",
    description:
      "A collaborative platform for knowledge sharing and community engagement. Users securely create accounts and contribute to a growing repository of questions on topics from technology and science to arts and culture. The interface makes it easy to add, post, filter and delete questions; users can upvote, comment and answer, sparking insightful discussions and expanding collective knowledge.",
    images: oqdbShots,
    stack: ["react", "javascript", "bootstrap", "mui", "firebase", "github", "netlify"],
    demo: "https://openquestionsadddatabase.netlify.app/",
    code: "https://github.com/saravanan-22/open-question-database",
  },
  {
    slug: "movie-website",
    category: "React Project",
    title: "Movie Website",
    description:
      "A movie discovery site built with React. Users securely create accounts, then explore all movies, top-rated films, what's showing now and what's trending. Search finds exactly what you're looking for, and genre categories (action, romance, comedy and more) help you pick the perfect film for any occasion. 🍿",
    images: movieShots,
    stack: ["react", "javascript", "bootstrap", "mui", "firebase", "tmdb", "vercel"],
    demo: "https://aj-react-p2-movieapp.vercel.app/",
    code: "https://github.com/saravanan-22/movie-app-react",
  },
];

export interface MiniProject {
  title: string;
  image: string;
  demo?: string;
  code: string;
}

const miniRepo = "https://github.com/saravanan-22/javascript-mini-projects/tree/main";

export const miniProjects: MiniProject[] = [
  {
    title: "Repeated Words Identifier",
    image: repeatedWords,
    demo: "https://dreamy-malabi-322f29.netlify.app/",
    code: `${miniRepo}/repeated-words-identifier`,
  },
  { title: "Notes App", image: notesApp, code: `${miniRepo}/notes-app` },
  {
    title: "Guess the Number",
    image: guessNumber,
    demo: "https://roaring-bunny-03ed2a.netlify.app/",
    code: `${miniRepo}/guess-the-number`,
  },
  {
    title: "Color Flipper",
    image: colorFlipper,
    demo: "https://cheery-pony-0e764a.netlify.app/",
    code: `${miniRepo}/color-flipper`,
  },
  {
    title: "Counter",
    image: counter,
    demo: "https://steady-torrone-8ebd92.netlify.app/",
    code: `${miniRepo}/counter`,
  },
  {
    title: "Calculator",
    image: calculator,
    demo: "https://stirring-frangipane-2ef330.netlify.app/",
    code: `${miniRepo}/calculator`,
  },
  {
    title: "To-Do List",
    image: todoList,
    demo: "https://vermillion-bubblegum-98b110.netlify.app/",
    code: `${miniRepo}/todo-list`,
  },
  {
    title: "Repeated Letters Checker",
    image: letterChecker,
    demo: "https://calm-otter-b2a28e.netlify.app/",
    code: `${miniRepo}/repeated-letters-checker`,
  },
];

/** Screenshots for the hero marquee: a few from each featured project. */
export const showcaseShots: string[] = [
  ...quizShots.slice(0, 5),
  ...movieShots.slice(0, 5),
  ...oqdbShots.slice(0, 5),
];
