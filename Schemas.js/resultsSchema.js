const { model, Schema } = require('mongoose');

let resultsSchema = new Schema({
  GuildID: String,
  Day: String
})


module.exports = model('resultsSchema', resultsSchema)