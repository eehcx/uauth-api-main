// Definir el esquema
POST /api/projects/:projectId/schema
{
  "schema": {
    "name": Joi.string().required(),
    "age": Joi.number().integer().min(18),
    "preferences": Joi.object({
      "theme": Joi.string().valid('light', 'dark'),
      "notifications": Joi.boolean()
    })
  }
}

// Crear un usuario
POST /api/projects/:projectId/users
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "age": 30,
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}