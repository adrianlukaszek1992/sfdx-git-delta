# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.3.1](https://github.com/scolladon/sfdx-git-delta/compare/v4.3.0...v4.3.1) (2021-04-05)


### Bug Fixes

* silent SfdxCommand compilation issue ([#121](https://github.com/scolladon/sfdx-git-delta/issues/121)) ([d3af15a](https://github.com/scolladon/sfdx-git-delta/commit/d3af15ad509681d4209bebd22e19a8f8b38dd34d))

## [4.3.0](https://github.com/scolladon/sfdx-git-delta/compare/v4.2.3...v4.3.0) (2021-04-04)

### Features

- **ci:** add automated release ([#116](https://github.com/scolladon/sfdx-git-delta/issues/116)) ([7da4195](https://github.com/scolladon/sfdx-git-delta/commit/7da4195672e43efbc2e578caf784e9f393a4bc07))
- **ci:** add CodeCove ([#115](https://github.com/scolladon/sfdx-git-delta/issues/115)) ([f86ff26](https://github.com/scolladon/sfdx-git-delta/commit/f86ff26183bc2730d0e30db13088d82a42834b34))
- **feat:** add --ignore-destructive parameter ([#112](https://github.com/scolladon/sfdx-git-delta/issues/112)) ([4a934b0](https://github.com/scolladon/sfdx-git-delta/commit/4a934b0d4e632469825ef4431b01947924d98480))

### Bug Fixes

- ignore reference the right files ([3082176](https://github.com/scolladon/sfdx-git-delta/commit/3082176d7540d3263dd8e5f9d94e9e96a3ce6c50))
- Custom Label Addition package.xml generation ([#114](https://github.com/scolladon/sfdx-git-delta/issues/114)) ([1447b5c](https://github.com/scolladon/sfdx-git-delta/commit/1447b5c8f968c576752a4eea63d1ac32ca881b5d))
- Make sure destructiveChanges.xml does not contains package.xml element ([#113](https://github.com/scolladon/sfdx-git-delta/issues/113)) ([9729e2f](https://github.com/scolladon/sfdx-git-delta/commit/9729e2f092ab21082f2bea151cde3701856b2477))

## [4.3.0](https://github.com/scolladon/sfdx-git-delta/compare/v4.2.3...v4.3.0) (2021-04-04)

### Features

- **ci:** add automated release ([#116](https://github.com/scolladon/sfdx-git-delta/issues/116)) ([7da4195](https://github.com/scolladon/sfdx-git-delta/commit/7da4195672e43efbc2e578caf784e9f393a4bc07))

### Bug Fixes

- ignore reference the right files ([3082176](https://github.com/scolladon/sfdx-git-delta/commit/3082176d7540d3263dd8e5f9d94e9e96a3ce6c50))

# Changelog

Move to the sfdx plugin architecture!
`sfdx plugins:install sfdx-git-delta`
`sgd` command line is still supported

## Added

- sfdx sgd:source:delta command via sfdx plugin
- v50.0 API

## Changed

- -V parameter of `sgd` command is handled by `sfdx plugins` command
- Migrate from npm to yarn command line for development tooling
- Migrate from travis-ci to gh-actions
- -r parameter default value is now '.' instead of 'repo'
