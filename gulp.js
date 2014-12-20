var gulp = require('gulp'),
    wiredep = require('wiredep'), //goes into bower
    $ = require('gulp-load-plugins')({lazy: false});

gulp
  .task('default', $.sequence('styles', 'browserify', 'bower', 'server', 'watch'))
  .task('styles', styles)
  .task('browserify', browserify)
  .task('server', server)
  .task('watch', watch);

var paths = {

};

function browserify() {
  var bundler = browserify({
    entries: ['./src/app.jsx'],
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
    watcher.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));

    console.log('Updated!', (Date.now() - updateStart)  +'ms');
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/'));
}

function styles() {
  return gulp.src( )
};

