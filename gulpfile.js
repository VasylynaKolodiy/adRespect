const {src, dest, watch, parallel} = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'src/'
    }
  });
}

function scripts() {
  return src([
    'node_modules/fslightbox/index.js',
    'src/scripts/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/scripts'))
    .pipe(browserSync.stream())
}


function styles() {
  return src('src/styles/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('src/styles'))
    .pipe(browserSync.stream())
}

function watching() {
  watch(['src/styles/*.scss'], styles);
  watch(['src/scripts/*.js', '!src/scripts/main.min.js'], scripts);
  watch(['src/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;


exports.default = parallel(styles, scripts, browsersync, watching);