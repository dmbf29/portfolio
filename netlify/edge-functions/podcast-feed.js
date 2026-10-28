// Serves the podcast feed at the address Spotify and other podcast apps watch. The feed file lives on Cloudinary, which
// sends Cache-Control: max-age=30 days and Content-Disposition: attachment. A netlify.toml redirect can't change those
// (its headers only go to the origin), so this function fetches the file and sends its own headers instead.
// To move the feed to another host, change FEED_SOURCE.
const FEED_SOURCE = "https://res.cloudinary.com/dmbf29/raw/upload/rising_in_the_sun_belt/feed.xml";

export default async () => {
  const upstream = await fetch(FEED_SOURCE, { headers: { "Cache-Control": "no-cache" } });
  if (!upstream.ok) return new Response("Feed unavailable", { status: 502 });

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=300, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const config = { path: "/podcast/rising-in-the-sun-belt.xml" };
