import fs from 'fs';

const file = await fs.readFile(process.argv[2], 'utf8');

const converted = await convert(file, '');

await fs.writeFile(process.argv[3], converted, 'utf8');
