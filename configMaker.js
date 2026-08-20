const fs = require('fs');
const path = require('path');

// 1. Configure the path to your MT4 terminal's Files directory
// Replace the path below with your actual MT4 data folder path
const MT4_FILES_DIR = path.join(
  process.env.APPDATA || '',
  'MetaQuotes',
  'Terminal',
  'YOUR_TERMINAL_INSTANCE_ID', // e.g., '3B0A42E40B7EE84949C650A1A2467C08'
  'MQL4',
  'Files'
);

const CONFIG_FILE_NAME = 'config.txt';

// 2. Define the grid settings you want to write
const gridSettings = {
  LOT: 0.04,
  MAX_ORDERS: 8,
  GRID_STEP: 650,
  MIN_PROFIT: 3.5,
  STAGNATION: 240,
};

// 3. Helper function to format the key-value pairs
function generateConfigContent(settings) {
  const lines = [
    '# Dynamic Grid EA Configuration',
    `# Updated at: ${new Date().toISOString()}`,
    '',
    `LOT=${settings.LOT}`,
    `MAX_ORDERS=${settings.MAX_ORDERS}`,
    `GRID_STEP=${settings.GRID_STEP}`,
    `MIN_PROFIT=${settings.MIN_PROFIT}`,
    `STAGNATION=${settings.STAGNATION}`,
    '',
  ];
  return lines.join('\r\n'); // Use CRLF for standard Windows compatibility
}

// 4. Write settings to the destination file
function writeConfigFile(targetDir, settings) {
  try {
    // Ensure destination directory exists (fallback to local directory if invalid)
    const destinationFolder = fs.existsSync(targetDir) ? targetDir : __dirname;
    const filePath = path.join(destinationFolder, CONFIG_FILE_NAME);

    const fileContent = generateConfigContent(settings);
    fs.writeFileSync(filePath, fileContent, 'utf8');

    console.log(`✓ Configuration successfully written to:\n  ${filePath}`);
  } catch (err) {
    console.error('Error writing configuration file:', err.message);
  }
}

// Execute
writeConfigFile(MT4_FILES_DIR, gridSettings);
