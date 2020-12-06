import Layout, {siteTitle} from '../components/layout'

import Date from '../components/date'
import Head from 'next/head'
import Link from 'next/link'
import {getSortedPostsData} from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export default function Home({allPostsData}) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Hello, my name is Emanuele and I make stuff people use.</p>
                <p>My GitHub repository is located <a href="https://github.com/invasionofsmallcubes">here</a></p>
                <p>My LinkedIn page is located <a href="https://www.linkedin.com/in/emanueleianni">here</a></p>
                <p>My Twitter handler is <a href="https://twitter.com/IsTDDDeadYet">IsTDDDeadYet</a></p>
                <p>My Twitch handler is <a
                    href="https://www.twitch.tv/theinvasionofsmallcubes">theinvasionofsmallcubes</a></p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Presentations</h2>

                <p>
                    <a href="presentations/dtu-11032020">
                        Presentation <i>Of Product and Engineers</i> held at DTU (Copenhagen) on March 11th
                        2020</a>
                </p>
                <p>
                    <a href="p/docker-on-windows">Docker on Windows 10 Home</a>
                </p>
                <p>
                    <a href="p/dont-make-me-think">The notes on the book <i>Don't make me think (revisited)</i></a>
                </p>
                <p>
                    <a href="https://github.com/invasionofsmallcubes/elementary-programming-dtu/tree/master/presentations">Slides
                        for Elementary Programming held at DTU (Copenhagen) on the Winter 2020 Semester</a>
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({id, date, title}) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br/>
                            <small className={utilStyles.lightText}>
                                <Date dateString={date}/>
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
