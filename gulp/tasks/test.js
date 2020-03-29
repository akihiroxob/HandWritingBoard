import gulp  from 'gulp';
import mocha from 'gulp-mocha';
import options from 'gulp-options';
import gutil from 'gulp-util';

gulp.task('test', function() {
    const target = options.get('file') || [
        './common/**/[^_]*.test.js',
        './server/**/[^_]*.test.js',
        './client/**/[^_]*.test.js'
    ];

    return gulp.src(target, { read: false })
        .pipe(mocha({
            reporter: 'list',
            require: ['@babel/register'],
            exit: true
        }));
});
