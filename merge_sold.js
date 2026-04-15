import fs from 'fs';
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, 'src/data/soldListings.json');
const excelPath = path.resolve(__dirname, 'source/sold_listings.xlsx');

const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const wb = xlsx.readFile(excelPath);
const sheet = wb.Sheets[wb.SheetNames[0]];
const excelData = xlsx.utils.sheet_to_json(sheet);

excelData.forEach(row => {
  const address = row['Property Address'];
  if (!address) return;
  
  // Find in json
  const item = jsonData.find(j => j.address === address);
  if (!item) {
    console.log("Not found in JSON:", address);
    return;
  }

  // Update simple fields
  item.price = row['Sale/Lease Price'] || item.price;
  item.bedrooms = row['Beds'] || item.bedrooms;
  item.bathrooms = row['Baths'] || item.bathrooms;

  // Update Features
  if (row['Features']) {
    let rawFeatures = row['Features'].toString();
    // Some features are split by \n and start with -
    let lines = rawFeatures.split('\n').map(l => l.trim().replace(/^[-"]\s*/, '').replace(/"$/, '').trim()).filter(l => l.length > 0);
    if (lines.length === 1 && lines[0].includes(' -')) {
      // split by ' -'
      lines = lines[0].split(' -').map(l => l.trim().replace(/^-/, '').trim()).filter(l => l.length > 0);
    }
    item.features = lines;
  }

  // Update MLS ID / imgid
  const mlsRaw = row['MLS Number'];
  if (typeof mlsRaw === 'string' && mlsRaw.toLowerCase().includes('off market')) {
    item.mlsId = 'Off market presale'; // User requested to remove MLS ID for 252 South and 300 West 30th
  } else if (mlsRaw) {
    item.mlsId = mlsRaw.toString();
  }

  if (row['imgid']) {
    item.imgid = row['imgid'].toString();
  }
});

// Explicit user overrides to ensure 100% compliance
// 1. 439 Elizabeth 可以用文件夹25021347的照片
const item439 = jsonData.find(j => j.address.includes('439 Elizabeth'));
if (item439) item439.imgid = '25021347';

// 2. 1531 11th st文件夹里已经有照片了(以地址命名）
const item1531 = jsonData.find(j => j.address.includes('1531 11th'));
if (item1531) item1531.imgid = '1531 11th st';

// 5. 252 south 和 300 West 30th Street的MLS ID去除了
const item252 = jsonData.find(j => j.address.includes('252 South'));
if (item252) item252.mlsId = '';

const item300 = jsonData.find(j => j.address.includes('300 West 30th'));
if (item300) item300.mlsId = '';

// Check 669 Summit features just to be sure
const item669 = jsonData.find(j => j.address.includes('669 Summit'));
if (item669 && !item669.features.length) {
    console.log("669 Summit features empty?");
}

fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
console.log('Merged Excel updates into soldListings.json successfully!');
