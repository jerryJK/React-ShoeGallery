var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sass', function() {
  return gulp.src('scss/main.scss')
      /*    .pipe(sourcemaps.init())*/
          .pipe(sass({
            outputStyle:'expanded',
        /*    sourceComments: 'map'*/
          }))
          .pipe(gulp.dest('dist'))
 });
