import type { BetterAuthClientPlugin } from "better-auth";
import type { lastSocialProvider } from ".";

export const lastSocialProviderClient = () => {
	return {
		id: "last-social-provider",
		$InferServerPlugin: {} as ReturnType<typeof lastSocialProvider>,
	} satisfies BetterAuthClientPlugin;
};
