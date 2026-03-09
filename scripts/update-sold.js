import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const EXCEL_FILE = path.join(PROJECT_ROOT, 'source/sold_listing.xlsx');
const SOURCE_IMAGES_DIR = path.join(PROJECT_ROOT, 'source/sold_listing_image');
const DEST_IMAGES_DIR = path.join(PROJECT_ROOT, 'src/assets/soldProperties');
const OUTPUT_JSON = path.join(PROJECT_ROOT, 'src/data/soldListings.json');
const IMAGES_JS_FILE = path.join(PROJECT_ROOT, 'src/data/images.js');
const SOLD_IMAGES_JS_FILE = path.join(PROJECT_ROOT, 'src/data/soldImages.js');

// Ensure destination directory exists
if (!fs.existsSync(DEST_IMAGES_DIR)) {
  fs.mkdirSync(DEST_IMAGES_DIR, { recursive: true });
}

// Helper to normalize address for filename
function normalizeFilename(address) {
  // Extract street number and name, ignore unit numbers and city/state
  // Example: "362 Lafayette Ave #A, Cliffside Park, NJ 07010" -> "362_Lafayette_Ave"
  // Example: "9 Heatherhill Rd, Demarest, NJ" -> "9_Heatherhill_Rd"
  
  const streetPart = address.split(',')[0].trim();
  // Remove unit numbers if present (e.g. #A, Apt 1)
  const cleanStreet = streetPart.replace(/#.*$/, '').replace(/Unit.*$/i, '').replace(/Apt.*$/i, '').trim();
  
  return cleanStreet.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

// Helper to find matching image file
function findImageFile(address) {
  const files = fs.readdirSync(SOURCE_IMAGES_DIR);
  const streetPart = address.split(',')[0].trim();
  
  // Try exact match on street part
  let match = files.find(file => file.toLowerCase().startsWith(streetPart.toLowerCase()));
  
  if (!match) {
    // Try fuzzy match or just look for street name
    // This part can be improved based on actual filenames
    // Based on user provided list, filenames look like "1060 Anderson Ave.jpg"
    // So "1060 Anderson Ave" should match
    
    // Normalize spaces
    const normalizedStreet = streetPart.replace(/\s+/g, ' ').toLowerCase();
    match = files.find(file => {
      const fileBase = path.parse(file).name.toLowerCase();
      return fileBase.includes(normalizedStreet) || normalizedStreet.includes(fileBase);
    });
  }
  
  return match;
}

// Read Excel
console.log('Reading Excel file...');
const workbook = xlsx.readFile(EXCEL_FILE);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

const soldListings = [];
const imageImports = {};

console.log(`Found ${data.length} records.`);

data.forEach((row, index) => {
  const address = row['Property Address'];
  if (!address) return;

  const normalizedName = normalizeFilename(address);
  const imageKey = `sold_${normalizedName}`;
  
  // Find and copy image
  const imageFile = findImageFile(address);
  let hasImage = false;
  
  if (imageFile) {
    const srcPath = path.join(SOURCE_IMAGES_DIR, imageFile);
    const ext = path.extname(imageFile);
    const destFilename = `${normalizedName}${ext}`;
    const destPath = path.join(DEST_IMAGES_DIR, destFilename);
    
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied image for ${address} -> ${destFilename}`);
    
    // We export the image import path relative to src/data/soldImages.js
    // soldImages.js is in src/data, images are in src/assets/soldProperties
    // So path is ../assets/soldProperties/filename
    imageImports[imageKey] = `../assets/soldProperties/${destFilename}`;
    hasImage = true;
  } else {
    console.warn(`Warning: No image found for ${address}`);
  }

  // Construct listing object
  soldListings.push({
    id: (index + 1).toString(),
    imageKey: hasImage ? imageKey : null, 
    address: address,
    price: row['Sale/Lease Price'],
    bedrooms: row['Beds'],
    bathrooms: row['Baths'],
    sqft: row['Sq Ft'] === 'Not provided' ? null : row['Sq Ft'],
    // Add other fields if needed
  });
});

// Write JSON
console.log('Writing soldListings.json...');
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(soldListings, null, 2));

// Generate soldImages.js
console.log('Generating soldImages.js...');
let jsContent = '';
const importKeys = Object.keys(imageImports);

importKeys.forEach(key => {
  jsContent += `import ${key} from '${imageImports[key]}';\n`;
});

jsContent += '\nexport const soldImages = {\n';
importKeys.forEach(key => {
  jsContent += `  ${key},\n`;
});
jsContent += '};\n';

fs.writeFileSync(SOLD_IMAGES_JS_FILE, jsContent);

// Update images.js to include soldImages
console.log('Updating images.js...');
let imagesJsContent = fs.readFileSync(IMAGES_JS_FILE, 'utf8');

// Check if soldImages import already exists
if (!imagesJsContent.includes("import { soldImages } from './soldImages';")) {
  // Add import at the top
  imagesJsContent = "import { soldImages } from './soldImages';\n" + imagesJsContent;
}

// Check if spread exists in export
if (!imagesJsContent.includes('...soldImages')) {
  // Add spread to export object
  // Look for "export const images = {"
  imagesJsContent = imagesJsContent.replace(
    'export const images = {',
    'export const images = {\n  ...soldImages,'
  );
}

fs.writeFileSync(IMAGES_JS_FILE, imagesJsContent);

console.log('Done! Sold listings updated.');
