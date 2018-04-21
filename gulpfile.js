var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');

gulp.task('scripts', function () {
    gulp.src([
        "./src/variables.js",
        './src/functions.js',

        './src/classes/InventoryMVC.js',
        './src/classes/JQueryGod.js',
        './src/classes/Item.js',
        './src/classes/PlayerMVC.js',
        './src/classes/MoonMoon.js',
        './src/classes/AudioPlayer.js',

        './src/actions.js',
        './src/interactions.js',
        './src/battle.js',
        './src/events.js',
        './src/init.js',
    ], {base: '.'})
        .pipe(concat('app.js'))
        .pipe(gulp.dest('.'))
});