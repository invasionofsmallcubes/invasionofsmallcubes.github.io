import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import styles from '../../components/layout.module.css'
import utilStyles from '../../styles/utils.module.css'
const photosDirectory = path.join(process.cwd(), 'public/thumbs')

export default function Home({ photos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kasia and Emanuele's wedding</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to Kasia and Emanuele wedding photos!</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.listWedding}>
          {photos.map((id) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/wedding/[id]" as={`/wedding/${id}`}>
                <img src={`/thumbs/${id}`} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export async function getStaticProps() {

  const photos = fs.readdirSync(photosDirectory)

  return {
    props: {
      photos
    }
  }
}