var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var watch = require('gulp-watch');

gulp.task("compile-es2015", function () {
  return gulp.src(["src/helper.js", "src/tasks.js", "src/validator.js", "src/mockupizr.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("mockupizr.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['compile-es2015']);
});