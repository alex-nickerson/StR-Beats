export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all requests for now
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Handle POST to upload audio
    if (request.method === 'POST' && url.pathname === '/') {
      try {
        const formData = await request.formData();
        const file = formData.get('file');
        const filename = formData.get('filename');

        if (!file || !filename) {
          return new Response('Missing file or filename', { status: 400 });
        }

        // Upload file to R2 bucket
        await env.AUDIO_BUCKET.put(filename, file.stream(), {
          httpMetadata: { contentType: file.type },
        });

        // Respond with URL to file
        const fileUrl = `https://${url.hostname}/audio/${encodeURIComponent(filename)}`;

        return new Response(JSON.stringify({ url: fileUrl }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',  // CORS header here too
          },
        });

      } catch (err) {
        return new Response(`Upload failed: ${err.message}`, {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // For other requests, e.g. GET audio files:
    if (request.method === 'GET' && url.pathname.startsWith('/audio/')) {
      const filename = decodeURIComponent(url.pathname.replace('/audio/', ''));

      try {
        const object = await env.AUDIO_BUCKET.get(filename);
        if (!object) return new Response('Not found', { status: 404 });

        return new Response(object.body, {
          headers: {
            'Content-Type': object.httpMetadata.contentType || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=31536000',
          },
        });
      } catch {
        return new Response('Error fetching file', { status: 500 });
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
