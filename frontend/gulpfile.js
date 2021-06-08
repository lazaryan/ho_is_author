const path = require('path')
const rimraf = require('rimraf')
const execa = require('execa')
const browserSync = require('browser-sync')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const watch = require('gulp-watch')
const templates = require('gulp-template')
const htmlMin = require('gulp-htmlmin')
const plumber = require('gulp-plumber')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const REACT_DIST = 'build'
const STATIC_DIST = 'build_static'
const DIST = `../${REACT_DIST}`

let mode = 'development'

gulp.task('mode:set-dev', cb => { mode = 'development', cb()})
gulp.task('mode:set-prod', cb => { mode = 'production', cb()})

gulp.task('clean:react-build', cb => rimraf(REACT_DIST, cb));
gulp.task('clean:static-build', cb => rimraf(STATIC_DIST, cb))
gulp.task('clean:dist', cb => rimraf(DIST, cb))

gulp.task('livereload:static', () => {
  browserSync.create()

  browserSync.init({
    server: {
      baseDir: STATIC_DIST
    },
    files: [
      `${STATIC_DIST}/**/*.*`
    ]
  })
})

gulp.task('build-react', async cb => {
  await execa('npm', ['run', 'build:react'], { stdio: 'inherit' });

  cb()
})

gulp.task('build:static-files', () =>
  gulp.src('./static/statics/**/*.*')
    .pipe(gulp.dest(`./${STATIC_DIST}/statics/`))
)

gulp.task('build:static:html', () =>
  gulp.src('./static/pages/**/index.html')
    .pipe(plumber())
    .pipe(templates({
      STATIC_BASE_URL: mode === 'development' ? '..' : '/static',
      GLOBS_LIBS_BASE_URL: mode === 'development' ? '../../statics/libs' : '/general/libs',
      GLOBS_STYLES_BASE_URL: mode === 'development' ? '../../statics/styles' : '/general/styles',
    }))
    .pipe(gulpIf(mode === 'production', htmlMin({
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
      removeEmptyAttributes: true
    })))
    .pipe(gulp.dest(`./${STATIC_DIST}/pages/`))
)

gulp.task('build:static:js', () =>
  gulp.src('./static/pages/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      filename: 'babel.config.js'
    }))
    .pipe(gulpIf(mode === 'production', uglify()))
    .pipe(gulp.dest(`./${STATIC_DIST}/pages/`))
)

gulp.task('mv:static', () => gulp.src(`./${STATIC_DIST}/**/*.*`).pipe(gulp.dest(`${DIST}/static`)))
gulp.task('mv:app', () => gulp.src(`./${REACT_DIST}/**/*.*`).pipe(gulp.dest(`${DIST}/app`)))

gulp.task('watch:static', () => {
  watch('./static/pages/**/index.html', gulp.series(['build:static:html']))
  watch('./static/pages/**/*.js', gulp.series(['build:static:js']))
  watch('./static/statics/**/*.*', gulp.series(['build:static-files']))
})

gulp.task('dev:static', gulp.series([
  'mode:set-dev',
  'clean:static-build',
  gulp.parallel([
    'build:static-files',
    'build:static:html',
    'build:static:js'
  ]),
  gulp.parallel([
    'livereload:static',
    'watch:static',
  ])
]))

gulp.task('build:react:app', gulp.series([
    'mode:set-prod',
    'clean:react-build',
    'build-react',
    'mv:app',
    'clean:react-build',
]))

gulp.task('build:static', gulp.series([
    'mode:set-prod',
    'clean:static-build',
    gulp.parallel([
        'build:static-files',
        'build:static:html',
        'build:static:js'
    ]),
    'mv:static',
    'clean:static-build',
]))

gulp.task('build', gulp.series([
  'mode:set-prod',
  gulp.parallel([
    'clean:react-build',
    'clean:static-build',
    'clean:dist'
  ]),
  gulp.series([
    'build-react',
    gulp.parallel([
      'build:static-files',
      'build:static:html',
      'build:static:js'
    ])
  ]),
  gulp.parallel([
    'mv:static',
    'mv:app'
  ]),
  gulp.parallel([
    'clean:react-build',
    'clean:static-build'
  ])
]))
