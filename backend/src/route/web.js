import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.getDisplayCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-users", userController.handleEditUsers);
  router.delete("/api/delete-users", userController.handleDeleteUsers);

  router.get("/api/allcodes", userController.getAllCode);
  router.get("/api/get-top-doctor", doctorController.getTopDoctor);
  router.get("/api/get-all-doctor", doctorController.getAllDoctor);
  router.post("/api/create-info-doctor", doctorController.createInfoDoctor);
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctor);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getPatientForDoctor
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);

  router.get(
    "/api/patient-booking-appointment",
    patientController.postBookAppointment
  );
  router.get(
    "/api/verify-booking-appointment",
    patientController.postVerifyBookAppointment
  );
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty",
    specialtyController.getDetailSpecialty
  );

  router.post("/api/create-new-clinic", clinicController.createClinic);
  // router.get("/api/get-clinic", clinicController.getAllClinic);
  // router.get("/api/get-detail-clinic", clinicController.getDetailClinic);

  return app.use("/", router);
};

module.exports = initWebRoutes;
