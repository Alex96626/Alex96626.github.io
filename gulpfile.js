'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    pug = require('gulp-pug');


var path= {
    build: {
        html:'build/',
        js:'build/js/',
        css:'build/css/',
        img:'build/images/',
        fonts:'build/fonts/'
    },

    src: {
        pug:'src/*.pug',
        js:'src/js/*.js',
        style:'src/style/main.scss',
        libs:'src/style/*.css',
        img:'src/images/**/*.*',
        fonts:'src/fonts/**/*.*'
    },

    watch: {
        pug:'src/**/*.pug',
        js:'src/js/**/*.js',
        style:'src/style/**/*.scss',
        libs:'src/style/**/*.css',
        img:'src/images/**/*.*',
        fonts:'src/fonts/**/*.*'
    },
    clean:'./build'
};

var config= {
    server: {
        baseDir:"./build"
    },
//     tunnel:true,
    host:'localhost',
    port:3000,
    logPrefix:"Frontend_Devil"

};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('pug:build', function () {
    return gulp.src(path.src.pug) 
        .pipe(pug({
            pretty:true
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream:true}));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream:true}));
});

gulp.task('style:build', function () {
    return gulp.src(path.src.style) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap:true,
            errLogToConsole:true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream:true}));
});

gulp.task('libs:build', function () {
    return gulp.src(path.src.libs) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream:true}));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive:true,
            svgoPlugins: [{removeViewBox:false}],
            use: [pngquant()],
            interlaced:true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream:true}));
});

gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', 
    gulp.parallel([
        'pug:build',
        'js:build', 
        'style:build',
        'libs:build',
        'fonts:build',
        'image:build'
    ])
);

gulp.task('watch', function(){
    gulp.watch([path.watch.pug], gulp.series('pug:build'))
    gulp.watch([path.watch.style], gulp.series('style:build'))
  gulp.watch([path.watch.js], gulp.series('libs:build'))
    gulp.watch([path.watch.js], gulp.series('js:build'))
    gulp.watch([path.watch.img],  gulp.series('image:build'))
    gulp.watch([path.watch.fonts], gulp.series('fonts:build'))
});
gulp.task('default', gulp.parallel(['build', 'webserver', 'watch']));

