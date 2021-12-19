import Layout from "../components/Layout";
import Link from "next/link";

const NOTION_BLOG_ID = "50a2fbf6f89640008ba508d870a912fa";

export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.hindsight.workers.dev/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }) {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Hindsight Supply</h1>
      <p className="text-gray-500">More of a kitchen than a showroom.</p>
      <h2 className="text-xl mt-8 mb-2 font-semibold">Updates</h2>
      <ul>
        {posts.map((post, idx) => (
          <li key={idx} className="mb-2">
            <Link href="updates/[slug]" as={`/updates/${post.slug}`}>
              <div>{post.title}</div>
            </Link>
            <br />
            <span className="text-sm text-gray-400">published at time</span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default HomePage;
