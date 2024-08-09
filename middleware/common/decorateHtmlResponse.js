const decorateHtmlResponse = (page_title) => {
  return function (req, res,next) {
    res.locals.html = true;
    res.locals.title = `${page_title} - Chat App`;
    next()
  };
};

module.exports = decorateHtmlResponse;
