const yargs = require('yargs').argv
const gulp = require('gulp')
const watch = require('gulp-watch')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const less = require('gulp-less')
const gulpif = require('gulp-if')
const autoprefixer = require('gulp-autoprefixer')
const styleLint = require('gulp-stylelint')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const postcss = require('gulp-postcss')
const glob = require('glob')

const path = require('path')
const fs = require('fs')

const src_path = path.resolve('./src/static')
const apps_path = path.resolve(`${src_path}/pages`)
const glob_path = `${src_path}/glob`
const app_name = yargs.app

if(app_name && !fs.existsSync(`${apps_path}/${app_name}`))
    throw new Error('Not active app!')

const input = `${apps_path}/${app_name || '**'}`
const output = `../build${app_name ? `/${app_name}` : ''}`

const IsDevelopment = (process.env.NODE_ENV = yargs.mode || 'development') === 'development'

gulp.task('livereload', () => {
    browserSync.create()

    browserSync.init({
        server: {
            baseDir: `${output}`
        },
        files: [
            `${output}/**/*.*`
        ]
    })
})

gulp.task('glob', () => {
    const apps = glob.sync('*', { cwd: apps_path, ignore: ['404', '500'] })

    !app_name ?
        apps.forEach((app) => {
            gulp.src(`${glob_path}/**/*.*`)
                .pipe(gulp.dest(`${output}/${app}/glob`))
        }) :
        gulp.src(`${glob_path}/**/*.*`).pipe(gulp.dest(`${output}/glob`))

    return Promise.resolve()
})

gulp.task('html', () => {
    return gulp.src(`${input}/index.html`)
        .pipe(gulp.dest(output))
})

gulp.task('styles', () => {
    const plugins = [
        require('postcss-import')()
    ]

    return gulp.src(`${input}/styles/**/[^_]*.less`)
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(postcss(plugins))
        .pipe(gulp.dest(!app_name ? output : `${output}/styles`))
})

gulp.task('stylesLint', () => {
    return gulp.src(`${input}/styles/**/*.less`)
        .pipe(styleLint({
            configFile: '.stylelintrc',
            failAfterError: false,
            debug: true,
            syntax: 'less',
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
})

gulp.task('js', () => {
    return gulp.src(`${input}/js/**/*.js`)
        .pipe(plumber())
        .pipe(babel({
            filename: 'babel.config.js'
        }))
        .pipe(gulpif(!IsDevelopment, uglify()))
        .pipe(gulp.dest(!app_name ? output : `${output}/js`));
})

gulp.task('watch', () => {
    watch(`${input}/styles/**/*.less`, gulp.series('stylesLint', 'styles'));
    watch(`${input}/*.html`, gulp.series('html'));
    watch(`${input}/js/**/*.js`, gulp.series('js'));
    watch(`${glob_path}/**/*.*`, gulp.series('glob'));
});

const tasks = ['html', 'stylesLint', 'styles', 'js', 'glob']
IsDevelopment && tasks.push(gulp.series('watch'))
app_name && IsDevelopment && tasks.push(gulp.series('livereload'))

exports.default = gulp.series(...tasks)
