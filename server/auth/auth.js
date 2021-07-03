export default function auth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401);
    res.json({
      status: 'ERROR',
      message: 'Unauthorized',
    });
  }
}
