import { timeStamp } from "console";
import fs from "fs";

export function fileLog(request, response) {
    const data = 
    `Method: ${request.method}   URL: ${request.url}   Status Code: ${response.statusCode}    Time: ${new Date()}\n` ;
    fs.writeFile("./log/journal.txt", data, {flag: "a"}, (error) => {
        if (error) console.log(error);
    });
};