import { google } from 'googleapis';

export const getSheetData = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  // Dapatkan client autentikasi
  const authClient = await auth.getClient();

  // Pastikan authClient diteruskan dengan benar
  const sheets = google.sheets({ version: 'v4', auth: authClient as any });

  const range = 'Sheet1!A1:Z1000'; 

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });
    return response.data.values; // Kembalikan data
  } catch (e) {
    console.error('Error fetching data from Google Sheets:', e);
  }
};


export const sendDiagnosaToGoogleSheets = async (diagnosaData : any) => {
    try {
      // Autentikasi Google Sheets API
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
  
      const authClient = await auth.getClient();
      const sheets = google.sheets({ version: "v4", auth: authClient as any });
  
      // ID spreadsheet dan range tempat data akan disimpan
      const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Pastikan Anda sudah menyetel ID sheet Anda
      const range = "Sheet1!A1:D1"; // Sesuaikan dengan range yang diinginkan
  
      // Data yang akan dikirimkan ke Google Sheets
      const values = [
        [
          diagnosaData.nama,
          diagnosaData.rekamMedis,
          diagnosaData.diagnosa,
          diagnosaData.confidence,
        ],
      ];
  
      // Kirim data ke Google Sheets
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values,
        },
      });
  
      console.log("Data berhasil dikirim ke Google Sheets:", response.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data ke Google Sheets:", error);
    }
  };
