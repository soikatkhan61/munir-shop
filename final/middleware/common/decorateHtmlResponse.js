function decorateHtmlResponse(page_title) {
    return function (req, res, next) {
      res.locals.title = `${page_title}`;
      next();
    };
  }
  
  module.exports = decorateHtmlResponse;