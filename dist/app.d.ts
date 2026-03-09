import { Application } from "express";
import "./modules/user/user.swagger";
import "./modules/profile/profile.swagger";
import "./modules/category/category.swagger";
import "./modules/skill/skill.swagger";
import "./modules/experience/experience.swagger";
import "./modules/education/education.swagger";
import "./modules/project/project.swagger";
declare const createApp: () => Application;
export default createApp;
//# sourceMappingURL=app.d.ts.map