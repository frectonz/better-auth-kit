# Last Used Social Provider Plugin for [Better Auth](https://github.com/better-auth/better-auth)

This plugin allows you to store the last social provider a user used to login.

## Installation

```bash
npm install @better-auth-kit/last-social-provider
```

## Usage

```ts
import { lastSocialProvider } from "@better-auth-kit/last-social-provider";

export const auth = betterAuth({
  plugins: [
    lastSocialProvider()
  ],
});
```

## Documentation

Read our documentation at [better-auth-kit.com](https://better-auth-kit.com/docs/plugins/last-social-provider).

## License

[MIT](LICENSE)
