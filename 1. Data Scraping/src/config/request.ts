import axios from "axios";
import chalk from "chalk";

export const getData = async (reqBody: string, timeStamp: string) => {

  let config = {
    method: "post",

    maxBodyLength: Infinity,
    url: "https://airquality.cpcb.gov.in/aqi_dashboard/aqi_all_Parameters",

    headers: {
      "User-Agent": process.env.AGENT,
      Accept: "text/plain, */*; q=0.01",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      accessToken: process.env.ACCESS_TOKEN,
      Origin: "https://airquality.cpcb.gov.in",
      Connection: "keep-alive",
      Referer: "https://airquality.cpcb.gov.in/AQI_India/",
      Cookie: process.env.COOKIE,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      TE: "trailers",
    },

    data: reqBody,
  };

  try {
    const response = await axios.request(config);
    return { timeStamp, data: response.data};
  } catch (error) {
    console.log(chalk.red("Error Occured in Resquet: ", error));
    console.log(chalk.yellow(`Breaking at ${timeStamp}.`));
    process.exit(1);
  }
};
