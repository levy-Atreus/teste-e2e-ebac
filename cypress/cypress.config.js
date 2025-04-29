const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'bfbdm5',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    //video: true, //tire as barras para gravar o teste
  },
});