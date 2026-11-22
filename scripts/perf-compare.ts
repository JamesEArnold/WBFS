/**
 * Lighthouse comparison: the same routes on a baseline deployment (e.g. the
 * pre-CMS production site) and a candidate (e.g. the CMS preview). Mobile
 * preset, median of RUNS runs per URL. Read-only; no secrets needed.
 *
 *   BASELINE_URL=https://weisburnforsheriff.com CANDIDATE_URL=https://<preview> npm run perf:compare
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ROUTES = process.env.ROUTES?.split(',') ?? ['/', '/about', '/donate', '/events', '/events/golf-fundraiser-3', '/time-in-office'];
const RUNS = Number(process.env.RUNS ?? 3);
const baseline = process.env.BASELINE_URL?.replace(/\/$/, '');
const candidate = process.env.CANDIDATE_URL?.replace(/\/$/, '');
if (!baseline || !candidate) {
  console.error('Set BASELINE_URL and CANDIDATE_URL.');
  process.exit(1);
}

const bin = path.resolve('node_modules/.bin/lighthouse');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lh-'));
const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

function run(url: string): { perf: number; lcp: number; cls: number; tbt: number } {
  const out = path.join(tmp, 'report.json');
  execFileSync(bin, [url, '--quiet', '--only-categories=performance', '--output=json', `--output-path=${out}`, '--chrome-flags=--headless=new'], {
    stdio: 'ignore',
  });
  const report = JSON.parse(fs.readFileSync(out, 'utf8'));
  return {
    perf: Math.round(report.categories.performance.score * 100),
    lcp: Math.round(report.audits['largest-contentful-paint'].numericValue),
    cls: Number(report.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
    tbt: Math.round(report.audits['total-blocking-time'].numericValue),
  };
}

function measure(url: string) {
  const runs = Array.from({ length: RUNS }, () => run(url));
  return {
    perf: median(runs.map((r) => r.perf)),
    lcp: median(runs.map((r) => r.lcp)),
    cls: median(runs.map((r) => r.cls)),
    tbt: median(runs.map((r) => r.tbt)),
  };
}

console.log(`Lighthouse (mobile, median of ${RUNS}) — baseline ${baseline} vs candidate ${candidate}`);
console.log('route | perf base→cand | LCP ms base→cand | CLS base→cand | TBT ms base→cand');
for (const route of ROUTES) {
  const b = measure(baseline + route);
  const c = measure(candidate + route);
  console.log(`${route} | ${b.perf}→${c.perf} | ${b.lcp}→${c.lcp} | ${b.cls}→${c.cls} | ${b.tbt}→${c.tbt}`);
}
