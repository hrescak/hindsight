import fs from "fs";
import { isArray } from "node:util";
import path from "path";
import { UpdateData } from "../types";

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "updates");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const postFileSlugs = postFilePaths
  // Remove file extensions for page paths
  .map((path) => path.replace(/\.mdx?$/, ""))
  // Map the path into the static paths object required by Next.js
  .map((slug) => ({ params: { slug } }));

  export const postFileContents = (slug? : string | string[]) => {
    if (!slug || Array.isArray(slug)) return "";
    const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
    return fs.readFileSync(postFilePath);
  }

export const stringifyFrontMatterDate = (data: any) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = data.publishedAt.toLocaleDateString("en-US", options);
  return { ...data, publishedAt: formattedDate };
}