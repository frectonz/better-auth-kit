import type { BetterAuthClientPlugin } from "better-auth";
import { lastSocialProvider } from ".";

export const lastSocialProviderClient = () => {
	return {
		id: "last-social-provider",
		$InferServerPlugin: {} as ReturnType<typeof lastSocialProvider>,
	} satisfies BetterAuthClientPlugin;
};
