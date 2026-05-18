import { createPrivateKey, sign } from 'crypto';
import { LicensePayload, TrialLicenseOptions, CommercialLicenseOptions } from './types.js';
import { LicenseStorage } from './storage.js';

const DEFAULT_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFMllQDffT/mQ1
vy2ACyNQ2MtOL4V3XIvlkHRdZA6pq5xurYj0c1e56urWM6T07zk6r7bItyG+Rv/h
4LxjCdsjfyQ8OQaRPo3xZmnyO2cAz0VSfs/YM6XLtYzDzDnv7Y06TXMJbHhupYBU
WQJJSVTv63SsuYcHo0vLKQvng88AVEALclmi88oVSEVWDtw96PgMsC8Pu9MMDNOo
6J2PqbiS7TVWMcBCJvhVjS5I+TcNdjCKSG+jAh23eY9uqnYWeCAM7PDIm7G7qzpa
N7mCFvF840vZj9Jbp56msca3xJGZBb74s2JLpbmhmjvmBOz4R1egEwihwghI/RCs
ZIOm4/h5AgMBAAECggEATcYDSpsPtNkevcHmWJtL9O1kFbSRX5etBz/XXSQC0nFA
E7i2jK7XGRjpQM0CkKWu/RHjNbtggBKxhe0kb60p9BCHgob9K5iv09cQDvzVrZCR
5yzjnYIVMEgsueZYrWOT8TwtlDhnMUBt4hZu2+ejq7JCBINxmZYSZRCNxOQL5rUi
d0Ukl2bFrbo1rI/QJ4TFgeyfWeNqQsHs2SkZTbuLJbR1VGcqAXZo1E4u5nLknKgb
vd2ML0G3Bbm+1B0KCHnjghRjaBMhrAOQUYdZC1v7x2URjFk8ppxHdm9N/OOuRwqW
FkQmbjOBcgdRW26pbraoRkU/i387xtjy5gT7gO3B5wKBgQDm6lUlVw1DVHjp1j9O
KzVuH4PtIdyGWGfnpmbjew1QsF1VQOUUvrRxkjEgyqdc880yLFN1Aryk0xZ9KBrK
ApiyCDJXo+oOjml6AcOqpNPyo1lqpKJvAnq6i2GLoNlA8/EhqET7DsyOQH8Z6gQ8
2xo9TI4+giYv/1cGGVFRwz/8BwKBgQDanlAE9rIT4PcZZAO+RhNMN1Mee1ZAykiS
3F734TWdo0mmH/s1XU1QMtEfsjXK6V1mhTRha1G+67LZfG/J+TOPwK2HmnCtj1id
8TRzyBTJL0+VeYlATwJkJYv6nGguX7t636Y2NUwFyE+B7eYbNbaLT0UCDiZX1/rz
8tXaSsBHfwKBgE7kqviZ+F8TokgKOhDD9HpObC19jzGbTMy5bpez+AWkbA7voBTp
Xw8aaoyQkIPSjD3jJRRqPfd2Y02ZgSWZo3/YCxMkXphgkarspWRM8lkI9EjaPOD+
kN3hNw+UggWOEsl0CzVXhg3n/UTmTlJYbWuaF1NF9jQZ4iqkRcNQmTDLAoGAFQWw
MCoAycSSPlDNw1g9ttCDH6VAkA5jmCu0viVb4IK5LE5a+7CzJIkebuvWHGMAZkFc
3hlRzQghNKSwoz1hZetjRGzndOkZ3mY5YwDUbtwrzPXY6uQuGK87nKe5pOvzvUcQ
Vpoda1jtvFLCE8/Ac/j1a9MsgLn2Gcs6ITma78UCgYEAxORZAdvtzCLS1LMUn5jU
bTZJp7TktHigBi9VkPmCe2sw/ycCCAkuRL7/yfqWte2+oAOkpHEO/dCcZewFxytX
9xV3hyCthzAsgzS+OfKS3Y64/8Qtin4TK0LqVp2n5GZKSKNW+s0lDpFXZvHnRVyI
8BzuPaN9SJmUTDKls/BaRy0=
-----END PRIVATE KEY-----`;

export class LicenseGenerator {
  static generateTrialLicense(options: TrialLicenseOptions = {}): string {
    const days = options.days ?? 14;
    const product = options.product ?? 'syncpulse-cli';
    const version = options.version ?? '1.2.0';

    const now = new Date();
    const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const machineId = LicenseStorage.getMachineId();

    const payload: LicensePayload = {
      type: 'trial',
      issued_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      product,
      version,
      features: {
        concurrent_agents: 1,
        storage_gb: 10,
        team_members: 1,
        priority_support: false,
        custom_branding: false,
      },
      activation: {
        activated_at: now.toISOString(),
        machine_id: machineId,
        license_key: `trial_${Date.now()}`,
      },
    };

    return this.signLicense(payload);
  }

  static generateCommercialLicense(options: CommercialLicenseOptions, privateKey?: string): string {
    const now = new Date();

    const payload: LicensePayload = {
      type: options.type,
      issued_at: now.toISOString(),
      expires_at: options.expiresAt.toISOString(),
      product: 'syncpulse-cli',
      version: options.version ?? '1.2.0',
      features: options.features,
      activation: {
        activated_at: now.toISOString(),
        machine_id: options.machineId ?? LicenseStorage.getMachineId(),
        license_key: options.licenseKey,
      },
    };

    return this.signLicense(payload, privateKey);
  }

  private static signLicense(payload: LicensePayload, privateKey: string = DEFAULT_PRIVATE_KEY): string {
    const header = {
      alg: 'RS256',
      typ: 'JWT',
      kid: 'syncpulse-2026',
    };

    const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url');
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');

    const key = createPrivateKey({
      key: privateKey,
      format: 'pem',
    });

    const signature = sign('sha256', Buffer.from(`${headerB64}.${payloadB64}`), {
      key,
      format: 'pem',
      type: 'pkcs8',
    });

    const signatureB64 = signature.toString('base64url');
    return `${headerB64}.${payloadB64}.${signatureB64}`;
  }
}
