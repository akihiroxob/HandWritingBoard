import gulp    from 'gulp';
import { watch as config } from '../config';

gulp.task('watch', () => {
    gulp.watch(config.client, gulp.task('webpack'));
    gulp.watch(config.stylus, gulp.task('stylus'));
});
