/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f1b2c3d4e5f67a8b9c0d1e"
 *         name:
 *           type: string
 *           example: "E-Commerce Dashboard"
 *         description:
 *           type: string
 *           example: "A fullstack dashboard managing inventory and sales statistics."
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["React", "Node.js", "MongoDB", "TailwindCSS"]
 *         githubUrl:
 *           type: string
 *           example: "https://github.com/my-user/ecommerce-admin"
 *         demoUrl:
 *           type: string
 *           example: "https://ecommerce-admin.vercel.app"
 *         videoUrl:
 *           type: string
 *           example: "https://drive.google.com/file/d/12345/view"
 *         mainImageUrl:
 *           type: string
 *           description: Dynamically generated full URL to the main cover image.
 *           example: "http://localhost:5000/uploads/project/d23f4b23...cover.png"
 *         imagesUrls:
 *           type: array
 *           items:
 *             type: string
 *           description: Dynamically generated full URLs to secondary images/screenshots.
 *           example: ["http://localhost:5000/uploads/project/image1.png", "http://localhost:5000/uploads/project/image2.png"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: Get all projects
 *     description: Retrieves all projects sorted by creation date. (Public)
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 *
 *   post:
 *     tags: [Projects]
 *     summary: Create a new project
 *     description: Adds a new project. Uses `multipart/form-data` to support multiple file uploads. **Admin only**.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - mainImage
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Portfolio V2"
 *               description:
 *                 type: string
 *                 example: "A headless CMS driven portfolio site."
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Send multiple identical keys (skills=React, skills=Node) or a comma-separated string ('React, Node')."
 *                 example: ["React", "Node.js"]
 *               githubUrl:
 *                 type: string
 *               demoUrl:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               mainImage:
 *                 type: string
 *                 format: binary
 *                 description: "Required cover image file (png, jpg, webp)"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: "Up to 10 additional screenshots or diagrams"
 *     responses:
 *       201:
 *         description: Project created
 *
 * /api/projects/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Get a project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project found
 *
 *   patch:
 *     tags: [Projects]
 *     summary: Update a project
 *     description: Modifies an existing project. Allows replacing the `mainImage` or overwriting the entire `images` array. **Admin only**.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               githubUrl:
 *                 type: string
 *               demoUrl:
 *                 type: string
 *               videoUrl:
 *                 type: string
 *               mainImage:
 *                 type: string
 *                 format: binary
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Project updated
 *
 *   delete:
 *     tags: [Projects]
 *     summary: Delete a project
 *     description: Removes a project and physically deletes all associated files. **Admin only**.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 */

export {};
