"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f1b2c3d4e5f67a8b9c0d1e"
 *         degree:
 *           type: string
 *           example: "Bachelor of Science"
 *         fieldOfStudy:
 *           type: string
 *           example: "Computer Science"
 *         university:
 *           type: string
 *           example: "Massachusetts Institute of Technology"
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2016-09-01T00:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: "Leave empty if currently studying here"
 *           example: "2020-05-15T00:00:00.000Z"
 *         city:
 *           type: string
 *           example: "Cambridge"
 *         country:
 *           type: string
 *           example: "USA"
 *         achievements:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Graduated Summa Cum Laude", "Dean's List 2018-2020"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /api/education:
 *   get:
 *     tags: [Education]
 *     summary: Get all education records
 *     description: Retrieves academic history sorted from newest to oldest. (Public)
 *     responses:
 *       200:
 *         description: Education records fetched successfully
 *
 *   post:
 *     tags: [Education]
 *     summary: Create a new education record
 *     description: Adds a new record to the academic history. **Admin only**.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - degree
 *               - fieldOfStudy
 *               - university
 *               - startDate
 *               - city
 *               - country
 *             properties:
 *               degree:
 *                 type: string
 *                 example: "Master of Science"
 *               fieldOfStudy:
 *                 type: string
 *                 example: "Artificial Intelligence"
 *               university:
 *                 type: string
 *                 example: "Stanford University"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2021-09-01T00:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-06-15T00:00:00.000Z"
 *               city:
 *                 type: string
 *                 example: "Stanford"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Published paper on Neural Networks", "AI Research Assistant"]
 *     responses:
 *       201:
 *         description: Education record created
 *
 * /api/education/{id}:
 *   get:
 *     tags: [Education]
 *     summary: Get an education record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Education record found
 *
 *   patch:
 *     tags: [Education]
 *     summary: Update an education record
 *     description: Modifies an existing academic record. **Admin only**.
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
 *               degree:
 *                 type: string
 *                 example: "Ph.D."
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: "Send a new date, or omit to leave unchanged."
 *                 example: "2025-05-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Education record updated
 *
 *   delete:
 *     tags: [Education]
 *     summary: Delete an education record
 *     description: Removes an academic record. **Admin only**.
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
 *         description: Education record deleted
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=education.swagger.js.map