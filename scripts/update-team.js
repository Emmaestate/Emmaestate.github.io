import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const EXCEL_FILE = path.join(PROJECT_ROOT, 'source/team.xlsx');
const OUTPUT_JSON = path.join(PROJECT_ROOT, 'src/data/team.json');

console.log('Reading Team Excel file...');

try {
  const workbook = xlsx.readFile(EXCEL_FILE);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  // You can perform additional formatting here if necessary
  const formattedData = data.map((row) => ({
    name: row['Name'] || '',
    description: row['Description'] || '',
    email: row['Email'] || '',
    phone: row['Phone'] || '',
    // Assuming Emma is the Team Leader, everyone else is a Licensed Real Estate Salesperson
    label: row['Name'] && row['Name'].includes('Emma') ? 'Team Leader' : 'Licensed Real Estate Salesperson'
  }));

  // Ensure destination directory exists
  const outputDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(formattedData, null, 2), 'utf-8');
  console.log(`Successfully generated team.json with ${formattedData.length} members.`);

} catch (error) {
  console.error('Error updating team data:', error.message);
  process.exit(1);
}
