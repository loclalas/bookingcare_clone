import db from "../models/index";
import serviceCRUD from "../services/serviceCRUD";

let getHomePage = async (req, res) => {
  const data = await db.User.findAll();

  return res.render("homepage.ejs", {
    data: JSON.stringify(data),
  });
};

let getAboutPage = (req, res) => {
  return res.render("test/aboutpage.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await serviceCRUD.createNewUser(req.body);
  return res.send("Day la Post CRUD");
};

let getDisplayCRUD = async (req, res) => {
  let data = await serviceCRUD.getAllUser();

  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  const userID = req.query.id;

  if (userID) {
    let userData = await serviceCRUD.getInfoById(userID);

    return res.render("editCRUD.ejs", {
      dataTable: userData,
    });
  }

  return res.send("User not found");
};

let putCRUD = async (req, res) => {
  const data = req.body;
  const allUsers = await serviceCRUD.updateUserInfo(data);
  return res.render("displayCRUD.ejs", { dataTable: allUsers });
};

let deleteCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const allUsers = await serviceCRUD.deleteUserById(userId);
    return res.render("displayCRUD.ejs", {
      dataTable: allUsers,
    });
  }

  return res.send("Khong tim thay User");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getDisplayCRUD: getDisplayCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
