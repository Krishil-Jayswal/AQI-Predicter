import fs from "fs";
import path from "path";
import { FILE_PATH } from "../config/constants.js";

const ensureDirectoryExists = (filePath: string): void => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const saveData = (key: string, value: unknown): void => {
  ensureDirectoryExists(FILE_PATH);

  let jsonData: Record<string, unknown> = {};

  if (fs.existsSync(FILE_PATH)) {
    const fileContent = fs.readFileSync(FILE_PATH, "utf8");
    jsonData = fileContent ? JSON.parse(fileContent) : {};
  }

  jsonData[key] = value;

  fs.writeFileSync(FILE_PATH, JSON.stringify(jsonData, null, 2), "utf8");
};
