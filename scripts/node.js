'use strict';

const Web = require('@fabric/http');

async function main () {
  const server = new Web.Server();
  await server.start();
}

function errorHandler (error) {
  console.error('[KEYHUB:NODE]', 'Keyhub emitted error:', error);
}

main().catch(errorHandler);