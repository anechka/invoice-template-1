var jade_config = {pretty: true};
var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    jade    = require('gulp-jade'),
    rename  = require('gulp-rename'),
    cssmin  = require('gulp-clean-css'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify');

gulp.task('jade', function() {
    // Jade templates from /jade folder
    gulp.src(['jade/*.jade'])
        .pipe(jade(jade_config))
        .pipe(gulp.dest('dist'));
});

gulp.task('scss', function() {
  return gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(concat('j.js'))
    .pipe(gulp.dest('dist/js'));
});


gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['scss']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('jade/*.jade', ['jade']);
});

gulp.task('default', ['scss', 'js', 'jade', 'watch']);