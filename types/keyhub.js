'use strict';

const Interface = require('@fabric/core/types/interface');

class KeyHub extends Interface {
  constructor (settings = {}) {
    super(settings);
    this.settings = Object.assign({}, this.settings, settings, {
      // Locally assigned defaults
    });
  }
}

module.exports = KeyHub;