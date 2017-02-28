module.exports = {
  method(context, request) {
    const config = this.settings.app;
    context.confg = config;
    return context;
  }
};
