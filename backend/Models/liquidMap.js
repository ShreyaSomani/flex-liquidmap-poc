const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let liquidMapSchema = new Schema({
  nameofmap: {
    type: String
  },
  metadata: {
    type: String //file
  },
  description: {
    type: String
  },
  lastupdated: {
    type: String
  },
  version: {
    type: Number, default: 0
  },
  versionMap:  [{
    version: Number,
    contributor: String,
    metadata: String
  }]
}, {
    collection: 'liquidmaps' //table in db
  })

module.exports = mongoose.model('liquidmap', liquidMapSchema)