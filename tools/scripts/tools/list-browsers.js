#!/usr/bin/env node

const { exec } = require('child_process');
const os = require('os');

console.log('🔍 Detecting installed browsers...');

const platform = os.platform();

const browserChecks = {
  darwin: [
    { name: 'Google Chrome', cmd: 'mdfind "kMDItemCFBundleIdentifier == com.google.Chrome"' },
    { name: 'Firefox',       cmd: 'mdfind "kMDItemCFBundleIdentifier == org.mozilla.firefox"' },
    { name: 'Safari',        cmd: 'mdfind "kMDItemCFBundleIdentifier == com.apple.Safari"' },
    { name: 'Brave',         cmd: 'mdfind "kMDItemCFBundleIdentifier == com.brave.Browser"' },
    { name: 'Arc',           cmd: 'mdfind "kMDItemCFBundleIdentifier == company.thebrowser.Browser"' },
    { name: 'Edge',          cmd: 'mdfind "kMDItemCFBundleIdentifier == com.microsoft.edgemac"' },
  ],
  linux: [
    { name: 'Google Chrome', cmd: 'which google-chrome || which google-chrome-stable' },
    { name: 'Firefox',       cmd: 'which firefox' },
    { name: 'Brave',         cmd: 'which brave-browser' },
    { name: 'Chromium',      cmd: 'which chromium || which chromium-browser' },
    { name: 'Edge',          cmd: 'which microsoft-edge' },
  ],
  win32: [
    { name: 'Google Chrome', cmd: 'where "chrome.exe"' },
    { name: 'Firefox',       cmd: 'where "firefox.exe"' },
    { name: 'Brave',         cmd: 'where "brave.exe"' },
    { name: 'Edge',          cmd: 'where "msedge.exe"' },
  ],
};

const checks = browserChecks[platform] || browserChecks.linux;
const found = [];
let pending = checks.length;

checks.forEach(({ name, cmd }) => {
  exec(cmd, (error, stdout) => {
    if (!error && stdout.trim()) {
      const browserPath = stdout.trim().split('\n')[0];
      found.push({ name, path: browserPath });
      console.log(`✅ ${name}: ${browserPath}`);
    } else {
      console.log(`❌ ${name}: not found`);
    }

    pending--;

    if (pending === 0) {
      console.log(`📋 Found ${found.length} browser(s)`);
      console.log(JSON.stringify(found));
      process.exit(0);
    }
  });
});