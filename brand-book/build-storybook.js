#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');

const storybook = path.join(__dirname, 'node_modules', 'storybook', 'bin', 'storybook.js');

const args = ['build'];

spawn(process.execPath, [storybook, ...args], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
}).on('exit', process.exit);
