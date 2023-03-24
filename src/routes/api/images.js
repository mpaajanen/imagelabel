const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

const Image = require('../../models/Image');

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
}

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
  // console.log(req.body.images)
  req.body.images.forEach(image => {
    Image.create(image)
      // .then(img => res.json({ msg: 'Image added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this image' }));
  });
});

router.put('/:id', async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'invalid token'})
  }

  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedImage)
  } catch (error) {
    console.log(error)
  }
})

// @route GET api/images/:id
// @description Delete image by id
// @access Public
router.delete('/:id', (req, res) => {
  Image.findByIdAndRemove(req.params.id, req.body)
    .then(image => res.json({ mgs: 'Image entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a image' }));
});

module.exports = router;