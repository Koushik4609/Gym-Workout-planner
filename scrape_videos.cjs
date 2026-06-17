const fs = require('fs');

async function scrapeYouTube(query) {
  try {
    const res = await fetch(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
    const html = await res.text();
    const match = html.match(/"videoId":"([^"]{11})"/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

async function main() {
  const exercisesRaw = fs.readFileSync('src/data/exercises.js', 'utf8');
  const ids = [];
  const regex = /id:\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(exercisesRaw)) !== null) {
    ids.push(match[1]);
  }
  
  console.log(`Found ${ids.length} exercises. Finding videos...`);
  const videoMap = {};
  for (const id of ids) {
    const query = id.replace(/-/g, ' ') + ' exercise form tutorial';
    const videoId = await scrapeYouTube(query);
    if (videoId) {
      videoMap[id] = videoId;
      console.log(`Mapped ${id} -> ${videoId}`);
    } else {
      console.log(`Failed to find video for ${id}`);
    }
    await new Promise(r => setTimeout(r, 100)); // small delay to prevent rate limit
  }
  
  fs.writeFileSync('video_map.json', JSON.stringify(videoMap, null, 2));
  console.log('Done mapping.');
}

main();
