import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import test, { after } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const directory = mkdtempSync(join(root, "node_modules", "mailflare-entitlement-test-"));
after(() => rmSync(directory, { recursive: true, force: true }));

await build({
	entryPoints: [join(root, "src/lib/licenses/service.ts")],
	outfile: join(directory, "service.mjs"),
	bundle: true,
	platform: "node",
	format: "esm",
	target: "node24",
	tsconfig: join(root, "tsconfig.json"),
	packages: "external",
	logLevel: "silent",
});

const {
	activateLicense,
	deactivateLicense,
	getLicenseEntitlements,
	getLicenseStatus,
	validateLicense,
} = await import(pathToFileURL(join(directory, "service.mjs")).href);

const inaccessibleEnv = new Proxy({}, {
	get(_target, property) {
		throw new Error(`Entitlement resolution accessed environment property ${String(property)}`);
	},
});

test("self-hosted entitlement enables the maximum feature set without storage or network access", async (t) => {
	t.mock.method(globalThis, "fetch", async () => {
		throw new Error("Entitlement resolution attempted a network request");
	});

	assert.deepEqual(await getLicenseEntitlements(inaccessibleEnv), {
		plan: "team",
		canCustomizeBranding: true,
		canManageAccounts: true,
		canForwardEmail: true,
	});
	assert.deepEqual(await getLicenseStatus(inaccessibleEnv), {
		plan: "team",
		state: "active",
		features: [
			"account-management",
			"branding",
			"email-forwarding",
			"multi-host-booking",
			"shared-mailboxes",
		],
		instanceId: "self-hosted",
		instanceUrl: null,
		active: true,
		activatedAt: null,
		validatedAt: null,
	});
});

test("commercial license mutations are unavailable in the self-hosted build", async () => {
	const message = /includes all features and does not accept commercial license changes/;
	await assert.rejects(activateLicense(inaccessibleEnv, "key", "https://example.test", "team"), message);
	await assert.rejects(validateLicense(inaccessibleEnv, "key", "https://example.test"), message);
	await assert.rejects(deactivateLicense(inaccessibleEnv), message);
});
