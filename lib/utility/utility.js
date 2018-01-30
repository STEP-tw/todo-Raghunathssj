exports.toS = function(o) {
  return JSON.stringify(o, null, 2);
};

exports.getContentType = function(extention) {
  const contentTypes = {
    '.html':'text/html',
    '.jpg':'base64',
    '.gif':'base64',
    '.css':'text/css',
    '.js':'text/javascript',
    '.ico':'base64',
    '.pdf':'application/pdf'
  };
  return contentTypes[extention];
};
