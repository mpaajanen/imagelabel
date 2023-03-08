const express = require('express');
const router = express.Router();

const Image = require('../../models/Image');

// @route GET api/images/test
// @description tests images route
// @access Public
router.get('/test', (req, res) => res.send('image route testing!'));

// @route GET api/images
// @description Get all images
// @access Public
router.get('/', (req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(404).json({ noimagesfound: 'No Images found' }));
});

// @route GET api/images/:id
// @description Get single image by id
// @access Public
router.get('/:id', (req, res) => {
  Image.findById(req.params.id)
    .then(image => res.json(image))
    .catch(err => res.status(404).json({ noimagefound: 'No Image found' }));
});

// @route GET api/images
// @description add/save image
// @access Public
router.post('/', (req, res) => {
  Image.create(req.body)
    .then(image => res.json({ msg: 'Image added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this image' }));
});

// @route GET api/images/:id
// @description Update image
// @access Public
router.put('/:id', (req, res) => {
  Image.findByIdAndUpdate(req.params.id, req.body)
    .then(image => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/images/:id
// @description Delete image by id
// @access Public
router.delete('/:id', (req, res) => {
  Image.findByIdAndRemove(req.params.id, req.body)
    .then(image => res.json({ mgs: 'Image entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a image' }));
});

module.exports = router;