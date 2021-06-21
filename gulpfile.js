const { series, parallel, watch } = require('gulp');
const gulp = require('gulp');
const del = require('del');
const spawn = require('cross-spawn');
const yargs = require('yargs');
const sitemap = require('gulp-sitemap');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const hashsum = require('gulp-hashsum');
const config = require('./gulp-tasks/loadGulpConfig'); // import custom js to parse YAML-configuration file (gulpconfig.yml)

// Clean stuff (delete '_site/' dir)
function clean(done) {
  del(config.clean); // config.key.other-key references values from gulpconfig.yml
  done();
}

// Run Jekll
function jekyllBuild(done) {
  browserSync.notify(config.jekyll.notification);
  return spawn('bundle', ['exec', 'jekyll', 'build'], {
    stdio: 'inherit'
  })
  .on('close', done);
}

// Create sitemap on production builds
function gulpSitemap(done) {
  const PRODUCTION = !!(yargs.argv.production); // Run things that say 'PRODCUTION' on production builds only ($ gulp --production)

  gulp.src((config.sitemap.src), {
    read: false
  })
    .pipe(sitemap({
      siteUrl: (config.sitemap.siteUrl),  // siteUrl is required by gulp-sitemap
      mappings: [{  // Mappings allows customization of the generated sitemap
        pages: [ '*.pdf', 'uploads/*.pdf', 'uploads/docs/*.pdf', 'uploads/pdf/*.pdf'], // This array looks for all PDF files using Glob patterns
        getLoc(siteUrl, loc, entry) {  // getLoc allows us to modify the loc element's values //! even tho siteUrl & entry are not used the sitemap won't process PDF files without them.
          loc = loc.replace(/&/g, '%26'); // Replace ampersand with "%26"
          return loc.replace(/\s/g, '%20'); // Replace all spaces in PDF titles with "%20" otherwise sitemap will error
        }
      }]
    }))
    .pipe(gulpif(PRODUCTION, gulp.dest('./')))
    .pipe(gulpif(PRODUCTION, gulp.dest('./_site')));
  done();
}

// Compile main.css file from sass modules
function mainScss() {
  const PRODUCTION = !!(yargs.argv.production);
  const cssNanoConfig = [cssnano({ zindex: false })]; // Do NOT minify z-index values because Bootstrap uses values greater that 1,000

  return gulp.src(config.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // errors shown in terminal for when you screw up your SASS
    .pipe(autoprefixer()) // Automatically prefix any CSS that is not compatible with the browsers defined in the gulpconfig
    .pipe(hashsum({filename: './_data/cache_bust_css.yml', hash: 'md5'}))
    .pipe(gulpif(PRODUCTION, postcss(cssNanoConfig)))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(config.sass.dest.jekyllRoot))
    .pipe(gulp.dest(config.sass.dest.buildDir))
    .pipe(browserSync.stream());
}

// compile 'content.css' which creates custom styles that are available to users the CloudCannon interface.
function cmsScss() { // DO NOT MINIFY OR COMPRESS CSS OUTPUT!!
  return gulp.src(config.cmsScss.src)
    .pipe(sass(config.cmsScss.outputStyle).on('error', sass.logError))
    .pipe(gulp.dest(config.cmsScss.dest.jekyllRoot))
    .pipe(gulp.dest(config.cmsScss.dest.buildDir))
    .pipe(browserSync.stream());
}

// copy static assets/**/* !except for SCSS, CSS, or JS files
// JS is handled by webpack. CSS and SCSS are handled by other gulp tasks.
function copy() {
  const PRODUCTION = !!(yargs.argv.production);

  browserSync.notify(config.copy.notification);
  return gulp.src(config.copy.assets)
    .pipe(gulpif(PRODUCTION, imagemin())) // compresses images when gulp --production is run.
    .pipe(gulp.dest(config.copy.dist));
}

// Initiate Broswersync
function browserSyncInit(done) {
  browserSync.init({
    notify: config.browsersync.notify,
    open: config.browsersync.open,
    port: config.browsersync.port,
    server: {
      baseDir: config.browsersync.server.basedir
    },
    xip: config.browsersync.xip,
    browser: config.browsersync.browser
  });
  done();
}

// Reload Browsersync
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

// Watch the project for file changes ( with Gulp 4's new watch API )
function watchFiles() {
  // Watch all-things jekyll related (i.e. *.yml, *.md, *.html, files and jekyll underscored _dir's)
  watch(
    config.watch.pages,
    series(
      build,
      browserSyncReload
    )
  );
  // Watch for SASS changes in main.scss
  watch(
    config.watch.sass,
    mainScss
  );
  // Watch for SASS changes in content.scss
  watch(
    config.watch.sass,
    cmsScss
  );
  // Watchin' for static asset changes (e.g. new images)
  watch(
    config.watch.images,
    series(
      copy,
      browserSyncReload
    )
  );
}

// More complex tasks go like this:
// Task lineup (calling functions defined above) for compiling the files that make up the actual static site (in _site dir)
const build = series( // Series items need to be executed in a specific order (new to Gulp 4)
  clean,
  jekyllBuild,
  parallel( // These parallel tasks require the '_site' to be built, but it doesnt really matter what order they execute.
    gulpSitemap,
    mainScss,
    cmsScss,
    copy
  ),
);

// unless you export a task, you cannot call that task from terminal (e.g. `$ gulp build` would run just the '_site' compile)
// Gulp 4 docs call this private vs public tasks. public meaning tasks that are exported and callable from terminal
exports.build = build;
// While the tasks below are commented out, they remain private tasks (i.e. you cannot call `$ gulp watch` from terminal. Why would you need to?)
//exports.browserSync = browserSync;
//exports.watchFiles = watchFiles;

// Define gulp's default task
exports.default = series(
  build,
  parallel(
    browserSyncInit,
    watchFiles
  )
);
