import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Revue ConvertKit Sync</title>
        <meta
          name="description"
          content="Sync your Revue subscribers to ConvertKit — powered by Supabase and deployed to Vercel."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Revue ConvertKit Sync</a>
        </h1>

        <p className={styles.description}>
          An application that can sync your Revue & ConvertKit newsletter
          subscribers.
        </p>
        <p className={styles.description}>
          To get started, take a look at the{" "}
          <a
            href="https://github.com/dbredvick/revue-convertkit-sync/blob/main/pages/api/sync-revue-subscribers.ts"
            className={styles.code}
          >
            sync-revue-subscribers.ts
          </a>{" "}
          file.
        </p>

        <div className={styles.grid}>
          <a
            href="https://www.getrevue.co/api#get-/v2/subscribers"
            className={styles.card}
          >
            <h2>Revue docs &rarr;</h2>
            <p>We only pull active subscribers from Revue.</p>
          </a>

          <a
            href="https://developers.convertkit.com/#add-subscriber-to-a-form"
            className={styles.card}
          >
            <h2>ConvertKit docs &rarr;</h2>
            <p>
              We're using the Converkit API method to add subscribers to an
              existing form.
            </p>
          </a>

          <a href="https://supabase.io/docs" className={styles.card}>
            <h2>Supabase docs &rarr;</h2>
            <p>
              Supabase is the data store for our syncing engine. They have a
              great free tier & are entirely open source.
            </p>
          </a>

          <a
            href="https://github.com/dbredvick/revue-convertkit-sync/blob/main/docs/GettingStarted.md"
            className={styles.card}
          >
            <h2>Getting started &rarr;</h2>
            <p>Fork and deploy your own app to sync your subscribers.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
