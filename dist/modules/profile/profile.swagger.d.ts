/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         jobTitle:
 *           type: string
 *           example: "Full Stack Engineer"
 *         brief:
 *           type: string
 *           example: "I build scalable cloud architectures and interactive web apps."
 *         socialLinks:
 *           type: object
 *           properties:
 *             linkedin:
 *               type: string
 *             github:
 *               type: string
 *             whatsapp:
 *               type: string
 *             facebook:
 *               type: string
 *             phone:
 *               type: string
 *             email:
 *               type: string
 *         logoUrl:
 *           type: string
 *           example: "https://res.cloudinary.com/demo/image/upload/v1234/profile_logo.png"
 *         cvUrl:
 *           type: string
 *           example: "https://drive.google.com/file/d/1B7xv.../view?usp=sharing"
 *
 * /api/profile:
 *   get:
 *     tags: [Profile Data]
 *     summary: Get public portfolio profile
 *     description: Returns the main singleton portfolio profile. Anyone can view this.
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Profile'
 *
 *   patch:
 *     tags: [Profile Data]
 *     summary: Update portfolio profile (Admin)
 *     description: |
 *       Updates the portfolio details and handles file uploads for logo.
 *       CV is now accepted as a direct URL link (cvUrl).
 *       Instead of `application/json`, this MUST use **`multipart/form-data`**.
 *       Requires **Admin** role privileges.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updating the name text
 *               jobTitle:
 *                 type: string
 *                 description: Updating the professional title
 *               brief:
 *                 type: string
 *               socialLinks:
 *                 type: string
 *                 description: "IMPORTANT: Must be sent as a stringified JSON object! e.g. `{\"github\": \"...\", \"linkedin\": \"...\"}`"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Upload a new standard image (jpg/png/webp) for the site logo
 *               cvUrl:
 *                 type: string
 *                 description: "Direct URL to CV/Resume (e.g. Google Drive link). No longer a file upload."
 *                 example: "https://drive.google.com/..."
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Validation or file-type error from Multer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not an admin)
 */
export {};
//# sourceMappingURL=profile.swagger.d.ts.map