const { model, Schema } = require('mongoose');

let rolePermissions = new Schema({
  GuildID: String,
  RoleID: String
})


module.exports = model('rolePermissions', rolePermissions)