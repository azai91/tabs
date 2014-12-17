var gulp = require('gulp'),
    wiredep = require('wiredep'), //goes into bower
    $ = require('gulp-load-plugins')({lazy: false});

gulp
  .task('default', $.sequence('styles', 'inject', 'bower', 'server', 'watch'))
  .task('styles', styles)
  .task('inject', bower)
  .task('server', server)
  .task('watch', watch);

var paths = {

};

var styles = function () {
  return gulp.src( )

};

