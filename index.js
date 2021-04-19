const axios = require('axios');
fs = require('fs');

const makeRequest = async () => {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const reqResponse = await axios.get(URL);
  const response = reqResponse.data;
  return response;
}



const toJson = (rawJson) => {
  const writeDir = `./result`;
  const fileName = 'posts.json';
  const writePath = `${writeDir}/${fileName}`;

  const makeFile = async () => {
    const isExists = fs.existsSync(writeDir);
    if (!isExists){
      fs.mkdir(writeDir, { recursive: true }, (err) => {
        if(err) throw err;
      });
    }
  }
  
  const writeToFile = (data, dir) => {
    var writeStream = fs.createWriteStream(dir);
    writeStream.write(JSON.stringify(data));
    writeStream.end();
    console.log("write to file successful");
  }
  
  makeFile()
  writeToFile(rawJson, writePath);

}


makeRequest().then( res => toJson(res))

