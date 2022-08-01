let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Map Model
let liquidMapSchema = require('../Models/liquidMap') //to interact with liquidmap instances

// CREATE Map
router.route('/create-map').post((req, res, next) => { //end point -/create-map
  liquidMapSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

// READ Maps
router.route('/').get((req, res) => {
  liquidMapSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// GET Map BY ID
router.route('/get-map/:id').get((req, res) => {
  liquidMapSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// GET Map Version BY ID
router.route('/get-map-version/:id/:vid').get((req, res) => {
  liquidMapSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({
        vMap: data.versionMap[req.params.vid],
        pObj: data._id,
        totVer: data.versionMap.length - 1,
        fname: data.nameofmap
      }) //getting map version from version map array at index req.params.vid
    }
  })
})

// Update Map Version BY ID
router.route('/update-map-version/:id/:vid').put((req, res, next) => { 
  liquidMapSchema.updateOne(
    { _id: req.params.id, "versionMap.id": req.params.vid },
    {
        $set: {
            "versionMap.$.metadata": req.body.metadata
        }
    },
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
        
      } else {
        console.log('Map updated successfully !')
        res.send(data)
      }
    },
  )
})

// Delete Map Version BY ID
router.route('/delete-map-version/:id/:vid').delete((req, res, next) => { 
  liquidMapSchema.updateOne(
    { _id: req.params.id},
    {
        $pull: {
            versionMap: {_id: req.params.vid },
        }
    },
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
        
      } else {
        console.log('Map updated successfully !')
        res.send(data)
      }
    },
  )
})

// Update map
router.route('/update-map/:id').put((req, res, next) => { //:var -> access as a variable
  liquidMapSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body.obj, //updating obj stored at req.params.id(except for version map->array)
    },
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
        
      } else {
        console.log('Map updated successfully !')
        res.send(data)
      }
    },
  )
  liquidMapSchema.findByIdAndUpdate(
    req.params.id,
    {$push: {"versionMap": req.body.vMap}}, //push new version map into version map array
    {upsert: true, new : true},
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
      } else {
        console.log('Map updated successfully !')
      }
    },
  )
})

// Delete map
router.route('/delete-map/:id').delete((req, res, next) => {
  liquidMapSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
