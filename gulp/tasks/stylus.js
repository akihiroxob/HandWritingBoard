import gulp    from 'gulp';
import plumber from 'gulp-plumber';
import stylus  from 'gulp-stylus';
import nib     from 'nib';
import { stylus as config } from '../config';

gulp.task('stylus', () => {
    return gulp.src(config.src)
        .pipe(plumber())
        .pipe(stylus({use: nib()}))
        .pipe(gulp.dest(config.dest))
});
