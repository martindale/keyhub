'use strict';

// import '../styles/screen.less';

// Constants
const TICK_INTERVAL = 60000;

// Settings
const settings = require('../settings/default');

// Types
const SPA = require('@fabric/http/types/spa');
const KeyHub = require('../types/keyhub');

/**
 * Main process.
 */
async function main () {
  // TODO: disable globally-available app
  const app = window.app = new SPA(settings);
  const keyhub = window.keyhub = new KeyHub(settings);

  // TODO: move all circuit methods to `methods` (or `functions`)
  app._registerMethod('_generateIdentity', async function innerIdentityGenerator () {
    // TODO: move this entire function to be defined from config
    let identity = await app._generateIdentity();
    console.log('generated identity:', identity);
  });

  // Handle messages from the client
  app.on('message', handleAppMessage.bind(app));

  // Handle messages from the engine
  keyhub.on('message', handleKeyHubMessage.bind(forge));

  // Handle errors from the client
  app.on('error', handleAppError.bind(app));

  // Handle errors from the engine
  keyhub.on('error', handleKeyHubError.bind(forge));

  // Begin Progressive Enhancement
  await app.start();
  await app.handler();

  // Start the Engine
  await keyhub.start();

  setInterval(function tick () {
    console.log('[KEYHUB:APP]','tick:', app.state);
  }, TICK_INTERVAL);
}

/**
 * Process a message from the UI.
 * @param {CustomEvent} msg Message from the component.
 */
async function handleAppMessage (msg) {
  console.warn('[KEYHUB:APP]', 'Received SPA Message:', msg);
  console.warn('[KEYHUB:APP]', 'Do something with this message?');
}

async function handleKeyHubMessage (msg) {
  console.log('[KEYHUB:APP]', 'Received KeyHub Message:', msg);
  switch (msg['@type']) {
    default:
      throw new Error(`Unhandled message type "${msg['@type']}`);
    case 'Snapshot':
      let snapshot = msg['@data'];
      console.log('[KEYHUB:APP]', 'Got Snapshot:', snapshot);
      app.state = snapshot;
      break;
  }
}

async function handleAppError (msg) {
  console.error('[KEYHUB:APP]', 'Received SPA Error:', msg);
}

async function handleKeyHubError (msg) {
  console.error('[KEYHUB:APP]', 'Received KeyHub Error:', msg);
}

main().catch((exception) => {
  console.error('[KEYHUB:APP]', 'App threw Exception:', exception);
});
