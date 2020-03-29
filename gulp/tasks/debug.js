import gulp     from 'gulp';
import nodemon  from 'gulp-nodemon';

// nodemon
gulp.task('nodemon', (done) => {
    return nodemon({
        script: 'index.js',
        ext: 'js jsx',
        ignore: ['gulp', 'client', 'node_modules'],
        done: done
    });
});

// main task
gulp.task('debug', gulp.series('build', 'nodemon'));
