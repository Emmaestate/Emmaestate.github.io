const fs = require('fs');
const xlsx = require('xlsx');
const crypto = require('crypto');

const workbook = xlsx.readFile('source/sold_listings.xlsx');
const sheetName = workbook.SheetNames[0];
const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

const soldProperties = excelData.map(row => {
  const address = row['Property Address'] || '';
  const price = row['Sale/Lease Price'] || 0;
  const beds = row['Beds'] || 0;
  const baths = row['Baths'] || 0;
  const featuresRaw = row['Features'] || '';
  const imgid = row['imgid'] ? String(row['imgid']).trim() : undefined;
  
  // Clean up MLS Number to be string, or generate off_market id
  let mlsIdStr = '';
  let id = '';
  if (row['MLS Number']) {
    mlsIdStr = String(row['MLS Number']).trim();
    id = mlsIdStr;
  } else {
    // Generate a stable ID based on address for off-market properties
    const hash = Buffer.from(address).toString('base64').substring(0, 8);
    mlsIdStr = `off_market_${hash}`;
    id = mlsIdStr;
  }

  // Parse features
  const features = featuresRaw
    .split('\n')
    .map(f => f.trim())
    .filter(f => f.startsWith('-'))
    .map(f => f.substring(1).trim());

  const prop = {
    id: id,
    imageKey: `sold_${address.split(',')[0].toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
    address: address,
    price: price,
    bedrooms: beds,
    bathrooms: baths,
    sqft: null,
    features: features,
    features_zh: [], 
    mlsId: mlsIdStr
  };
  
  if (imgid) {
    prop.imgid = imgid;
  }
  
  return prop;
});

fs.writeFileSync('src/data/soldListings.json', JSON.stringify(soldProperties, null, 2));
console.log(`Rebuilt soldListings.json with ${soldProperties.length} items`);