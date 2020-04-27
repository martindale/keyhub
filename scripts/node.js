'use strict';

const Web = require('@fabric/http');
const KeyHub = require('../types/keyhub');
const settings = require('../settings/default');

async function main () {
  const keyhub = new KeyHub(settings);
  const server = new Web.Server(settings);

  await keyhub.start();
  await server.start();
}

function errorHandler (error) {
  console.error('[KEYHUB:NODE]', 'Keyhub emitted error:', error);
}

main().catch(errorHandler);