import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

const name = 'The Invasion of Small Cubes'
export const siteTitle = 'Welcome to the Invasion Of Small Cubes'

export default function Layout({
    children,
    home
}: {
    children: React.ReactNode
    home?: boolean
}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="this is my note taking app, shared with everybody"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=dark&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <script src="tracking.js"></script>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img
                            src="/images/face.jpeg"
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">

                            <img
                                src="/images/face.jpeg"
                                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                alt={name}
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link className={utilStyles.colorInherit} href="/">
                                {name}
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link legacyBehavior href="/">
                        ← Back to home
                    </Link>
                </div>
            )}
        </div>
    )
}
