import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
//import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components: MdxRemote.Components = {
  // a: CustomLink,
  // // It also works with dynamically-imported components, which is especially
  // // useful for conditionally loading components for certain routes.
  // // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
}

interface UpdateMeta {
  title: string;
  publishedAt: string;
}

interface Props {
  source:MdxRemote.Source,
  frontMatter: UpdateMeta
}

export default function UpdatePage({ source, frontMatter }:Props) {
  const content = hydrate(source, { components })
  return (
    <Layout>
      <header>
        <nav>
          <Link href="/">
            <a>👈 Go back home</a>
          </Link>
        </nav>
      </header>
      <div className="post-header">
        <h1>{frontMatter.title}</h1>
      </div>
      <main>{content}</main>

      <style jsx>{`
        .post-header h1 {
          margin-bottom: 0;
        }
        .post-header {
          margin-bottom: 2rem;
        }
        .description {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  )
}

export const getStaticProps:GetStaticProps = async ({ params }) => {

  const postFilePath = path.join(POSTS_PATH, `${params!.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))
  console.log(paths)
  return {
    paths,
    fallback: false,
  }
}