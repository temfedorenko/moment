const gulp = require("gulp");
const browserSync = require("browser-sync");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    notify: false,
    port: 5000,
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/css/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/css/*.css").on("all", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
  gulp.watch("src/js/*.js").on("change", gulp.parallel("scripts"));
  gulp.watch("src/fonts/*").on("all", gulp.parallel("fonts"));
  gulp.watch("src/img/**/*").on("all", gulp.parallel("images"));
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/js/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream());
});

gulp.task("sounds", function () {
  return gulp
    .src("src/sounds/*")
    .pipe(gulp.dest("dist/sounds"))
    .pipe(browserSync.stream());
});

gulp.task("images", function () {
  return gulp
    .src("src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "scripts",
    "fonts",
    "html",
    "images",
    "sounds"
  )
);
