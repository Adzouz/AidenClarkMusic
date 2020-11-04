const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const doge = require('ascii-doge');
const flat = require("flat");
const _ = require("lodash");

const spreadsheetId = "1CSMooOrXYYRO4blCMnCLDiak34DplvGy6TG_GJAuKsM";
const spreadsheetTabs = ['config', 'about', 'social', 'music', 'mroyal', 'keepcontrol'];

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  //   authorize(JSON.parse(content), listMajors);
  authorize(JSON.parse(content), createJSONFromSpreadsheet);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          'Error while trying to retrieve access token',
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Gets the data from a spreadsheet and outputs:
 * @see https://docs.google.com/spreadsheets/d/1k7P1NVuWeBOQ5fmpb4VdVbm6nSiczodyFburpMxB-ek/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function createJSONFromSpreadsheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const range = '!A1:B';

  try {
    sheets.spreadsheets.values.batchGet(
      {
        spreadsheetId,
        ranges: spreadsheetTabs.map(sheet => sheet + range)
      },
      (err, res) => {
        const results = convertResponse(res.data);
        const cleanedResults = [];

        Object.keys(results).forEach((lang) => {
          const langData = results[lang];
          langData.lang = lang;

          cleanedResults.push(langData);
        });

        fs.writeFile(
          './src/data/content.json',
          JSON.stringify(cleanedResults),
          'utf8',
          () => {
            const dogeArray = doge.toArray();
            dogeArray.forEach(function(line, index) {
              let lineOutput = line;
              if (index === Math.round(dogeArray.length / 2)) {
                lineOutput += ' Wow much JSON';
              }
              console.log(lineOutput);
            });
          }
        );
      }
    );
  } catch (error) {
    console.log('error: ', error);
  }
}

const cleanupValue = (value) => {
  if (!value) {
    return null;
  }

  if (value.toLowerCase() === "true") {
    return true;
  }
  if (value.toLowerCase() === "false") {
    return false;
  }

  return value;
};

const convertResponse = (response) => {
  const results = {};
  const values = response.valueRanges;

  values.forEach((sheet) => {
    const sheetName = sheet.range.split("!")[0];
    const languages = sheet.values.shift();

    languages.slice(1).forEach((lang, index) => {
      if (!results[lang]) {
        results[lang] = {};
      }

      const sheetData = {};
      sheet.values.forEach((row) => {
        const key = row[0];
        sheetData[key] = cleanupValue(row[index + 1]);
      });

      results[lang][sheetName] = sheetData;
    });
  });

  return flat.unflatten(results);
};
