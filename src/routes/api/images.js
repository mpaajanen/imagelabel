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

router.get('/', (req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(404).json({ noimagesfound: 'No Images found' }));
});

router.get('/:id', (req, res) => {
  Image.findById(req.params.id)
    .then(image => res.json(image))
    .catch(err => res.status(404).json({ noimagefound: 'No Image found' }));
});

router.post('/', (req, res) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token'})
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'token not provided'})
    }
    return res.status(400).end()
  }
  req.body.images.forEach(image => {
    Image.create(image)
    .catch(err => res.status(400).json({ error: 'Unable to add this image' }));
  });
  return res.status(200).end()
});

router.put('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token'})
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'token not provided'})
    }
    return res.status(400).end()
  }

  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedImage)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:id', (req, res) => {
  Image.findByIdAndRemove(req.params.id, req.body)
    .then(image => res.json({ mgs: 'Image entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a image' }));
});

module.exports = router;