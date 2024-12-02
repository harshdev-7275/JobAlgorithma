// Import necessary modules
const fs = require('fs');
const path = require('path');

// Define file paths
const textFilePath = path.join(__dirname, 'input.txt');
const markdownFilePath = path.join(__dirname, 'output.md');

// Function to read from text file and write to markdown file
function autoImportToMarkdown() {
  fs.readFile(textFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading text file:', err);
      return;
    }

    // Create the markdown content with auto headings
    const mdContent = `# JobAlgorithma Development Progress Checkpoint

**Date:** ${new Date().toISOString().split('T')[0]}

## Content Imported from Text File
${data}

---

**Edited By:** Harsh Singh
`;

    // Write the markdown content to the output file
    fs.writeFile(markdownFilePath, mdContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing markdown file:', err);
      } else {
        console.log('Markdown file successfully updated!');
      }
    });
  });
}

// Run the function
autoImportToMarkdown();

// Optional: Watch for changes in the text file
fs.watchFile(textFilePath, (curr, prev) => {
  console.log('Change detected in text file. Updating markdown...');
  autoImportToMarkdown();
});
