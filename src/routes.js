const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const servicePost = require('./services/servicePost')

const Post = require('./models/Post')

routes.get('/', async (req, res) => {
   return res.json({Hello: 'World'})  
})


routes.get('/posts', async (req, res) => {
  //  servicePost.receivePost()

    const posts = await Post.find()
    console.log(posts)
    for (let i = 0; i < posts.length; i++) {

        await servicePost.emitPost(posts[i])
    }
    return res.json(posts)
})

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {

    //servicePost.receivePost()

    const { originalname: name, size, key, location: url = '' } = req.file;

    const post = await Post.create({
        name,
        size,
        key,
        url,
    })
    await servicePost.emitPost(post)
    return res.json(post)
})

routes.delete('/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id)

    return res.send()
})


module.exports = routes