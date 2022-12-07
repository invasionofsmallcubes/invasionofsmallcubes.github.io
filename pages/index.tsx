import Layout, { siteTitle } from '../components/layout'

import Date from '../components/date'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Hello, my name is Emanuele and I make stuff people use.</p>
                <p>My GitHub repository is located <a href="https://github.com/invasionofsmallcubes">here</a></p>
                <p>In my spare time I'm working on <a href="https://www.gamingsofa.club">The Gaming Sofa Club</a></p>
                <p>My LinkedIn page is located <a href="https://www.linkedin.com/in/emanueleianni">here</a></p>
                <p>My Twitter handler is <a href="https://twitter.com/IsTDDDeadYet">IsTDDDeadYet</a></p>
                <p>My Twitch handler is <a
                    href="https://www.twitch.tv/theinvasionofsmallcubes">theinvasionofsmallcubes</a></p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Presentations</h2>

                <p>Book report on <a href="p/ddd-made-functional">DDD made functional</a></p>
                <p>Presentation <a href="p/dtu-11032020"><i>Of Product and Engineers</i></a> held at DTU (Copenhagen) on March 11th 2020</p>
                <p>Slides for <a href="https://github.com/invasionofsmallcubes/elementary-programming-dtu/tree/master/presentations">Elementary Programming held at DTU (Copenhagen) for Winter Semester</a></p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                {title}
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}
