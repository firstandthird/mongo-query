module.exports = {
  method(context, request) {
    const config = this.settings.app;
    context.config = config;
    return context;
  }
};
