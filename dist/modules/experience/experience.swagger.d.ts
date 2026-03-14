/**
 * @swagger
 * components:
 *   schemas:
 *     Experience:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f1b2c3d4e5f67a8b9c0d1e"
 *         jobTitle:
 *           type: string
 *           example: "Senior Software Engineer"
 *         companyName:
 *           type: string
 *           example: "Google"
 *         companyLink:
 *           type: string
 *           example: "https://google.com"
 *         location:
 *           type: string
 *           example: "Mountain View, CA"
 *         type:
 *           type: string
 *           enum: [full-time, part-time, contract, freelance, internship, other]
 *           example: "full-time"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2020-05-01T00:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: "Leave empty if currently working here"
 *           example: "2023-01-15T00:00:00.000Z"
 *         description:
 *           type: string
 *           example: "Led a team of 4 engineers to build the new payments infrastructure."
 *         contributions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Reduced latency by 40%", "Migrated legacy microservices to Kubernetes"]
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Go", "Kubernetes", "gRPC", "PostgreSQL"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /api/experiences:
 *   get:
 *     tags: [Experiences]
 *     summary: Get all experiences
 *     description: Retrieves professional work history sorted from newest to oldest. (Public)
 *     responses:
 *       200:
 *         description: Experiences fetched successfully
 *
 *   post:
 *     tags: [Experiences]
 *     summary: Create a new experience
 *     description: Adds a new record to the professional work history. **Admin only**.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobTitle
 *               - companyName
 *               - location
 *               - startDate
 *             properties:
 *               jobTitle:
 *                 type: string
 *                 example: "Senior Backend Developer"
 *               companyName:
 *                 type: string
 *                 example: "Startup Inc"
 *               companyLink:
 *                 type: string
 *                 example: "https://startup.io"
 *               location:
 *                 type: string
 *                 example: "Remote"
 *               type:
 *                 type: string
 *                 enum: [full-time, part-time, contract, freelance, internship, other]
 *                 example: "full-time"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2021-08-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-12-01T00:00:00.000Z"
 *               description:
 *                 type: string
 *                 example: "Architected a scalable Node.js backend."
 *               contributions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Built a real-time chat feature", "Increased test coverage to 95%"]
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "Express", "MongoDB", "Redis"]
 *     responses:
 *       201:
 *         description: Experience created
 *
 * /api/experiences/{id}:
 *   get:
 *     tags: [Experiences]
 *     summary: Get an experience by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experience found
 *
 *   patch:
 *     tags: [Experiences]
 *     summary: Update an experience
 *     description: Modifies an existing experience record. **Admin only**.
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
 *               jobTitle:
 *                 type: string
 *                 example: "Lead Backend Developer"
 *               companyName:
 *                 type: string
 *                 example: "Startup Inc"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: "Send a new date, or omit to leave unchanged."
 *                 example: "2024-01-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Experience updated
 *
 *   delete:
 *     tags: [Experiences]
 *     summary: Delete an experience
 *     description: Removes an experience record. **Admin only**.
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
 *         description: Experience deleted
 */
export {};
//# sourceMappingURL=experience.swagger.d.ts.map