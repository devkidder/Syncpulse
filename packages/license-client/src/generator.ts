import { createPrivateKey, sign } from 'crypto';
import { LicensePayload, TrialLicenseOptions, CommercialLicenseOptions } from './types.js';
import { LicenseStorage } from './storage.js';

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

  static generateCommercialLicense(options: CommercialLicenseOptions, privateKey: string): string {
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

  static generateTeamLicense(options: CommercialLicenseOptions, privateKey: string): string {
    return this.generateCommercialLicense({ ...options, type: 'team' }, privateKey);
  }

  static generateEnterpriseLicense(options: CommercialLicenseOptions, privateKey: string): string {
    return this.generateCommercialLicense({ ...options, type: 'enterprise' }, privateKey);
  }

  private static signLicense(payload: LicensePayload, privateKey?: string): string {
    if (!privateKey) {
      throw new Error(
        'Commercial license signing requires a private key. ' +
        'Set via environment variable SYNCPULSE_PRIVATE_KEY or pass as parameter. ' +
        'For development, generate a key with: openssl genrsa -out key.pem 2048'
      );
    }

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
