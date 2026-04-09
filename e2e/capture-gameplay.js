const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const PORT = 3939;
const URL = `http://localhost:${PORT}`;

let shotNum = 0;

async function screenshot(page, label) {
  shotNum++;
  const num = String(shotNum).padStart(3, '0');
  const filepath = path.join(SCREENSHOT_DIR, `screenshot-${num}.png`);
  await page.screenshot({ path: filepath, fullPage: true });
  console.log(`  screenshot-${num}.png — ${label}`);
}

async function clickCell(page, index) {
  await page.click(`[data-index="${index}"]`);
}

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function playMoveAndShot(page, index, label) {
  await clickCell(page, index);
  await wait(800);
  await screenshot(page, label);
}

async function getStatus(page) {
  return page.textContent('#status');
}

(async () => {
  // Ensure screenshots dir exists
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  // Start local HTTP server
  console.log('Starting HTTP server...');
  const server = spawn('npx', ['serve', ROOT, '-l', String(PORT), '--no-clipboard'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stderr.on('data', d => {
    const msg = d.toString();
    if (msg.includes('address already in use')) {
      console.error('Port already in use — kill existing process first');
      process.exit(1);
    }
  });

  // Wait for server to be ready
  await wait(3000);
  console.log(`Server assumed ready on ${URL}`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 600, height: 900 } });
    const page = await context.newPage();

    await page.goto(URL, { waitUntil: 'networkidle' });
    console.log('Page loaded.\n');

    // ──────────── GAME 1: Play to a DRAW ────────────
    console.log('GAME 1 — Playing for a DRAW');
    await screenshot(page, 'Game 1: Fresh board');

    // Verified draw sequence: Human 4,2,3,1,8 — AI responds 0,6,5,7
    await playMoveAndShot(page, 4, 'Game 1: Human center (4), AI responds');
    await playMoveAndShot(page, 2, 'Game 1: Human top-right (2), AI responds');
    await playMoveAndShot(page, 3, 'Game 1: Human mid-left (3), AI responds');
    await playMoveAndShot(page, 1, 'Game 1: Human top-mid (1), AI responds');

    // Check if game over — if not, play remaining cell
    let status = await getStatus(page);
    if (!status.includes('DRAW') && !status.includes('WIN')) {
      await playMoveAndShot(page, 8, 'Game 1: Human bottom-right (8), final move');
    }

    status = await getStatus(page);
    await screenshot(page, `Game 1 FINAL — ${status.trim()}`);

    // Reset
    await page.click('#reset-btn');
    await wait(500);
    await screenshot(page, 'Board reset — new background color');

    // ──────────── GAME 2: Let the computer WIN ────────────
    console.log('\nGAME 2 — Letting the computer win');

    // Sequence: Human 0,3,1 — AI responds 4,6,2 winning via 2-4-6 diagonal
    await playMoveAndShot(page, 0, 'Game 2: Human top-left (0), AI responds');
    await playMoveAndShot(page, 3, 'Game 2: Human mid-left (3), AI responds');

    status = await getStatus(page);
    if (!status.includes('WIN') && !status.includes('MACHINE')) {
      await playMoveAndShot(page, 1, 'Game 2: Human top-mid (1), AI responds');
    }

    status = await getStatus(page);
    if (!status.includes('WIN') && !status.includes('MACHINE')) {
      // If somehow not over, play an available cell
      const empty = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.cell'))
          .map((c, i) => (c.textContent === '' ? i : -1))
          .filter(i => i >= 0)
      );
      if (empty.length > 0) {
        await playMoveAndShot(page, empty[0], `Game 2: Human plays ${empty[0]}`);
      }
    }

    await screenshot(page, `Game 2 FINAL — ${(await getStatus(page)).trim()}`);

    // Reset
    await page.click('#reset-btn');
    await wait(500);
    await screenshot(page, 'Board reset — another background color');

    // ──────────── GAME 3: Another sequence for variety ────────────
    console.log('\nGAME 3 — Another sequence');

    await playMoveAndShot(page, 8, 'Game 3: Human bottom-right (8), AI responds');
    await playMoveAndShot(page, 6, 'Game 3: Human bottom-left (6), AI responds');

    status = await getStatus(page);
    if (!status.includes('WIN') && !status.includes('MACHINE') && !status.includes('DRAW')) {
      await playMoveAndShot(page, 1, 'Game 3: Human top-mid (1), AI responds');
    }

    status = await getStatus(page);
    if (!status.includes('WIN') && !status.includes('MACHINE') && !status.includes('DRAW')) {
      const empty = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.cell'))
          .map((c, i) => (c.textContent === '' ? i : -1))
          .filter(i => i >= 0)
      );
      if (empty.length > 0) {
        await playMoveAndShot(page, empty[0], `Game 3: Human plays ${empty[0]}`);
      }
    }

    await screenshot(page, `Game 3 FINAL — ${(await getStatus(page)).trim()}`);

    // Final scoreboard shot
    await wait(300);
    await screenshot(page, 'Final scoreboard tally');

    console.log(`\nDone! ${shotNum} screenshots captured.`);
  } catch (err) {
    console.error('Error:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.kill();
    console.log('Cleaned up browser and server.');
  }
})();
