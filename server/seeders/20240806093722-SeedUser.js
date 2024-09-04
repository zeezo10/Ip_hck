'use strict';

const { hashingPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    let data = require("../data/user.json")

    data.map(el => {
      el.password = hashingPassword(el.password)
      el.createdAt = el.updatedAt = new Date()
    })
   
    await queryInterface.bulkInsert("Users", data)
    
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete("Users", null ,{})
  }
};
