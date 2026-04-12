const fs = require('fs');
const xlsx = require('xlsx');

const jsonPath = 'src/data/soldListings.json';
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

const workbook = xlsx.readFile('source/sold_listings.xlsx');
const sheetName = workbook.SheetNames[0];
const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

jsonData.forEach(item => {
  const row = excelData.find(r => r['Property Address'] === item.address);
  if (row && row.imgid) {
    item.imgid = String(row.imgid).trim();
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
console.log('Done merging imgid');
