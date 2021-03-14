import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import Layout from "../components/Layout";
import {
  postFilePaths,
  POSTS_PATH,
  stringifyFrontMatterDate,
} from "../utils/mdxUtils";
import { Update } from "../types";
interface IndexProps {
  updates: Update[];
}

export default function Index({ updates }: IndexProps) {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Hindsight Supply</h1>
      <p className="text-gray-500">More of a kitchen than a showroom.</p>

      <h2 className="text-xl mt-8 mb-2 font-semibold">Updates</h2>
      <ul>
        {updates.map((update) => (
          <li key={update.filePath}>
            <Link
              as={`/updates/${update.filePath.replace(/\.mdx?$/, "")}`}
              href={`/updates/[slug]`}
            >
              <a>{update.data.title}</a>
            </Link>
            <br />
            <span className="text-sm text-gray-400">
              {update.data.publishedAt}
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export function getStaticProps() {
  // load the file contents and frontmatter
  const files = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);
    return {
      content,
      data,
      filePath,
    };
  });

  // order them by date
  files.sort((a, b) => b.data.publishedAt - a.data.publishedAt);

  // replace dates with string
  const updates = files.map((file) => {
    return {
      content: file.content,
      data: stringifyFrontMatterDate(file.data),
      filePath: file.filePath,
    };
  });

  return { props: { updates } };
}
