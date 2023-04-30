const { model, schema } = require('mongoose')

let sessionRoleSchema = new Schema({
    GuildID: String,
    RoleID: String
})

module.exports = model('sessionRoleSchema', sessionRoleSchema);