module.exports = {
  getRegex(publicPath) {
    return [
      {
        regex: /(.*)(?=<div id\=\"root\")/,
        output: ''
      },
      {
        regex: /<div id\=\"root\"/,
        output: `<link rel="stylesheet" href="${publicPath}/main.css?$staticlink$" /> <div id="root"`
      },
      {
        regex: /<\/body><\/html>/,
        output: ''
      },
      {
        regex: /src\=\"\//g,
        output: `src="${publicPath}/`
      },
      {
        regex: /srcset\=\"\//g,
        output: `srcset="${publicPath}/`
      },
      {
        regex: /data-image\=\"\//g,
        output: `data-image="${publicPath}/`
      },
      {
        regex: /background-image: url\(&quot;/g,
        output: `background-image: url(&quot;${publicPath}/`
      },
      {
        regex: /app\.js/,
        output: `app.js?$staticlink$`
      },
      {
        regex: /\.jpg/g,
        output: '.jpg?$staticlink$'
      },
      {
        regex: /\.jpeg/g,
        output: '.jpeg?$staticlink$'
      },
      {
        regex: /\.png/g,
        output: '.png?$staticlink$'
      },
      {
        regex: /\.svg/g,
        output: '.svg?$staticlink$'
      },
      {
        regex: /\.webm/g,
        output: '.webm?$staticlink$'
      },
      {
        regex: /\.webp/g,
        output: '.webp?$staticlink$'
      },
      {
        regex: /\.mp4/g,
        output: '.mp4?$staticlink$'
      },
      {
        regex: /<!-- start script dev dependencies -->([\S\s]*?)<!-- end script dev dependencies -->/g,
        output: ''
      },
      {
        regex: /<!-- start script dev dependencies -->([\S\s]*?)<!-- end script dev dependencies -->/g,
        output: ''
      }
    ];
  }
};
