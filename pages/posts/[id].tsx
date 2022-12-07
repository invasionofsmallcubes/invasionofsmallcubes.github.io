import { getAllPostIds, getPostData } from '../../lib/posts'

import Date from '../../components/date'
import Head from 'next/head'
import Layout from '../../components/layout'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import utilStyles from '../../styles/utils.module.css'

const CodeBlock = ({ language, value }) => {
    return <SyntaxHighlighter style={duotoneDark} language={language}>{value}</SyntaxHighlighter>;
};

export default function Post({
    postData
}: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div>
                    <ReactMarkdown
                        children={(postData as any).c as any}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={duotoneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    /> </div>
            </article>
        </Layout>
    )
}


export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
