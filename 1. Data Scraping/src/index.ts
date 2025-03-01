import { getData } from "./config/request.js";
import dotenv from "dotenv";
import { Base64ToJSON, JSONToBase64 } from "./services/crypto.js";
import { getLocation } from "./services/station-location.js";
import { generateDailyStamps } from "./services/timestamps.js";
import { saveData } from "./services/savefile.js";
import { END_TIME, START_TIME, STATION } from "./config/constants.js";
import chalk from "chalk";

dotenv.config();

const timestamps = generateDailyStamps(START_TIME, END_TIME);

const length = timestamps.length;

async function main() {
  console.log(chalk.green("DataScraping Started ..."));

  for (let i = 0; i < length; i++) {
    let timestamp = timestamps[i];
    if (!timestamp) {
      break;
    }

    let location = getLocation(STATION, timestamp);
    const response = await getData(JSONToBase64(location), timestamp);

    if (!response || !response.timeStamp || !response.data) {
      console.log(`Empty Response at ${location}.`);
      console.log(`Breaking at ${timestamp}.`);
      process.exit(1);
    }

    const key = response.timeStamp;
    const data = Base64ToJSON(response.data);
    const value = { aqi: data.aqi, metrics: data.metrics };
    saveData(key, value);
    console.log(chalk.green(`Saved data for ${key}`));
  }

  console.log(chalk.green("Data Scraping completed ..."));
}

main();
