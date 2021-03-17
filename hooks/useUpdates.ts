import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { Update, UpdateData } from "../types";

const useUpdates = () => {

  // UPDATES_PATH is useful when you want to get the path to a specific file
  const UPDATES_PATH = path.join(process.cwd(), "updates");

  // list all .md & .mdx files in the update path
  const updateFilePaths = fs
  .readdirSync(UPDATES_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

  // get slugs only, and transform it for getStaticPaths
  const updateFileSlugs = updateFilePaths
  .map((path) => path.replace(/\.mdx?$/, ""))
  .map((slug) => ({ params: { slug } })); // required by Next.js in getStaticPaths

  // get the frontmatter of all the updates in the folder
  const updateFileMetas = updateFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(UPDATES_PATH, filePath));
      const data = matter(source).data as UpdateData
      return {
        data,
        filePath,
      };
    })
    // sort the files by date published
    .sort((a, b) => (new Date(b.data.publishedAt)).valueOf() - (new Date(a.data.publishedAt)).valueOf())
    // stringify dates afterwards
    .map((file) => {
      return {
        data: stringifyDate(file.data),
        filePath: file.filePath,
      };
    })

  // get the contents of a file and tformat dates in front matter
  const getUpdateContents = (slug? : string | string[]) => {
    if (!slug || Array.isArray(slug)) return {};
    const filePath = path.join(UPDATES_PATH, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath);

    // load ftontmatter
    const { content, data} = matter(fileContent)
    const typedData = data as UpdateData
    const frontmatter = stringifyDate(typedData)
    
    return { content, frontmatter }
  }

  return { updateFileSlugs, updateFileMetas, getUpdateContents}
}

export default useUpdates

// Convert post date to format: Month day, Year
const stringifyDate = (frontmatter:UpdateData) => {
  const options = { year: "numeric", month: "long", day: "numeric" } as Intl.DateTimeFormatOptions;
  const formattedDate = new Date(frontmatter.publishedAt).toLocaleDateString("en-US", options);
  return { ...frontmatter, publishedAt: formattedDate };
}