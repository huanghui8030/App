/**
 * @description gulp配置文件，整合css/js/images等自动化插件
 */
var gulp = require('gulp'),                     //本地安装gulp所用到的地方
    less = require('gulp-less'),                //less文件转为css
    autoprefixer = require('gulp-autoprefixer'),//css添加厂商前缀
    rename = require('gulp-rename'),            //重命名
    cssmin = require('gulp-clean-css'),         //压缩css
    watch = require('gulp-watch'),              //即时编译
    assetRev = require('gulp-chsi-rev'),	    //添加版本号
    concat = require('gulp-concat'),            //js合并
    uglify = require('gulp-uglify'),            //js压缩
    clean = require('gulp-clean'),              //删除文件，做操作前先删除文件
    //imgmin = require('gulp-imagemin'),          //图片压缩
    postcss = require('gulp-postcss'),            //css转化
    px2rem = require('postcss-px2rem'),          //将px转为rem
    copydir = require('copy-dir'),               //拷贝目录
    gulp_connect = require('gulp-connect'),      //本地化-简单的web server
    webpack = require('webpack-stream'),        //webpack和gulp相结合插件
    lodash = require('lodash') ;
var ArrAll = {
    lessDir : 'src/css/',  //less文件目录
    wapLessDir : 'src/css/wap/*.less',
    cssMin : 'assets/css' , //压缩后的min.css目录
    jsSrc : 'src/js/',     //js文件目录
    jsMin : 'assets/js',    //压缩后的min.js目录
    imgSrc : 'src/images/**/*.{png,jpg,gif,ico}',   //原图片路径
    imgMin: 'assets/images'  //图片生成路径 
};  


var LessToCss =[ArrAll.lessDir+'/*.less','!'+ArrAll.lessDir+'/_*.less'];
/**
 * 将less转化为css、加厂商前缀、css文件中链接加入版本号、重命名和压缩等
 **/
gulp.task('LesstoCss', function () {
    gulp.src(LessToCss) //该任务针对的文件和不对其进行处理的文件
        .pipe(less())                      //将less转化为css
        .pipe(autoprefixer({               //加厂商前缀
            browsers: ['Android 2.3','Android >= 4','iOS >= 6',
              'Explorer >= 6','Chrome >= 20','Firefox >= 24','Opera >= 12'],
            cascade: true,                  //是否美化属性值 默认：true 
            remove:true                     //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(assetRev())                   //给css中的链接添加版本号 a.img?v=date
        .pipe(gulp.dest(ArrAll.cssMin))     //生成css文件，less放到css源目录中，然后在同一压缩
        .pipe(rename({ suffix: '.min' }))   //重新命名，添加后缀名
        .pipe(cssmin())                     //压缩css
        .pipe(gulp.dest(ArrAll.cssMin)); //生成压缩文件
});
/**
 * 移动端样式，将less转化为css、加厂商前缀、css文件中链接加入版本号、px转为rem、重命名和压缩等
 **/
gulp.task('WapLesstoCss', function () {
    gulp.src(ArrAll.wapLessDir) //该任务针对的文件和不对其进行处理的文件
        .pipe(less())                      //将less转化为css
        .pipe(autoprefixer({               //加厂商前缀
            browsers: ['Android 2.3','Android >= 4','iOS >= 6',
              'Explorer >= 6','Chrome >= 20','Firefox >= 24','Opera >= 12'],
            cascade: true,                  //是否美化属性值 默认：true 
            remove:true                     //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(assetRev())                   //给css中的链接添加版本号
        .pipe(postcss([px2rem({remUnit: 20})])) //px转为rem
        .pipe(gulp.dest(ArrAll.cssMin+'/wap'))     //生成css文件，less放到css源目录中，然后在同一压缩
        .pipe(rename({ suffix: '.min' }))   //重新命名，添加后缀名
        .pipe(cssmin())                     //压缩css
        .pipe(gulp.dest(ArrAll.cssMin+'/wap')); //生成压缩文件
});
/**
 * js压缩
 **/
gulp.task('jsMin',function(){
  gulp.src(ArrAll.jsSrc+'*.js')
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify({mangle:false}))
      .pipe(gulp.dest(ArrAll.jsMin));
});
/**
 * js合并，只有这三个js，但有顺序要求
 **/
var jsConcat = [ArrAll.jsSrc + 'mainfest.js',ArrAll.jsSrc + 'function.js'];
gulp.task('jsConcat',function(){
  gulp.src(jsConcat)
      .pipe(concat('main.js'))
      .pipe(gulp.dest(ArrAll.jsMin))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify({mangle:false}))
      .pipe(gulp.dest(ArrAll.jsMin));
});

/**
 * 图片处理
 **/
gulp.task('imgMin',function(){
  gulp.src(ArrAll.imgSrc)
      .pipe(imgmin({
          optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
          progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
          interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
          multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
      }))
      .pipe(gulp.dest(ArrAll.imgMin))
});

//gulp+webpak结合
gulp.task('webpack', function() {
    return gulp.src('src/js/main.js')
        .pipe(webpack(lodash.merge(require('./webpack.config.js'), {
            watch: true
        })))
        .pipe(gulp.dest(ArrAll.jsMin));
});

/**clean清空文件夹，解决项目之外文件的删除问题
 **/
gulp.task('clean',function(){
   return gulp.src([ArrAll.cssMin,ArrAll.jsMin])
              .pipe(clean({force: true}));
});

/**即时编译文件文件*/
gulp.task('watch',function(){
   gulp.watch(LessToCss,['LesstoCss']);   //less解析为css，并进行优化处理
   gulp.watch(ArrAll.wapLessDir,['WapLesstoCss']);
});

/**建立本地化http server**/
gulp.task('server',function(){
  gulp_connect.server({
    port:8081,
    livereload:true,
    root:['.','.'],
    host : "0.0.0.0"
  });
});
/**默认任务，先执行所有任务，在即时监控所有任务
 **/
gulp.task('default',['clean'],function(){
  gulp.start([ 'LesstoCss','WapLesstoCss','server','watch']);
});

// 构建任务：生成prodcut环境下的js/css/images 拷贝到上级目录
var path = require('path'); 

gulp.task('build',function(){
    console.log("--------开始拷贝部署的静态文件-------");

    copydir("./assets/", "../assets",function(stat, filepath, filename){
        return true;

    },function(error){ console.log("assets包拷贝成功！")});

})

//压缩
gulp.task('min',function(){

})

