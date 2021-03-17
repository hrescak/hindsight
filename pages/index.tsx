import Link from "next/link";
import Layout from "../components/Layout";
import { Update } from "../types";
import useUpdates from "../hooks/useUpdates";
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
          <li key={update.filePath} className="mb-2">
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
  // load the files frontmatter
  const { updateFileMetas } = useUpdates();
  return { props: { updates: updateFileMetas } };
}
