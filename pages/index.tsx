import Layout from "../components/Layout";
import Link from "next/link";
import dayjs from "dayjs";

const NOTION_BLOG_ID = "50a2fbf6f89640008ba508d870a912fa";

export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.hindsight.workers.dev/v1/table/${NOTION_BLOG_ID}`
  )
    .then((res) => res.json())
    // filter out unpublished posts
    .then((posts) => posts.filter((post: any) => post.isPublished))
    // order them by date published
    .then((posts) =>
      posts.sort((a: any, b: any) => (a.publishedAt < b.publishedAt ? 1 : -1))
    );
};

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }: { posts: any }) {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Hindsight Supply</h1>
      <p className="text-gray-500">More of a kitchen than a showroom.</p>
      <h2 className="text-xl mt-8 mb-2 font-semibold">Posts</h2>
      <ul>
        {posts.map((post: any, idx: number) => (
          <li key={idx} className="mb-2">
            <Link href="posts/[slug]" as={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
            <br />
            <span className="text-sm text-gray-400">
              {dayjs(post.publishedAt).format("MMMM D, YYYY")}
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default HomePage;
