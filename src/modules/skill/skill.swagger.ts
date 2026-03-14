/**
 * @swagger
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         name:
 *           type: string
 *           example: "React"
 *         logoUrl:
 *           type: string
 *           description: Cloudinary secure URL for the skill logo.
 *           example: "https://res.cloudinary.com/dbc9by5pu/image/upload/v1234/portfolio/skill/react.png"
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /api/skills:
 *   get:
 *     tags: [Skills]
 *     summary: Get all skills
 *     description: Retrieves all skills, auto-populating their categories. (Public)
 *     responses:
 *       200:
 *         description: Skills fetched successfully
 *
 *   post:
 *     tags: [Skills]
 *     summary: Create a new skill
 *     description: Creates a new skill. Uses `multipart/form-data` to support logo uploads. **Admin only**.
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
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "React"
 *               category:
 *                 type: string
 *                 description: "The MongoDB ObjectId of the target Category"
 *                 example: "60d0fe4f5311236168a109ca"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: "Optional logo image file (png, jpg, webp)"
 *     responses:
 *       201:
 *         description: Skill created
 *
 * /api/skills/{id}:
 *   get:
 *     tags: [Skills]
 *     summary: Get a skill by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill found
 *
 *   patch:
 *     tags: [Skills]
 *     summary: Update a skill
 *     description: Updates a skill's details or logo. Uses `multipart/form-data`. **Admin only**.
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
 *                 example: "React.js"
 *               category:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: "Optional new logo image file"
 *     responses:
 *       200:
 *         description: Skill updated
 *
 *   delete:
 *     tags: [Skills]
 *     summary: Delete a skill
 *     description: Removes a skill. **Admin only**.
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
 *         description: Skill deleted
 */

export {};
