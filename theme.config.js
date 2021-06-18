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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      <span style={{ marginLeft: "4px" }}>Revue ConvertKit Sync</span>
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
