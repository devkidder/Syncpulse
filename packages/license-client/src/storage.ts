import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { createHash } from 'crypto';

const LICENSE_DIR = path.join(os.homedir(), '.syncpulse');
const LICENSE_FILE = path.join(LICENSE_DIR, 'license.jwt');
const LICENSE_CACHE = path.join(LICENSE_DIR, 'license.json');
const MACHINE_ID_FILE = path.join(LICENSE_DIR, 'machine-id');

export class LicenseStorage {
  static ensureDirectory(): void {
    if (!fs.existsSync(LICENSE_DIR)) {
      fs.mkdirSync(LICENSE_DIR, { recursive: true, mode: 0o700 });
    }
  }

  static saveLicense(token: string): void {
    this.ensureDirectory();
    fs.writeFileSync(LICENSE_FILE, token, { mode: 0o600 });
  }

  static loadLicense(): string | null {
    if (!fs.existsSync(LICENSE_FILE)) {
      return null;
    }
    return fs.readFileSync(LICENSE_FILE, 'utf-8');
  }

  static deleteLicense(): void {
    if (fs.existsSync(LICENSE_FILE)) {
      fs.unlinkSync(LICENSE_FILE);
    }
  }

  static hasLicense(): boolean {
    return fs.existsSync(LICENSE_FILE);
  }

  static saveLicenseCache(cacheData: Record<string, unknown>): void {
    this.ensureDirectory();
    fs.writeFileSync(LICENSE_CACHE, JSON.stringify(cacheData, null, 2), { mode: 0o600 });
  }

  static loadLicenseCache(): Record<string, unknown> | null {
    if (!fs.existsSync(LICENSE_CACHE)) {
      return null;
    }
    try {
      const data = fs.readFileSync(LICENSE_CACHE, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  static getMachineId(): string {
    this.ensureDirectory();
    
    if (fs.existsSync(MACHINE_ID_FILE)) {
      return fs.readFileSync(MACHINE_ID_FILE, 'utf-8').trim();
    }

    const machineId = this.generateMachineId();
    fs.writeFileSync(MACHINE_ID_FILE, machineId, { mode: 0o600 });
    return machineId;
  }

  private static generateMachineId(): string {
    const hostname = os.hostname();
    const platform = os.platform();
    const timestamp = Date.now().toString();
    const combined = `${hostname}-${platform}-${timestamp}`;
    return createHash('sha256').update(combined).digest('hex').substring(0, 16);
  }

  static clearCache(): void {
    if (fs.existsSync(LICENSE_CACHE)) {
      fs.unlinkSync(LICENSE_CACHE);
    }
  }

  static getStoragePath(): string {
    return LICENSE_DIR;
  }

  static ensureStorageDirectory(): void {
    this.ensureDirectory();
  }
}
