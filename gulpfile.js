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

// gulp
//   .task('default', $.sequence('styles', 'browserify', 'bower', 'server', 'watch'))
//   .task('styles', styles)
//   .task('browserify', browserify)
//   .task('server', server)
//   .task('watch', watch);
//
gulp
  .task('browserify', scripts)
  .task('serve', serve)
  .task('styles', styles)
  .task('watch', watch);

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
    console.log('updating');
    watcher.bundle()
    .pipe(source('bundle.js'))

    //add uglify here
    .pipe(gulp.dest('./build/'))
    .pipe(livereload());

    console.log('Updated!', (Date.now() - updateStart)  +'ms');
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.dest));
}

function serve() {
  nodemon({script: 'server.js'});
}

function styles() {
  return gulp.src(paths.styles)
        .pipe(sass())
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

gulp.task('default', ['styles', 'watch', 'browserify']);
