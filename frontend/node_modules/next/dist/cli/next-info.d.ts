#!/usr/bin/env node
import { CliCommand } from '../lib/commands';
/**
 * Runs few scripts to collect system information to help with debugging next.js installation issues.
 * There are 2 modes, by default it collects basic next.js installation with runtime information. If
 * `--verbose` mode is enabled it'll try to collect, verify more data for next-swc installation and others.
 */
declare const nextInfo: CliCommand;
export { nextInfo };
