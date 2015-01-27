var gulp = require('gulp');

var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp
  .task('browserify', scripts)
  .task('serve', serve)
  .task('styles', styles)
  .task('watch', watch);

gulp.task('default', ['styles', 'browserify', 'watch','serve']);
gulp.task('build', ['styles', 'browserify']);

var paths = {
  script: './client/app/app.jsx',
  scripts: ['./client/app/app.jsx','./client/app/**/*.js'],
  styles: './client/styles/*.scss',
  dest: './build'
};

function scripts() {
  var bundler = browserify({
    entries: paths.script,
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  bundler.bundle()
   .on('error', function(err) {
    console.log('Error with Browserify', err);
   })
   .pipe(source('bundle.js'))
   .pipe(gulp.dest('./build'))
   .pipe(livereload());
};

function serve() {
  nodemon({script: 'server.js'});
}

function styles() {
  var updateStart = Date.now();
  console.log('Updating styles');

  return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({
          errLogToConsole: true,
          onSuccess: function(css) {
            console.log('Updated styles!', (Date.now() - updateStart)  +'ms');
          }
        }))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.dest))
        .pipe(livereload());
}

function watch() {
  livereload.listen();
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, scripts);
}
