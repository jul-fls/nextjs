import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.resolve('.', 'public', 'swagger.json');
    const swaggerDoc = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(swaggerDoc);
}