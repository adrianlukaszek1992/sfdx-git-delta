'use strict';
const childProcess = require('child_process');
const gc = require('./gitConstants');

const revlistParams = ['rev-list', '--max-parents=0', 'HEAD'];
const gitConfig = ['config', 'core.quotepath', 'off'];

module.exports = config => {
  childProcess.spawnSync('git', gitConfig, {
    cwd: config.repo,
  }).stdout;
  if (config.commitMessage) {
    const grep = '--grep=' + config.commitMessage;
    const logParams = ['log', grep];
    const commitLog = childProcess.spawnSync('git', logParams, {
      cwd: config.repo,
    }).stdout;
    const gitLogResult = Buffer.from(commitLog).toString(gc.UTF8_ENCODING).trim();
    updateConfig(config, gitLogResult);
  } else if (!config.from && !config.commitMessage) {
    const firstCommitSHARaw = childProcess.spawnSync('git', revlistParams, {
      cwd: config.repo,
    }).stdout;
    const firstCommitSHA = Buffer.from(firstCommitSHARaw);

    config.from = firstCommitSHA.toString(gc.UTF8_ENCODING).trim();
  }
};

const updateConfig = (config, gitLogResult) => {
  const commits = getCommits(gitLogResult);
  config.to = commits[0];
  config.from = getFromCommit(commits, config);
};

const getCommits = (gitLogResult) => gitLogResult.split('\n').reduce((acc, line) => {
  if (line.includes('commit ')) {
    const commit = line.split(' ')[1];
    return [...acc, commit];
  }
  return acc;
}, []);

const getFromCommit = (commits, config) => {
  const parentParams = ['rev-list', '--parents', '-n', '1', commits[commits.length - 1]];
  const parentCommit = childProcess.spawnSync('git', parentParams, {
    cwd: config.repo,
  }).stdout;
  return Buffer.from(parentCommit).toString(gc.UTF8_ENCODING).trim().split(' ')[1];
};
