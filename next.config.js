/* eslint-disable */
const withLess = require("@zeit/next-less");

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  exportPathMap: function() {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/table1": { page: "/table1" }
      // '/p/learn-nextjs': { page: '/post', query: { title: "Learn Next.js is awesome" } },
      // '/p/deploy-nextjs': { page: '/post', query: { title: "Deploy apps with Zeit" } }
    };
  }
});
