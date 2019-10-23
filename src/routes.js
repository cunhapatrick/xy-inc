// handle validation fields
const validate = require('express-validation')
// handle async errors
const handle = require('express-async-handler')

// auth middleware
const authMiddleware = require('./app/middlewares/auth')

// list of controllers and validations
const controllers = require('./app/controllers')
const validators = require('./app/validators')

// app = express
module.exports = app => {
  /**
   * User Create
   */

  app
    .route('/users')
    .post(validate(validators.User), handle(controllers.UserController.store))

  /**
   * Session
   */

  app.post(
    '/sessions',
    validate(validators.Session),
    handle(controllers.SessionController.store)
  )

  // Require autentication
  app.use(authMiddleware)

  /**
   * Product Model
   */
  app
    .route(`/products/:id`)
    .get(handle(controllers.ProductController.show))
    .put(validate(validators.Product), handle(controllers.ProductController.update))
    .delete(handle(controllers.ProductController.destroy))

  app
    .route(`/products`)
    .get(handle(controllers.ProductController.index))
    .post(validate(validators.Product), handle(controllers.ProductController.store))
}
