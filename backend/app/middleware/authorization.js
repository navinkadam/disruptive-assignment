module.exports = function (access) {
  return (req, res, next) => {
    const user = req.user;
    if (access.includes(user.role)) return next();
    return res.status(403).json({ msg: "you don't have access of this api." });
  };
};
