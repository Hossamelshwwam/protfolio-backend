import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description:
        'RESTful API for the Portfolio backend. Built with **Express**, **Mongoose**, and **TypeScript**.\n\n' +
        '### Authentication\n' +
        'Protected routes require a **Bearer JWT** token in the `Authorization` header.\n\n' +
        '```\nAuthorization: Bearer <token>\n```',
      contact: {
        name: 'Portfolio Backend',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the JWT token returned from the login endpoint.',
        },
      },
      schemas: {
        // ─── Reusable Response Schemas ──────────────────────────────────────────
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation completed successfully.' },
            data: { type: 'object', nullable: true },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Something went wrong.' },
            errors: { type: 'object', nullable: true },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Validation failed.' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string', example: 'email' },
                  message: { type: 'string', example: 'Invalid email address' },
                },
              },
            },
          },
        },
        // ─── User Schema ────────────────────────────────────────────────────────
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '65f1a2b3c4d5e6f7a8b9c0d1' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time', example: '2024-03-06T18:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-03-06T18:00:00.000Z' },
          },
        },
        // ─── Auth Token Response ────────────────────────────────────────────────
        AuthTokenData: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            user: { $ref: '#/components/schemas/User' },
          },
        },
      },
    },
    tags: [
      {
        name: 'Health',
        description: 'Server health check',
      },
      {
        name: 'Auth',
        description: 'Register a new account and log in',
      },
      {
        name: 'Profile',
        description: 'Manage your own profile (requires authentication)',
      },
      {
        name: 'Admin – Users',
        description: 'Admin-only user management (requires authentication + admin role)',
      },
    ],
  },
  // Glob to all swagger annotation files
  apis: [
    path.join(__dirname, '../modules/**/*.swagger.{ts,js}'),
    path.join(__dirname, '../app.{ts,js}'),
  ],
};

let swaggerSpec: any;
try {
  swaggerSpec = swaggerJsdoc(options);
} catch (error) {
  console.error('Failed to generate Swagger spec:', error);
  swaggerSpec = { openapi: '3.0.0', info: { title: 'Portfolio API (Error Loading Docs)', version: '1.0.0' }, paths: {} };
}

export default swaggerSpec;
