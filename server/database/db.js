// Local Database Engine for GlobeTrotter
// Provides a standalone, persistent, atomic file-backed local database without external server dependencies.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.resolve(__dirname);
const DB_FILE = path.join(DB_DIR, 'globetrotter-db.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

class LocalDatabase {
  constructor() {
    this.tables = {
      users: [],
      trips: [],
      community_trips: [],
      cities: [],
      likes: []
    };
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const rawData = fs.readFileSync(DB_FILE, 'utf-8');
        this.tables = JSON.parse(rawData);
      } else {
        this.save();
      }
    } catch (err) {
      console.error('⚠️ [LocalDB] Error reading database file, initializing empty schema:', err.message);
      this.save();
    }
  }

  save() {
    try {
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(this.tables, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('❌ [LocalDB] Failed to persist database:', err.message);
    }
  }

  // Generic Query Methods
  find(tableName, predicate = () => true) {
    if (!this.tables[tableName]) return [];
    return this.tables[tableName].filter(predicate);
  }

  findOne(tableName, predicate) {
    if (!this.tables[tableName]) return null;
    return this.tables[tableName].find(predicate) || null;
  }

  findById(tableName, id) {
    return this.findOne(tableName, item => item.id === id);
  }

  insert(tableName, record) {
    if (!this.tables[tableName]) this.tables[tableName] = [];
    const newRecord = {
      ...record,
      id: record.id || `rec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: record.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.tables[tableName].unshift(newRecord);
    this.save();
    return newRecord;
  }

  update(tableName, id, updateFields) {
    if (!this.tables[tableName]) return null;
    const index = this.tables[tableName].findIndex(item => item.id === id);
    if (index === -1) return null;

    const existing = this.tables[tableName][index];
    const updated = {
      ...existing,
      ...updateFields,
      updatedAt: new Date().toISOString()
    };
    this.tables[tableName][index] = updated;
    this.save();
    return updated;
  }

  delete(tableName, id) {
    if (!this.tables[tableName]) return false;
    const initialLength = this.tables[tableName].length;
    this.tables[tableName] = this.tables[tableName].filter(item => item.id !== id);
    const deleted = this.tables[tableName].length < initialLength;
    if (deleted) this.save();
    return deleted;
  }

  count(tableName) {
    return this.tables[tableName] ? this.tables[tableName].length : 0;
  }
}

export const db = new LocalDatabase();
