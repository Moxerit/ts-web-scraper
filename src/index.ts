import axios from "axios";
import cheerio from "cheerio";
import { createObjectCsvWriter } from "csv-writer";

const url = "https://komonews.com/"
const AxiosInstance = axios.create();
const csvWriter = createObjectCsvWriter({
  path:  "./output.csv",
  header: [
    {id: "title", title: "Title"},
    // {id: "RiderNo", title: "Rider Number"},
    // {id: "team", title: "Team"},
    // {id: "hours", title: "H"},
    // {id: "minutes", title: "M"},
    // {id: "seconds", title: "S"},
  ]
})

interface articleData {
  title: string;
  // riderNo: number;
  // team: string;
  // hours: number;
  // minutes: number;
  // seconds: number;
}

AxiosInstance.get(url)
.then( response => {
  const html = response.data;
  const $ = cheerio.load(html);
  const newHeadlines = $(".teaserItem > div > .index-module_headlineLarge__3lBt")
  const articles: articleData[] = [];

  newHeadlines.each((i, elem) => {
  const title: string = $(elem).find("a").text().replace(/(\r\n|\n|\r)/gm, "").trim();
  //   const name: string = $(elem).find(".runner > a").text().replace(/(\r\n|\n|\r)/gm, "").trim();
  //   const riderNo: number = parseInt($(elem).find("td:nth-child(3)").text());
  //   const team: string = $(elem).find("td.break-line.team > a").text().replace(/(\r\n|\n|\r)/gm, "").trim();
  //   const timeArray: Array<number> = $(elem!)
  //       .find("td:nth-child(5)")!
  //       .text()!
  //       .match(/[0-9]+/g)!
  //       .map((val) => parseInt(val!));
       articles.push({
        title,
  //     riderNo,
  //     team,
  //     hours: timeArray[0],
  //     minutes: timeArray[1],
  //     seconds: timeArray[2]
       })
  });
  csvWriter.writeRecords(articles).then(() => console.log("Written to file"));
})
.catch(console.error);