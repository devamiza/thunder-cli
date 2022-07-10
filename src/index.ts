import Bootstrap from './lib/bootstrap';

const { answers } = await Bootstrap.pre();
await Bootstrap.main({ answers });
Bootstrap.post();
