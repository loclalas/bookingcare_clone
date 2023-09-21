"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "loclalas@example.com",
        password: "123455",
        firstName: "Thanh Loc",
        lastName: "Phan",
        address: "VN",
        gender: 1,
        phonenumber: "12421412421",
        positionId: "doctor",
        image: "asdsa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
