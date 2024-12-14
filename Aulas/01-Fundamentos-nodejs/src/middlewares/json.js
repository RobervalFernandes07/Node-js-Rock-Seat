export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  let body = null;

  try {
    body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    body = null;
  }
    res.setHeader('Content-type', 'application/json')
}

