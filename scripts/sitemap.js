// const {SitemapStream, streamToPromise} = require('sitemap')
const sm = require('sitemap')
const fs = require('fs');
const { Readable } = require( 'stream' )

async function postData() {
  const smStream = new sm.SitemapStream({
    hostname: `https://www.theinvasionofsmallcubes.com`
  });
  const posts = [];
  fs.readdirSync(process.cwd()+"/posts").forEach(file => {
    posts.push(file.replace(".md", ""));
  });
  
    console.log("pre await");
    return sm.streamToPromise(Readable.from(posts).pipe(smStream)).then((data) => {
      const content = data.toString()
      fs.writeFile('public/sitemap.xml', content, 
      function (err) {if (err) return console.log(err);});
    })
}

postData().then(ok => console.log(ok)).catch(error => console.log(error));

