/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         name:
 *           type: string
 *           example: "Frontend"
 *         type:
 *           type: string
 *           enum: [other, any, frontend, backend, database, tool]
 *           example: "frontend"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     description: Retrieves a list of all skill categories. (Public)
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     description: Creates a grouping for skills. **Admin only**.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Backend Frameworks"
 *               type:
 *                 type: string
 *                 enum: [other, any, frontend, backend, database, tool]
 *                 description: "Categorization type. Defaults to 'other'."
 *                 example: "backend"
 *     responses:
 *       201:
 *         description: Category created
 *
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *
 *   patch:
 *     tags: [Categories]
 *     summary: Update a category
 *     description: Updates a category. **Admin only**.
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               type:
 *                 type: string
 *                 example: "other"
 *     responses:
 *       200:
 *         description: Category updated
 *
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category
 *     description: Removes a category. **Admin only**.
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
 *         description: Category deleted
 */

export {};
