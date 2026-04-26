#!/usr/bin/env node

// 30x-image — install / uninstall the skill into the agent skills directory
// Usage:
//   npx 30x-image install      # install to ~/.agents/skills/30x-image/
//   npx 30x-image uninstall    # remove (backs up first)
//   npx 30x-image help

const fs = require("fs");
const path = require("path");
const os = require("os");

const SKILL_NAME = "30x-image";
const SOURCE_DIR = path.join(__dirname, "..", "skill");
const TARGET_DIR = path.join(os.homedir(), ".agents", "skills", SKILL_NAME);

function copyRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyRecursive(s, d);
    else if (entry.isSymbolicLink()) fs.symlinkSync(fs.readlinkSync(s), d);
    else fs.copyFileSync(s, d);
  }
}

function install() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`\u2717 Source skill/ directory not found at: ${SOURCE_DIR}`);
    console.error(`  Are you running this from a broken install?`);
    process.exit(1);
  }

  if (fs.existsSync(TARGET_DIR)) {
    const backup = `${TARGET_DIR}.backup-${Date.now()}`;
    console.log(`\u26a0  Existing install found, backing up to:`);
    console.log(`   ${backup}`);
    fs.renameSync(TARGET_DIR, backup);
  }

  copyRecursive(SOURCE_DIR, TARGET_DIR);
  console.log(`\u2713 Installed ${SKILL_NAME} skill to:`);
  console.log(`   ${TARGET_DIR}`);
  console.log(``);
  console.log(`Next: restart your Codex / Claude Code session to load the skill.`);
  console.log(`Then say "use 30x-image" to begin.`);
}

function uninstall() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.log(`Nothing to uninstall at: ${TARGET_DIR}`);
    return;
  }
  const backup = `${TARGET_DIR}.removed-${Date.now()}`;
  fs.renameSync(TARGET_DIR, backup);
  console.log(`\u2713 Uninstalled. Old install moved to:`);
  console.log(`   ${backup}`);
  console.log(`(Delete it manually when you're sure you don't want it back.)`);
}

function help() {
  console.log(`30x-image \u2014 Codex skill for on-brand marketing imagery via gpt-image-2`);
  console.log(``);
  console.log(`Usage:`);
  console.log(`  npx 30x-image install     Install skill to ~/.agents/skills/30x-image/`);
  console.log(`  npx 30x-image uninstall   Remove the installed skill (backs up first)`);
  console.log(`  npx 30x-image help        Show this help`);
  console.log(``);
  console.log(`Repo: https://github.com/norahe0304-art/30x-image`);
}

const cmd = (process.argv[2] || "install").toLowerCase();
switch (cmd) {
  case "install":
  case "i":
    install();
    break;
  case "uninstall":
  case "remove":
  case "rm":
    uninstall();
    break;
  case "help":
  case "--help":
  case "-h":
    help();
    break;
  default:
    console.error(`Unknown command: ${cmd}`);
    console.error(`Run "npx 30x-image help" for usage.`);
    process.exit(1);
}
