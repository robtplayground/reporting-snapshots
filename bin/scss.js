"use strict";

const sass = require('node-sass')
const CleanCSS = require('clean-css');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const files = glob.sync(path.join(__dirname, '/../scss/*.scss'));
const outpath = path.join(__dirname, '/../css/');

files.forEach((f) => {

  const filename = f;
  sass.render({
    file: filename
  }, function(err, result) {
    if (err) {
      console.warn(err);
      process.exit(1);
    }
    const clean = new CleanCSS();
    const basename = path.basename(filename, '.scss');
    const css = clean.minify(result.css).styles;
    const outFile = path.join(outpath, `${basename}.css`);

    fs.writeFileSync(outFile, css.toString());
    console.log(`css written to ${outFile}`);
  });
});
