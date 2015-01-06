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

gulp.task('default', ['styles', 'watch', 'browserify', 'serve']);
gulp.task('build', ['styles', 'browserify', 'serve']);

var paths = {
  script: './client/app/app.jsx',
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

  var watcher = watchify(bundler);

  return watcher
  .on('update', function() {
    var updateStart = Date.now();
    console.log('Updating scripts');
    watcher.bundle()
    .pipe(source('bundle.js'))

    //add uglify here
    .pipe(plumber())
    .pipe(gulp.dest('./build/'))
    .pipe(livereload());

    console.log('Updated scripts!', (Date.now() - updateStart)  +'ms');
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.dest));
}

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
        .pipe(livereload())
        .pipe(gulp.dest(paths.dest));
}

function watch() {
  livereload.listen();
  gulp.watch(paths.styles, styles);
}
