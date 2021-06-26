export default function auth(req, res, next) {
  if (!req.session.user) {
    res.status(401);
    res.json({
      status: 'ERROR',
      message: 'Unauthorized',
    });
  } else {
    next();
  }
}
