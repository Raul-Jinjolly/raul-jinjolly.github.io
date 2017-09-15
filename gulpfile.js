var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var smartgrid = require('smart-grid');


var paths = {
  html: ['./*.html'],
  css: ['./styles/main.scss']
}

gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

gulp.task('sass', function(){
  return gulp.src(paths.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./styles'))
    .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('watch',function(){
  gulp.watch(paths.css, ['sass']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watch', 'browserSync']);


const smartgridSettings = {
  outputStyle: 'scss',
  columns: 12,
  offset: '15px',
  filename: '_smart-grid',
  container: {
    maxWidth: '1600px',
    fields: '15px'
  },
  breakPoints: {
    xlg: {
      'width': '1280px',
      'fields': '15px'
    },
    lg: {
      'width': '1024px',
      'fields': '15px'
    },
    md: {
      'width': '768px',
      'fields': '15px'
    },
    sm: {
      'width': '568px',
      'fields': '15px'
    },
    xs: {
      'width': '320px',
      'fields': '15px'
    }
  }
};

gulp.task('smartgrid', ()=> smartgrid('./styles/mixins', smartgridSettings));

gulp.task('spritePng', function() {
  var spriteData = gulp.src('./images/initial/*.png')
                  .pipe(spritesmith({
                    padding: 5,
                    imgName: 'sprite.png',
                    cssName: 'sprite-png.scss'
                  }));
  spriteData.img.pipe(gulp.dest('./styles/'));
  spriteData.css.pipe(gulp.dest('./styles/'));
});

gulp.task('spriteJpg', function() {
  var spriteData = gulp.src('./images/initial/*.jpg')
                  .pipe(spritesmith({
                    padding: 5,
                    imgName: 'sprite.jpg',
                    cssName: 'sprite-jpg.scss'
                  }));
  spriteData.img.pipe(gulp.dest('./styles/'));
  spriteData.css.pipe(gulp.dest('./styles/'));
})