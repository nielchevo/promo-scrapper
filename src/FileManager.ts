import { writeFile, existsSync } from "fs";

var FILENAME = 'index_scraped.html';

export class FileManager {

  constructor() { }

  static async SaveToFile(buffer: string) {
    try {
      const result = writeFile(FILENAME, buffer, (err) => {
        if (err) throw new Error(err.message);

        console.info('File has been saved ')
      });

    } catch (e) {
      if (e instanceof Error)
        console.log('Error! ', e.message);
    }
  }

  static IfExist():Boolean {
    return (existsSync('./data/'+ FILENAME)) ? true : false; 
  }
};
