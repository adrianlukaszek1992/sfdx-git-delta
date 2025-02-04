'use strict'
const cpUtils = require('./childProcessUtils')
const gc = require('./gitConstants')
const childProcess = require('child_process')
const fs = require('fs')
const ignore = require('ignore')
const os = require('os')
const path = require('path')

const fullDiffParams = ['--no-pager', 'diff', '--name-status', '--no-renames']

module.exports = (config, metadata) => {
  const { stdout: diff } = childProcess.spawnSync(
    'git',
    [...fullDiffParams, config.from, config.to],
    { cwd: config.repo, encoding: gc.UTF8_ENCODING }
  )

  return treatResult(cpUtils.treatDataFromSpawn(diff), metadata, config)
}

const treatResult = (repoDiffResult, metadata, config) => {
  const lines = repoDiffResult.split(os.EOL)
  const linesPerDiffType = lines.reduce(
    (acc, line) => (acc[line.charAt(0)]?.push(line), acc),
    { [gc.ADDITION]: [], [gc.DELETION]: [] }
  )
  const AfileNames = new Set(
    linesPerDiffType[gc.ADDITION].map(
      line => path.parse(line.replace(gc.GIT_DIFF_TYPE_REGEX, '')).base
    )
  )
  const deletedRenamed = new Set(
    linesPerDiffType[gc.DELETION].filter(line =>
      AfileNames.has(path.parse(line.replace(gc.GIT_DIFF_TYPE_REGEX, '')).base)
    )
  )

  return lines
    .filter(
      line =>
        !!line &&
        !deletedRenamed.has(line) &&
        line
          .split(path.sep)
          .some(part => Object.prototype.hasOwnProperty.call(metadata, part))
    )
    .filter(filterIgnore(config))
}

const filterIgnore = config => line => {
  const ig = ignore()
  const dig = ignore()
  ;[
    { ignore: config.ignore, helper: ig },
    { ignore: config.ignoreDestructive, helper: dig },
  ].forEach(
    ign =>
      ign.ignore &&
      fs.existsSync(ign.ignore) &&
      ign.helper.add(fs.readFileSync(ign.ignore).toString())
  )
  return config.ignoreDestructive
    ? line.startsWith(gc.DELETION)
      ? !dig.ignores(line.replace(gc.GIT_DIFF_TYPE_REGEX, ''))
      : !ig.ignores(line.replace(gc.GIT_DIFF_TYPE_REGEX, ''))
    : !ig.ignores(line.replace(gc.GIT_DIFF_TYPE_REGEX, ''))
}
