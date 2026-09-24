# AGENTS.md — Guide for AI Agents Writing INAV Documentation

## Project Overview

This is `iNavFlight.github.io`, a Docusaurus site: the **user-facing**
documentation for INAV flight controller firmware. The audience is pilots
setting up and flying real hardware, not developers reading source — that
distinction drives every rule below. A wrong default value or a mislabeled
button here isn't a stylistic nit, it's the kind of thing that gets someone's
aircraft misconfigured or a board bricked. There's no compiler to catch it.

### Key Characteristics
- **Type**: Static documentation site (Docusaurus v3)
- **Format**: MDX, one sentence per line
- **Versioning**: `versioned_docs/version-X.Y.Z/` = frozen release snapshots; `docs/` = current-dev / unreleased tree
- **Base branch**: `master` (directory-based versioning, not INAV firmware's maintenance-branch strategy)
- **Build/test**: `npm run build`. This does **not** fail on broken links or
  anchors — `docusaurus.config.ts` sets `onBrokenLinks: "warn"` and
  `onBrokenAnchors` defaults to `warn` too — and CI never builds a PR at all
  (`deploy.yml` has no `pull_request` trigger). A clean exit code is not
  evidence that your links/anchors resolve; see "Build health" below.
- **Audience**: Users, who may be trying INAV for the first time, or may be more experienced pilots.

## Directory Structure

```
docs/                          # current-dev tree — describes the active
                                # development branch (check with the reader
                                # if unsure which inav branch is "current")
versioned_docs/version-X.Y.Z/  # frozen snapshot of a released version —
                                # only edit to fix an error real at that
                                # release, never to add current-dev behavior
static/img/                    # images, referenced as /img/Folder/name.png
blog/                           # release-adjacent posts
src/                            # site components (Contributors page, etc.)
```

## The Core Requirement: Evidence Before You Write Anything

Treat every factual claim you're about to write — a default value, a range, a
button's label, which tab something lives on, what a feature actually does —
as a hypothesis that needs checking, not a thing you already know. This
applies equally to "the current wiki page already says this" and to your own
background knowledge of INAV internals: both go stale as the firmware evolves,
and neither is a substitute for looking at the current source.

Also be wary of writing explanations of *why*, or recommendations of something *should*
be done, which aren't directly knowable by reading the source and other authoritative
sources. The code can inform you of how the code works, but not necesarily *why*, or
how a setting *should* be set. For those types of things, in the PR description ask
for an experienced human test pilot to please weigh in.
Partial exception - when documenting a specific firmware PR: clear, unambiguous statements
of why made by the feature author, the lead test pilot (Jetrell), or the maintainer (Sensei) 
can sometimes be carefully paraphrased in the documentation, particularly if two of these 
reliable sources have stated agreement.


### Source reliability ranking

| Source | Reliability | Notes |
|---|---|---|
| `src/main/fc/settings.yaml` (correct branch) | Highest | Ground truth for setting name, default, min/max |
| Relevant `.c` implementation | Highest | Use when settings.yaml's description is thin or stale |
| Configurator `.js`/`.html`/`tabs/*` source | Highest | Ground truth for UI — tab names, labels, click behavior |
| The PR that introduced/changed the feature | High | Description + discussion + diff must ALL be read |
| Jetrell's or the feature author's PR/issue comments | High | Treat as authoritative for intent/nuance |
| Release notes / CHANGELOG | High | For "changed in version X," cross-check against target version |
| Commit history / `git blame` | Medium-high | Good for *when/why* a default changed |
| Other existing pages on this site (related features) | Medium | Consistency check, not a primary source |
| Maintainer comment in Discord/forum | Medium | Corroborate against code/PR before relying on it alone |

### Not reliable enough alone

- A PR title or the author's stated intent, without reading the actual diff
- A non-maintainer's comment, without independent corroboration
- "It probably works like similar feature X" — verify the specific one
- The current wiki/docs text itself, taken as a source rather than a claim
- Generic "how flight controllers usually work" background knowledge
- The introducing PR's own description, taken as still-current — a PR's
  body reflects intent *at the time it was written*; later review commits on
  the same PR (or a later PR) can change the actual behavior before or after
  merge. Always diff the final merged source itself, even when the PR body
  is a "High" reliability source.
- A firmware PR "existing" or "looking complete" — check `gh pr view <PR#>
  --repo iNavFlight/inav --json state,mergedAt`. Documenting a feature that
  depends on a firmware or Configurator PR that hasn't merged yet is fine
  (docs can land ready to go live the moment the dependency merges), but the
  docs PR description must say so explicitly — name the dependency PR(s) and
  their merge state — so a reviewer isn't misled into thinking it already
  shipped. See PR #15 below.

### Two easy-to-miss error classes

- **"Full"/"complete" list claims.** If a page says a table is "the full
  enumeration" of an enum or setting's valid values, count the actual
  entries in `settings.yaml` (or the `.c` source) — don't reconstruct the
  list from memory or from checking only the first few values. A single
  missing entry silently tells a pilot with that hardware they're
  unsupported.
- **Exact literal strings.** CLI setting names, OSD status messages, and
  other strings a pilot will search for or compare against their screen
  must be copied character-for-character from source (`osd.h`'s
  `OSD_MSG_*`, `settings.yaml` names/table values) — including case and
  singular/plural. "Close enough" paraphrasing of a literal string is wrong
  by definition.

### Where citations go

**List the sources you checked in the PR description — file paths, branch,
and the specific value found for anything numeric. Do not put citations or
source references inline in the published documentation text.** The page
itself should read as clean prose for a pilot; the PR body is where you show
your work so a human (or the review sub-agent below) can spot-check it.

### Concrete precedent from this repo (match this bar)

- PR #24 corrected four wrong defaults and a wrong range by checking
  `settings.yaml` on `maintenance-10.x` and naming the branch + values in the
  PR body — this is the standard to hit, not an exceptional case. The same
  PR's *original* page still needed a follow-up fix from Jetrell because it
  read as multirotor setup advice no cited source established — see the
  "Unsupported why/should claims" checklist item below; passing every
  evidence check doesn't catch this failure mode.
- PR #21 caught that the wiki claimed a feature had its own tab when it
  doesn't, by checking the Configurator's own tab source rather than trusting
  the existing page.
- PR #19 systematically re-checked every CLI setting name mentioned in the
  docs against `settings.yaml` and found several silent renames.
- PR #16 caught a claim that was true for the frozen 9.1.0 snapshot but false
  for current-dev once a feature shipped — always check the claim against the
  version tree you're actually editing.
- PR #22 avoided duplicating volatile settings-migration detail across pages,
  linking to release notes ("the one place they are maintained") instead.
- Anti-pattern: several older bulk-import PRs have empty descriptions — fine
  for a pure mechanical change, never acceptable when a claim about behavior
  is involved.
- Anti-pattern: a page shipped a wrong CLI setting name
  (`xxxxx_bitrate` instead of the real `xxxxx_bitrate_kbps`), a wrong
  default (`xxxxx_node_id` claimed as 10, actually 1), and two enum
  tables billed as "the full enumeration" that both silently omitted
  `INA226`. The PR description cited no source for any of it.
- Anti-pattern: an In-Flight OSD Menu page listed NAV CRUISE as a mode that
  opens the menu because it copied the *introducing firmware PR's own
  description*, which a later commit made stale before merge — the merged
  `cmsIsNavModeActive()` no longer includes it. Comments on the PR and commit
  messages specifically said `NAV CRUISE` had been removed.
  Also shipped a slightly incorrect string.
  Neither would have shipped if the PR description had cited (and the
  author had re-read) the actual merged `.c`/`.h` source.
- Sensei's own mistake, PR #15: it documented an "Auto Alignment Wizard" whose
  mechanism lived entirely in a firmware PR (inav#11708) still marked draft
  and not yet hardware-tested, presenting it as available today. The
  technical detail was accurate against the draft code — the feature
  *would* have been complete and correct once that firmware PR (and any
  dependent Configurator PR) merged. The fix isn't to avoid documenting
  in-flight features; it's that **a docs PR documenting a feature that
  depends on an unmerged firmware or Configurator PR must explicitly name
  that PR (and its merge status) in the docs PR's own description**, so a
  reviewer can tell at a glance whether the dependency has landed yet.

## Tone and Organization

- Second person, active voice, plain language for a pilot — not a developer
  audience. Use exact Configurator/CLI terminology for specific names; avoid
  firmware jargon elsewhere.
- Organize pages around what a pilot is trying to accomplish (set up GPS
  rescue, calibrate a compass), never around how the firmware's source code
  or a PR happens to be structured.
- Don't duplicate content that changes independently elsewhere (release-
  specific settings, version numbers) — link to the one place it's maintained.
- Keep deep implementation detail (algorithms, register-level detail) light
  or in a collapsible section linking to firmware source, so the main page
  stays readable for someone who just wants to fly (see PR #14's collapsible
  geometry sections for the pattern).

## Required Workflow: Sub-Agent Critical Review

Before considering any documentation change finished, invoke a **fresh
sub-agent with no memory of writing the change** — a new, independent
invocation, not a continuation of your own context — to review it critically.
Provide it:

1. The full diff
2. Your drafted PR description (including the source list)
3. This file as the review checklist

It must report on:

1. **Evidence** — is every factual/numeric claim backed by a cited source in
   the PR description? Independently re-read at least one cited source itself
   to confirm it actually supports the claim (don't just check a citation
   exists).
2. **Unsupported why/should claims** — does the page explain *why* something
   works a certain way, or recommend what a pilot *should* do, in a way the
   cited source doesn't actually establish? Source code shows behavior, not
   intent or advice. Flag every such claim, unless it falls under the partial
   exception above (a clear, attributed statement from the feature author,
   Jetrell, or Sensei) — if so, confirm the PR description names who said it.
   Otherwise it must be removed, softened to what the source actually shows,
   or the PR description must explicitly ask a human test pilot to weigh in.
   Passing every other check here does not excuse this one: PR #24's original
   HUD/craft-radar page cited `settings.yaml` correctly for every default and
   still needed a follow-up correction from Jetrell because it read as
   hardware/setup advice ("use the HUD to show other aircraft on a
   multirotor") that no cited source supported.
3. **Staleness** — does any wording look copied from the existing page/wiki
   without independent verification?
4. **Version correctness** — if editing `versioned_docs/`, is this a real
   fix for that release, not a current-dev feature leaking backward? If
   editing `docs/`, is the behavior actually shipped on the branch that tree
   represents? If any cited firmware/Configurator PR is unmerged, does the
   docs PR description say so explicitly?
5. **Tone/organization** — pilot-facing language, organized by user task, no
   unnecessary duplication of volatile facts, and no citations or source
   references left inline in the published page text (see "Where citations
   go" above — they belong in the PR description only)?
6. **Build health** — was `npm run build` actually run, and does the PR say
   so? A clean exit code does **not** mean links/anchors resolve — both
   `onBrokenLinks` and `onBrokenAnchors` are `warn`, not `throw`, and PRs
   aren't built by CI at all. Check the build's own warning output for
   broken-link/anchor lines, or otherwise manually confirm any new or changed
   links and anchors actually resolve.
7. **Completeness and exactness** — for any table claimed as a "full" or
   "complete" enumeration, were the entries actually counted against source
   rather than recalled? For any literal string a pilot will see or search
   for (CLI setting name, OSD message), was it copied character-for-character
   from source, not paraphrased?
8. **AI-disclosure compliance** — if this change was wholly or partially
   written by an AI agent, does the PR description include the required
   attribution statement (see below)?
9. **Update this guidance as needed** - If a type or pattern of good or bad changes
    becomes apparent, update this document with a CONCISE, brief statement of
    what authors should do or avoid in the future to write excellent, accurate,
    easy-to-read documentation.

Fix what the sub-agent flags, or justify in the PR why a flagged item is
fine. Don't skip this for a change that "looks small" — the real corrections
listed above (wrong defaults, wrong tab, renamed settings) all looked small
too.

If documentation was wholly or partially written by an AI-agent, the PR description 
must include the statement:
Assisted by (or Written by) $AI_MODEL using $FRAMEWORK, in accordance with AGENTS.md
For example:
`Written by Sonnet 4.5 using inav-claude, in accordance with AGENTS.md`

