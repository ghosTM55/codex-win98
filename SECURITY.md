# Security

## Supported version

Security fixes are made against the latest source version only.

## Runtime boundary

The full skin uses Chromium DevTools Protocol through CodeDrobe. The debugging endpoint is expected to listen only on `127.0.0.1`, but any local process running as the same user may be able to reach it while the themed session is active.

- Do not expose the debugging port through a firewall rule, proxy, tunnel, or container port mapping.
- Use `npm run theme:restore` when the full skin is no longer needed.
- Do not run the apply script on a shared or untrusted machine.
- The default apply command never closes an existing desktop client. The explicit `theme:apply:restart` command does.

The native fallback does not require a debugging port.

## Reporting

If the public repository has GitHub private vulnerability reporting enabled, use **Security → Report a vulnerability**. Do not include credentials, private conversation content, or unsanitized DOM snapshots in a public issue.
