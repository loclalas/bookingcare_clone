import serviceUser from "../services/serviceUser";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Loi",
    });
  }

  const userData = await serviceUser.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    userData: userData.user ? userData.user : {},
  });
};

const handleGetAllUsers = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Khong ton tai tai khoan nay",
      user: [],
    });
  }

  const user = await serviceUser.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    user,
  });
};

const handleCreateNewUser = async (req, res) => {
  const data = req.body;
  const message = await serviceUser.createNewUser(data);

  return res.status(200).json({
    message,
  });
};

const handleDeleteUsers = async (req, res) => {
  const id = req.body.id;
  const message = await serviceUser.deleteUser(id);

  return res.status(200).json({
    message,
  });
};

const handleEditUsers = async (req, res) => {
  const data = req.body;
  const message = await serviceUser.updateUser(data);

  return res.status(200).json({
    message,
  });
};

const getAllCode = async (req, res) => {
  try {
    const response = await serviceUser.getAllCodeService(req.query.type);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Loi",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUsers: handleDeleteUsers,
  handleEditUsers: handleEditUsers,
  getAllCode: getAllCode,
};
