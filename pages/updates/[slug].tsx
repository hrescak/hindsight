import "react-notion/src/styles.css";
import { NotionRenderer } from "react-notion";
import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPosts } from "../index";

export async function getStaticProps({ params: { slug } }) {
  // Get all posts again
  const posts = await getAllPosts();

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug);

  const blocks = await fetch(
    `https://notion-api.hindsight.workers.dev/v1/page/${post.id}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export default ({ post, blocks }) => (
  <Layout>
    <header className="mb-8">
      <nav>
        <Link href="/">
          <a>&#8592; Go back home</a>
        </Link>
      </nav>
    </header>
    <div>
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <p className="text-gray-400 mb-4">two days ago</p>
    </div>
    <NotionRenderer blockMap={blocks} />
  </Layout>
);
