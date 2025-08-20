import { APIError, type BetterAuthPlugin } from "better-auth";
import type { SocialProvider } from "better-auth/social-providers";
import { createAuthEndpoint, createAuthMiddleware } from "better-auth/api";

import type {
	LastSocialProviderOptions,
	RealizedLastSocialProviderOptions,
} from "./types";

export * from "./types";
export * from "./client";

export const lastSocialProvider = (options?: LastSocialProviderOptions) => {
	const opts: RealizedLastSocialProviderOptions = {
		cookieName: options?.cookieName ?? "better-auth.last_used_social",
		maxAge: options?.maxAge ?? 432000,
	};

	return {
		id: "last-social-provider",
		endpoints: {
			lastUsedSocialProvider: createAuthEndpoint(
				"/last-used-social-provider",
				{
					method: "GET",
					requireHeaders: true,
					metadata: {
						openapi: {
							description:
								"Get the last social provider the user used to sign in.",
							operationId: "lastUsedSocialProvider",
							responses: {
								"200": {
									description:
										"Success - Returns the provider ID of the last social provider",
									content: {
										"application/json": {
											schema: {
												type: "string",
												description: "Social Provider ID",
											},
										},
									},
								},
							},
						},
					},
				},
				async (c) => {
					const providerId = c.getCookie(opts.cookieName);

					if (!providerId) {
						return null;
					}

					return providerId as SocialProvider;
				},
			),
		},
		hooks: {
			after: [
				{
					matcher: (context) => {
						return context.path.startsWith("/callback");
					},

					handler: createAuthMiddleware(async (ctx) => {
						const providerId = ctx.path.split("/").at(-1);
						if (!providerId) return;

						ctx.setCookie(opts.cookieName, providerId, {
							maxAge: opts.maxAge,
						});
					}),
				},
			],
		},
	} satisfies BetterAuthPlugin;
};
