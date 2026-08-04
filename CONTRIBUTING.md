# Contributing

Contributions should stay within the Codex desktop theme boundary.

Before submitting a change:

1. Run `npm ci`.
2. Run `npm run verify`.
3. Test the changed surface in a real Codex view.
4. Restore the original appearance with `npm run theme:restore`.
5. Update `docs/compatibility.md` when the verified app, operating system, route, or runtime version changes.

Prefer semantic attributes and stable cross-route classes. Avoid localized text selectors, positional selectors, long direct-child chains, and generated CSS-module class names. Treat hidden windows, collapsed sidebars, narrow layouts, settings routes, and secondary renderer windows as separate cases.

Do not add Microsoft fonts, icons, logos, sounds, or extracted application assets. Sanitize DOM snapshots before sharing them; snapshots and local audit artifacts do not belong in the repository.
