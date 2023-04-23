const mongoose = require('mongoose')
const mongodbURL = process.env.MONGODBURL;



module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    if (!mongodbURL) return;

    await mongoose.connect(mongodbURL || '', {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    if (mongoose.connect) {
      console.log("Mongoose Running")
    }

    async function pickPresence() {
      const option = Math.floor(Math.random() * statusArray.length);

      try {
        await client.user.setPresence({
          activities: [
            {
              name: statusArray[option].content,
              type: statusArray[option].type,

            },

          ],

          status: statusArray[option].status
        })
      } catch (error) {
        console.error(error);
      }
    }
  },
};