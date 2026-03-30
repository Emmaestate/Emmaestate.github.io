const XLSX = require('xlsx');

function parse(file) {
  const workbook = XLSX.readFile(file);
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  console.log(`--- ${file} ---`);
  console.log(JSON.stringify(xlData, null, 2));
}

parse('./source/sold_listings.xlsx');
parse('./source/exclusive_listings.xlsx');
