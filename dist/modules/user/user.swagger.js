"use strict";
/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Server health check
 *     description: Returns a simple status indicating the API is up and running.
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 🚀 Portfolio API is running.
 *
 * /api/users/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: |
 *       Creates a new user account. The password is **bcrypt-hashed** before storage and is never returned in any response.
 *
 *       **Password rules:**
 *       - Minimum 8 characters
 *       - At least one uppercase letter
 *       - At least one number
 *       - At least one special character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: "**Required.** Display name for the user."
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "**Required.** Must be a valid, unique email address."
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: "**Required.** Must be ≥8 chars with uppercase, number, and special character."
 *                 example: MyPass@123
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: "**Optional.** Defaults to `user` if omitted."
 *                 example: user
 *           examples:
 *             minimal:
 *               summary: Minimal (only required fields)
 *               value:
 *                 name: John Doe
 *                 email: john@example.com
 *                 password: MyPass@123
 *             with_role:
 *               summary: With optional role
 *               value:
 *                 name: Admin User
 *                 email: admin@example.com
 *                 password: AdminPass@99
 *                 role: admin
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthTokenData'
 *             example:
 *               success: true
 *               message: Account created successfully.
 *               data:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                   name: John Doe
 *                   email: john@example.com
 *                   role: user
 *                   createdAt: "2024-03-06T18:00:00.000Z"
 *                   updatedAt: "2024-03-06T18:00:00.000Z"
 *       400:
 *         description: Validation error or email already taken
 *         content:
 *           application/json:
 *             examples:
 *               validation_error:
 *                 summary: Validation failed
 *                 value:
 *                   success: false
 *                   message: Validation failed.
 *                   errors:
 *                     - field: password
 *                       message: Password must contain at least one uppercase letter
 *               email_taken:
 *                 summary: Email already registered
 *                 value:
 *                   success: false
 *                   message: Email already registered.
 *
 * /api/users/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     description: Authenticates user credentials and returns a **JWT token** valid for subsequent protected requests.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "**Required.** Registered email address."
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: "**Required.** Account password."
 *                 example: MyPass@123
 *           example:
 *             email: john@example.com
 *             password: MyPass@123
 *     responses:
 *       200:
 *         description: Login successful – returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthTokenData'
 *             example:
 *               success: true
 *               message: Login successful.
 *               data:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                   name: John Doe
 *                   email: john@example.com
 *                   role: user
 *                   createdAt: "2024-03-06T18:00:00.000Z"
 *                   updatedAt: "2024-03-06T18:00:00.000Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid email or password.
 *
 * /api/users/me:
 *   get:
 *     tags: [Profile]
 *     summary: Get my profile
 *     description: Returns the profile of the currently authenticated user. Password is never included.
 *     security:
 *       - bearerAuth: []
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
 *                       $ref: '#/components/schemas/User'
 *             example:
 *               success: true
 *               message: Profile fetched successfully.
 *               data:
 *                 _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                 name: John Doe
 *                 email: john@example.com
 *                 role: user
 *                 createdAt: "2024-03-06T18:00:00.000Z"
 *                 updatedAt: "2024-03-06T18:00:00.000Z"
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No token provided. Authorization denied.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found.
 *
 *   patch:
 *     tags: [Profile]
 *     summary: Update my profile
 *     description: |
 *       Updates the current user's profile. All fields are **optional** — send only those you want to change.
 *       At least one field must be provided.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: "**Optional.** New display name."
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "**Optional.** New email address (must be unique)."
 *                 example: jane@example.com
 *           examples:
 *             update_name_only:
 *               summary: Change name only
 *               value:
 *                 name: Jane Doe
 *             update_email_only:
 *               summary: Change email only
 *               value:
 *                 email: newemail@example.com
 *             update_both:
 *               summary: Change name and email
 *               value:
 *                 name: Jane Doe
 *                 email: jane@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Profile updated successfully.
 *               data:
 *                 _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                 name: Jane Doe
 *                 email: jane@example.com
 *                 role: user
 *                 createdAt: "2024-03-06T18:00:00.000Z"
 *                 updatedAt: "2024-03-06T20:00:00.000Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No token provided. Authorization denied.
 *
 * /api/users/me/change-password:
 *   patch:
 *     tags: [Profile]
 *     summary: Change my password
 *     description: Changes the password for the current authenticated user. Requires the existing password for verification.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: "**Required.** Your current password for verification."
 *                 example: MyPass@123
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *                 description: "**Required.** New password – must be ≥8 chars, uppercase, number, special character."
 *                 example: NewPass@456
 *               confirmPassword:
 *                 type: string
 *                 description: "**Required.** Must match `newPassword` exactly."
 *                 example: NewPass@456
 *           example:
 *             currentPassword: MyPass@123
 *             newPassword: NewPass@456
 *             confirmPassword: NewPass@456
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password changed successfully.
 *               data: null
 *       400:
 *         description: Validation error or incorrect current password
 *         content:
 *           application/json:
 *             examples:
 *               wrong_password:
 *                 summary: Incorrect current password
 *                 value:
 *                   success: false
 *                   message: Current password is incorrect.
 *               passwords_mismatch:
 *                 summary: New passwords do not match
 *                 value:
 *                   success: false
 *                   message: Validation failed.
 *                   errors:
 *                     - field: confirmPassword
 *                       message: Passwords do not match
 *               weak_password:
 *                 summary: New password too weak
 *                 value:
 *                   success: false
 *                   message: Validation failed.
 *                   errors:
 *                     - field: newPassword
 *                       message: Password must contain at least one special character
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No token provided. Authorization denied.
 *
 * /api/users:
 *   get:
 *     tags: [Admin – Users]
 *     summary: Get all users
 *     description: Returns a list of all registered users. **Requires admin role.**
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Users fetched successfully.
 *               data:
 *                 - _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                   name: John Doe
 *                   email: john@example.com
 *                   role: user
 *                   createdAt: "2024-03-06T18:00:00.000Z"
 *                   updatedAt: "2024-03-06T18:00:00.000Z"
 *                 - _id: 65f1a2b3c4d5e6f7a8b9c0d2
 *                   name: Admin User
 *                   email: admin@example.com
 *                   role: admin
 *                   createdAt: "2024-03-05T10:00:00.000Z"
 *                   updatedAt: "2024-03-05T10:00:00.000Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No token provided. Authorization denied.
 *       403:
 *         description: Forbidden – not an admin
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden. Insufficient permissions.
 *
 * /api/users/{id}:
 *   get:
 *     tags: [Admin – Users]
 *     summary: Get user by ID
 *     description: Returns a single user by their MongoDB `_id`. **Requires admin role.**
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the target user
 *         example: 65f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User fetched successfully.
 *               data:
 *                 _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                 name: John Doe
 *                 email: john@example.com
 *                 role: user
 *                 createdAt: "2024-03-06T18:00:00.000Z"
 *                 updatedAt: "2024-03-06T18:00:00.000Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No token provided. Authorization denied.
 *       403:
 *         description: Forbidden – not an admin
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden. Insufficient permissions.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found.
 *
 *   patch:
 *     tags: [Admin – Users]
 *     summary: Update user by ID
 *     description: |
 *       Updates any user's name or email. **Requires admin role.**
 *       All fields are **optional** — send only those you want to change.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the target user
 *         example: 65f1a2b3c4d5e6f7a8b9c0d1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: "**Optional.** New display name."
 *                 example: Updated Name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "**Optional.** New email address (must be unique)."
 *                 example: updated@example.com
 *           examples:
 *             update_name:
 *               summary: Update name only
 *               value:
 *                 name: Updated Name
 *             update_email:
 *               summary: Update email only
 *               value:
 *                 email: updated@example.com
 *             update_both:
 *               summary: Update name and email
 *               value:
 *                 name: Updated Name
 *                 email: updated@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User updated successfully.
 *               data:
 *                 _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                 name: Updated Name
 *                 email: updated@example.com
 *                 role: user
 *                 createdAt: "2024-03-06T18:00:00.000Z"
 *                 updatedAt: "2024-03-06T20:30:00.000Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No token provided. Authorization denied.
 *       403:
 *         description: Forbidden – not an admin
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden. Insufficient permissions.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found.
 *
 *   delete:
 *     tags: [Admin – Users]
 *     summary: Delete user by ID
 *     description: Permanently deletes a user account. **Requires admin role.** This action is irreversible.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user to delete
 *         example: 65f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User deleted successfully.
 *               data: null
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No token provided. Authorization denied.
 *       403:
 *         description: Forbidden – not an admin
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Forbidden. Insufficient permissions.
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found.
 */
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=user.swagger.js.map