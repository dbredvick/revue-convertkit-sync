export default {
  repository: "https://github.com/dbredvick/revue-convertkit-sync", // project repo
  docsRepository: "https://github.com/dbredvick/revue-convertkit-sync", // docs repo
  branch: "main", // branch of docs
  path: "/", // path of docs
  titleSuffix: " – Revue ConvertKit Sync",
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Drew Bredvick.`,
  footerEditOnGitHubLink: true, // will link to the docs repo
  logo: (
    <>
      <svg>...</svg>
      <span>Revue ConvertKit Synnc</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Revue ConvertKit Sync: open source and free way to sync Revue with ConvertKit"
      />
      <meta
        name="og:title"
        content="Revue ConvertKit Sync: open source and free way to sync Revue with ConvertKit"
      />
    </>
  ),
};
