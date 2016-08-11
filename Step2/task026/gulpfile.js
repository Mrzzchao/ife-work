var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css'); // css压缩
var autoprefixer = require('gulp-autoprefixer'); // css浏览器兼容前缀
var rename = require('gulp-rename'); // 文件重命名
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})

gulp.task('sass', function() {
    return gulp.src('src/sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['sass', 'browserSync', 'copyImg', 'copyHtml', 'copyJS'],
    function() {
        gulp.watch('src/sass/*', ['sass']);
        gulp.watch('src/sass/partitials/*', ['sass'])
        gulp.watch('src/*.html', ['copyHtml'])
        gulp.watch('src/js/*', ['copyJS'])
        gulp.watch('dist/*.html', browserSync.reload); // html改变刷新浏览器
        gulp.watch('dist/css/*.css', browserSync.reload) // css改变刷新浏览器

    });

gulp.task('copyImg', function() {
    gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images/'))
})

gulp.task('copyHtml', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('copyJS', function() {
    gulp.src('src/js/*')
        .pipe(gulp.dest('dist/js'))
})

gulp.task('default', ['watch'])
