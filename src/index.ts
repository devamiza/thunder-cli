import Bootstrap from './lib/bootstrap.js';

const { answers } = await Bootstrap.pre();
await Bootstrap.main({ answers });
Bootstrap.post();
