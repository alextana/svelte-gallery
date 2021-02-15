// tailwind.config.js
const isProduction = !process.env.ROLLUP_WATCH; 
module.exports = {
  purge: {
    content: [
      "./src/**/*.svelte",
      "./src/**/*.html"
    ],
    defaultExtractor: (content) => {
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
      const broadMatchesWithoutTrailingSlash = broadMatches.map((match) =>
        _.trimEnd(match, "\\")
      );
      const matches = broadMatches.concat(broadMatchesWithoutTrailingSlash);
      return matches;
    },
    enabled: isProduction,
  },
};
