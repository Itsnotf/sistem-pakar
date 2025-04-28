import { google } from 'googleapis';

export const getSheetData = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const authClient = await auth.getClient();

  const sheets = google.sheets({ version: 'v4', auth: authClient as any });

  const range = 'Sheet1!A1:Z1000'; 

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });
    return response.data.values; 
  } catch (e) {
    console.error('Error fetching data from Google Sheets:', e);
  }
};


export const sendDiagnosaToGoogleSheets = async (diagnosaData : any) => {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
  
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient as any });
  
      const spreadsheetId = process.env.GOOGLE_SHEET_ID; 
      const range = "Sheet1!A1:D1"; 
  
      const values = [
        [
          diagnosaData.nama,
          diagnosaData.rekamMedis,
          diagnosaData.diagnosa,
          diagnosaData.confidence,
        ],
      ];
  
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values,
        },
      });
  
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data ke Google Sheets:", error);
    }
  };
