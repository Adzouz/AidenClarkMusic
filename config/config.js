const htmlPublicPath = process.env.REACT_APP_HTML_PATH;

module.exports = {
  htmlPublicPath: htmlPublicPath,
  getRegex() {
    return [
      {
        regex: /href\=\"\//g,
        output: `href="${htmlPublicPath}/`
      },
      {
        regex: /src\=\"\//g,
        output: `src="${htmlPublicPath}/`
      },
      {
        regex: /srcset\=\"\//g,
        output: `srcset="${htmlPublicPath}/`
      },
      {
        regex: /data-image\=\"\//g,
        output: `data-image="${htmlPublicPath}/`
      },
      {
        regex: /background-image: url\(&quot;/g,
        output: `background-image: url(&quot;${htmlPublicPath}/`
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
