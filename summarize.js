const fs = require('fs');
const data = JSON.parse(fs.readFileSync('test-results/results.json', 'utf8'));

let passed = 0, failed = 0, skipped = 0;
const failedTests = [];

function walk(suite) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests) {
      const status = test.results[0]?.status;
      if (status === 'passed') passed++;
      else if (status === 'failed') { failed++; failedTests.push(spec.title); }
      else skipped++;
    }
  }
  for (const s of suite.suites || []) walk(s);
}
data.suites.forEach(walk);

console.log(`Passed: ${passed}, Failed: ${failed}, Skipped: ${skipped}`);
if (failedTests.length) {
  console.log('Failed tests:');
  failedTests.forEach(t => console.log(` - ${t}`));
}