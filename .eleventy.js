const path = require('path');
const { DateTime } = require('luxon');
const slinkity = require('slinkity');
const react = require('@slinkity/renderer-react');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const Image = require('@11ty/eleventy-img');
const htmlmin = require('html-minifier');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');

// markdown-it configuration
const MARKDOWN_OPTIONS = {
  html: true,
  breaks: false,
  linkify: true,
};

/*
async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [800, 600, 300],
    formats: ['avif', 'webp', 'jpeg'],
    urlPath: '/images/',
    outputDir: './public/images/',
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}_${width}.${format}`;
    },
  });
  console.log(metadata);
  let imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}
*/

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(
    slinkity.plugin,
    slinkity.defineConfig({
      renderers: [react],
      server: {
        https: false,
        host: '127.0.0.1',
        port: 8080,
      },
      build: {
        minify: 'esbuild',
      },
    }),
  );

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Frontmatter
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '<!-- excerpt -->',
    excerpt_alias: 'excerpt',
  });

  // Passthroughs
  eleventyConfig.addPassthroughCopy('public');

  // Shortcodes
  eleventyConfig.addShortcode('minifyJson', (json) => {
    return JSON.stringify(JSON.parse(json));
  });

  //eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  // Libraries
  eleventyConfig.setLibrary('md', markdownIt(MARKDOWN_OPTIONS));

  // Filters
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('MMMM d, yyyy');
  });

  eleventyConfig.addFilter('toHTML', (str) => {
    return new markdownIt(MARKDOWN_OPTIONS).render(str.toString());
  });

  eleventyConfig.addFilter('filterTagList', (tags) => {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1,
    );
  });

  // Transforms
  /*
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( this.outputPath && this.outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
  */

  // Layout aliases
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('section', 'layouts/section.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  return {
    // Control which files Eleventy will process
    templateFormats: ['njk', 'md', 'html', 'xml'],

    // Pre-process *.md and *.html files with Nunjucks.
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    pathPrefix: '/',
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  };
};
