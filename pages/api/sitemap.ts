import { SitemapStream, streamToPromise } from 'sitemap';
const posts = require('../../cache/data').posts

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`
    });

    posts.forEach(post => {
      smStream.write({
        url: `/posts/${post}`,
        changefreq: 'daily',
        priority: 0.9
      });
    });

    smStream.end();

    const sitemapOutput = (await streamToPromise(smStream)).toString();

    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    res.end(sitemapOutput);
  } catch (e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }
}