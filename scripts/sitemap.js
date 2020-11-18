const fs = require('fs')

async function postData() {
  const posts = [];
  fs.readdirSync(process.cwd()+"/posts").forEach(file => {
    posts.push(file.replace(".md", ""));
  });
  return posts;
}

try {
  fs.readdirSync('cache')
} catch (e) {
  fs.mkdirSync('cache')
}

postData().then(posts => {
  fs.writeFile('cache/data.js', `export const posts = ${JSON.stringify(posts)}`, function (err) {
  if (err) return console.log(err);
  console.log('Posts cached.');
})})