# KCC Tuition & Aid

#### Jekyll + Webpack + Babel + Sass + Autoprefixer + imagemin + BrowserSync + ...

-----

<br>

The Development of new KCC website is based off of designer's mockups and uses open source technologies.

**This site uses KCC's own gem-based jekyll-theme--developed in-house!**

You can find the kcc-gem-theme at https://rubygems.org/gems/kcc-gem-theme and on GitHub at https://github.com/KankakeeCommunityCollege/kcc-gem-theme/

[![Gem Version](https://badge.fury.io/rb/kcc-gem-theme.svg)](https://badge.fury.io/rb/kcc-gem-theme)

***This README assumes you are using a modern macOS system***

*The same setup can be achieved on Windows and Linux however, the requirements are different.*

-----

<br>

## Requirements

 - Jekyll & Bundler:
```shell
$ gem install jekyll
$ gem install bundler
```
 - Nodejs/npm - We use NVM (Node Version Manager): <https://github.com/creationix/nvm>
   - .nvmrc file in this repo will make NVM use the Node version listed in `.nvmrc` (to avoid compatibility issues)
   - Or, if you must - Use the Nodejs installer: <https://nodejs.org/>
 - Webpack 5

The ruby version for this project is specified in the `.ruby-version` file.

-------

<br>

## Installation

-------

1. Clone (via ssh) the project and `cd` into the new project folder
2. Install the gem and npm dependencies

```bash
git clone git@github.com:KankakeeCommunityCollege/tuition-and-aid.git
cd tuition-and-aid
npm i && bundle i ## Or `npm install && bundle install` if you like typing more
```

-----

<br>

## Development

***Do NOT push dev builds to the GitHub repo.***

```shell
$ npm run dev

# This alias in your dotfiles is convenient:
alias npm-d="npm run dev"
```

Dev builds run quicker on your machine. They make un-minified CSS, JS, & images.

Dev builds also create a sourcemap in the stylesheets. This allows tools like Chrome's inspect to display the Sass module a particular style is located in.

-----

<br>

## Production

***Only production builds should be pushed to the GitHub repo.***

```shell
$ npm run production

# Another convenient alias:
alias npm-p="npm run production"
```

Production build minifies CSS and JavaScript and compresses image files.

-----

<br>

## Accessibility testing with Pa11y

Pa11y is used for automated and manual accessibility testing.

### Automated testing

The GitHub repo uses an action to automatically run pa11y after every commit to the `master` branch. This helps catch
things like missing alt text or other issues introduced by non-technical editors of the site in CloudCannon.

### Manual testing

`pa11y` and `pa11y-ci` are used in the local project files to test for accessibility issues. The `pa11y` script will run
on a local build of the project and test the files in `_site/` for accessibility issues. The `pa11y-ci` script runs using
the live `sitemap.xml` file of the website.

At this time, **the `pa11y-ci` script picks up more issues than the plain `pa11y` script.** The `pa11y` script doesn't seem to render or test all the dynamic content built with JavaScript so `pa11y-ci` will usually give more accurate results. The hope is to get `pa11y` configured better so that JS is rendered and dynamic content tested.

```bash
## Run pa11y on the local build
npm run test:pa11y
## Run pa11y-ci on the live sitemap
npm run test:pa11y-ci
```

Both scripts take the same arguments:

| Argument | Name | Description |
| ---------|------|-------------|
| `-o`     | Output     | Output the results to a log file (`pa11y-log.*.txt` and `pa11y-ci-log.*.txt`) |
| `-s`     | Skip build | Skip doing a Jekyll build prior to running `pa11y` (does not apply to `pa11y-ci`) |

Examples:

```bash
# Pa11y examples:
## Run pa11y and output the results to a log file
npm run test:pa11y -- -o
## Run pa11y, skip the jekyll build, and output the results to a log file
npm run test:pa11y -- -s -o

# Pa11y CI examples:
## Run pa11y-ci and output the results to a log file
npm run test:pa11y-ci -- -o
## This script does the same as passing the `-o` flag to `test:pa11-ci`
npm run test:pa11y-ci-log
```

### `pa11y-ci-sitemap.xml`

Since the sitemap contains PDF files, there is a separate sitemap file for use with `pa11y-ci` that excludes them.
The file `pa11y-ci-sitemap.xml` is used for this purpose. You can run `pa11y-ci` against the standard `sitemap.xml`
file but it will take a lot longer and the resulting PDF errors are not helpful.

### Pa11y CI logs/reporting

When running `npm run test:pa11y-ci -- -o` or `npm run test:pa11y-ci-log`, the log file is created in the `./pa11y-ci-logs/` folder. These logs *should* be committed to GitHub to document our ongoing accessibility testing and results.

**If any errors are found, the log file should be duplicated with the filename suffix `_remediation.txt` and the fix documented there.**

-----

<br>

## The [kcc-gem-theme](https://rubygems.org/gems/kcc-gem-theme)

You will notice this GitHub repo has nothing in it's `_layouts/` dir and no `assets/img/` dir. Yet, when you build the project, images are there and it obviously has a layout. That's thanks to KCC's gem-based jekyll-theme.

Having a theme gem allows us to make changes (to the shared theme elements) across multiple sites, in one place.
