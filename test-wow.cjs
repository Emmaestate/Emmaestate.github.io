try {
  const wow = require('wowjs');
  console.log('require result:', wow);
  console.log('Type of result:', typeof wow);
  console.log('Keys:', Object.keys(wow));
} catch (e) {
  console.error(e);
}
