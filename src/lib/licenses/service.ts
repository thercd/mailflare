import type { LicenseEntitlements, LicensePlan, LicenseStatus } from "./types";

const SELF_HOSTED_FEATURES = [
	"account-management",
	"branding",
	"email-forwarding",
	"multi-host-booking",
	"shared-mailboxes",
];
Object.freeze(SELF_HOSTED_FEATURES);

const SELF_HOSTED_LICENSE_STATUS: LicenseStatus = {
	plan: "team",
	state: "active",
	features: SELF_HOSTED_FEATURES,
	instanceId: "self-hosted",
	instanceUrl: null,
	active: true,
	activatedAt: null,
	validatedAt: null,
};
Object.freeze(SELF_HOSTED_LICENSE_STATUS);

const SELF_HOSTED_ENTITLEMENTS: LicenseEntitlements = {
	plan: "team",
	canCustomizeBranding: true,
	canManageAccounts: true,
	canForwardEmail: true,
};
Object.freeze(SELF_HOSTED_ENTITLEMENTS);

const LICENSE_MANAGEMENT_DISABLED =
	"This self-hosted build includes all features and does not accept commercial license changes";

/**
 * Central entitlement boundary for this fork.
 *
 * Keep callers on the upstream license API so upstream changes remain easy to
 * merge. The self-hosted build resolves that API locally and never reads a
 * license key, database row, or remote licensing service.
 */
export async function getLicenseStatus(env: CloudflareEnv): Promise<LicenseStatus> {
	void env;
	return SELF_HOSTED_LICENSE_STATUS;
}

export async function getLicenseEntitlements(env: CloudflareEnv): Promise<LicenseEntitlements> {
	void env;
	return SELF_HOSTED_ENTITLEMENTS;
}

export async function activateLicense(
	env: CloudflareEnv,
	licenseKey: string,
	instanceUrl: string,
	plan: Exclude<LicensePlan, "community">,
): Promise<LicenseStatus> {
	void env;
	void licenseKey;
	void instanceUrl;
	void plan;
	throw new Error(LICENSE_MANAGEMENT_DISABLED);
}

export async function validateLicense(
	env: CloudflareEnv,
	licenseKey: string,
	instanceUrl: string,
): Promise<LicenseStatus> {
	void env;
	void licenseKey;
	void instanceUrl;
	throw new Error(LICENSE_MANAGEMENT_DISABLED);
}

export async function deactivateLicense(env: CloudflareEnv): Promise<LicenseStatus> {
	void env;
	throw new Error(LICENSE_MANAGEMENT_DISABLED);
}
