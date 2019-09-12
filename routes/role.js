exports.requireRole = function(role1, role2, role3, req, res) {

  return function(req, res, next) {
    if (req.user.userPermission === role1 || req.user.userPermission === role2 || req.user.userPermission === role3) {
      next();
    } else {
      console.log("ไม่ได้รับอนุญาตเข้าถึงส่วนนี้");

      res.redirect('/deny');
    }
  }

}
