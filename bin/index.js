#! /usr/bin/env node

const masonite = require('commander')
const version = require('.././package.json').version

masonite
  .version(version)
  .description('A simple static website generator CLI using HTML with light templating and Stylus for CSS preprocessing.')

masonite
  .command('create [name]')
  .description('Creates the basic masonite file structure in the current directory or in [name]')
  .action(function (name, options) {
    if (name) console.log(name)
    //if (options) console.log(options)
  })

masonite
  .command('wreck')
  .description('Deletes the static site in the site/ directory')

masonite
  .command('build')
  .description('Builds the static site in the site/ directory')

masonite
  .command('watch')
  .description('Watches files and updates the static site in the site/ directory; Also serves the site/ directory')

masonite.parse(process.argv)

