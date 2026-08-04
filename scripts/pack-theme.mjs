import { packTheme } from "./theme-tools.mjs";

const outputPath = await packTheme();
console.log(`Theme package ready: ${outputPath}`);
