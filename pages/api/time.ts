export default function handler(req, res) {
  const now = new Date();
  res.json({
    isoTime: now.toISOString(),
    unixTime: now.getTime(),
    serverOffsetInMinutes: now.getTimezoneOffset(),
  });
}
