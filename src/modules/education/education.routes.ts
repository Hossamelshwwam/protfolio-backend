import { Router } from "express";
import * as EducationController from "./education.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import {
  createEducationSchema,
  updateEducationSchema,
} from "./education.validation";
import { UserRole } from "../../types";

const router = Router();

// Public Routes
router.get("/", EducationController.getAllEducations);
router.get("/:id", EducationController.getEducationById);

// Admin Only Routes
router.use(authenticate, authorize(UserRole.ADMIN));

router.post(
  "/",
  validate(createEducationSchema),
  EducationController.createEducation,
);
router.patch(
  "/:id",
  validate(updateEducationSchema),
  EducationController.updateEducation,
);
router.delete("/:id", EducationController.deleteEducation);

export default router;
