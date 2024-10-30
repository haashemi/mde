import { init } from "@fullstacksjs/eslint-config";
import reactCompiler from "eslint-plugin-react-compiler";

export default init({ plugins: { "react-compiler": reactCompiler } });
