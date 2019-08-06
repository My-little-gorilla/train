"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();
var del = require("del");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var svgstore = require("gulp-svgstore");
var cheerio = require("gulp-cheerio");
var webp = require("gulp-webp");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function(){
  return gulp.src([
    "source/css/normalize.css",
    "source/fonts/**/*.{woff, woff2}",
    "source/js/**",
    "source/*.ico",
    "source/img/*.svg"
  ],{
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("sprite", function () {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function ($) {
        $('svg').addClass('visually-hidden');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpeg,jpg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 0}),
    imagemin.jpegtran({progressive: true}),
]))
.pipe(gulp.dest("build/img"))
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("build", gulp.series("clean","sprite","html","css","images","webp","copy"));
gulp.task("start", gulp.series("build","server"));
