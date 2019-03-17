var gulp        = require('gulp'),
    sass        = require("gulp-sass"),
    pug         = require('gulp-pug'),
    browserSync = require('browser-sync'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
    //uglify = require('gulp-uglifyjs'); // стиснення JS

gulp.task('scssToCss',function () {
    return gulp.src("app/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 7']}, { cascade: true }))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({stream: true})) //оновлення сторінки при зміні scss
});
gulp.task('pugToHTML',function(){
    return gulp.src('app/template/index.pug')
        .pipe(pug({
            pretty: true //pretty:false щоб код був зжатий в одну строку
        }))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Виконуєм browser Sync
        server: { // Параметри сервера
            baseDir: 'app' // Директорія для сервера - app
            //open:{browser:"chrome"}
        },
        notify: false // Отключаем уведомления
    });
});
gulp.task('watch', ['browser-sync', 'scssToCss', 'pugToHTML'],function(){
    gulp.watch('app/scss/*.+(scss|sass)',['scssToCss']);
    gulp.watch('app/template/*.pug',['pugToHTML']);
    gulp.watch('app/**/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    // gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});
//збірка проекту
//clear dist
gulp.task('clean', function() {
    return del.sync('dist'); // попереднє видалення dist
});
//optimize img
gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({ // стиснути зображення
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img')); // Завантажуєм прямо в продакш
});
gulp.task('build', ['scssToCss', 'pugToHTML', 'clean', 'img'], function() {

    var buildCss = gulp.src( // Переносим CSS стилі в продакшн
        'app/css/*.css')
        .pipe(gulp.dest('dist/css'))

    // var buildFonts = gulp.src('app/fonts/**/*') // шрифти
    //     .pipe(gulp.dest('dist/fonts'));

    var libs = gulp.src('app/libs/**/*') // бібліотеки
        .pipe(gulp.dest('dist/libs'));

    var buildJs = gulp.src('app/js/**/*') // скрипти
        .pipe(gulp.dest('dist/js'));
    //
    // var doc = gulp.src('app/doc/*') // скрипти
    //     .pipe(gulp.dest('dist/doc'))

    var buildHtml = gulp.src('app/**/*.html') // HTML
        .pipe(gulp.dest('dist'));
});