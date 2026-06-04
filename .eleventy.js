module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addFilter("dateString", (date) => {
    return new Date(date).toISOString().slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      data: "data",
      includes: "_includes",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
