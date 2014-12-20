var gulp = require('gulp');

var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

// gulp
//   .task('default', $.sequence('styles', 'browserify', 'bower', 'server', 'watch'))
//   .task('styles', styles)
//   .task('browserify', browserify)
//   .task('server', server)
//   .task('watch', watch);
//
gulp.task('browserify', scripts);

var paths = {

};

function scripts() {
  console.log('hi');
  var bundler = browserify({
    entries: ['./client/app.jsx'],
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
    .pipe(gulp.dest('./build/'));

    console.log('Updated!', (Date.now() - updateStart)  +'ms');
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/'));
}

gulp.task('default', ['browserify']);
