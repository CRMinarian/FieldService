---
title: Six Ways the Power Platform CLI Lies to You
slug: power-platform-cli-lies
date: 2026-08-04
tag: Agentic Ops
status: draft
description: I stood up an agentic Power Platform environment in an afternoon.  The PAC CLI told me six false things with total confidence.  Here they are, in the order they bit me.
---

I spent an afternoon standing up an agentic Power Platform environment.  Claude Code, the
Dataverse MCP server, PAC CLI, the whole chat to code to deploy loop that everyone is suddenly
building.

Props where props are due.  [Nick Doelman](https://readyxrm.blog/) pointed me to "the way," as
he calls it, and this model is his.  He is right.  This is the path most solution architects are taking.  I chose a combination of Claude
and Grok to build the pipeline out, and it took a full afternoon, several hours of getting
everything laid in.  Once it is done, it is pretty amazing.

What follows are the areas I found extremely frustrating, and a few that are genuinely
powerful, starting with the frustrating ones.

The CLI lied to me six times.  Not "the docs were unclear" lied.  Actually told me false things,
in error messages, with confidence.

Every one of these cost me time.  A couple nearly cost me an environment.  Here they are, in the
order they bit me.

---

## Lie 1 | winget hands you a fossil

You want PAC CLI.  You do the obvious thing.

```powershell
winget install Microsoft.PowerAppsCLI
```

Congratulations.  You just installed **version 1.0**.

The current PAC CLI is 2.10.1.  The winget manifest points at an MSI that has not moved in
years.  Nothing warns you.  It installs cleanly, `pac` resolves, and you spend the next hour
wondering why half the verbs in the docs do not exist.

**What to do instead:**

```powershell
dotnet tool install --global Microsoft.PowerApps.CLI.Tool
```

That is the real distribution channel.  Which brings us directly to lie number two.

---

## Lie 2 | "DotnetToolSettings.xml was not found in the package"

You run the correct install command and get this:

```
The settings file in the tool's NuGet package is invalid:
Settings file 'DotnetToolSettings.xml' was not found in the package.
Tool 'microsoft.powerapps.cli.tool' failed to install.
Contact the tool author for assistance.
```

"Contact the tool author."  Cool.  So the package is broken, right?

The package is fine.  I unzipped it to be sure.  A `.nupkg` is just a zip, so you can check this
yourself in about ten seconds.  `DotnetToolSettings.xml` is sitting right there, under:

```
tools/net10.0/any/
```

**PAC CLI targets net10.0.**  If you only have the .NET 8 SDK, dotnet goes looking in
`tools/net8.0/`, finds nothing, and blames the package instead of telling you the truth, which
is that your SDK is too old.

**Fix:**

```powershell
winget install --id Microsoft.DotNet.SDK.10 --exact
dotnet tool install --global Microsoft.PowerApps.CLI.Tool
```

I lost a good chunk of time on this one because the error points you at the package author.  It
should say "no compatible target framework."  It does not.

---

## Lie 3 | a path to a file that does not exist

PAC ships its own MCP server now, which is genuinely great for agentic work.  You ask where it
lives:

```powershell
pac copilot mcp
```

It tells you:

```
Local MCP server location: C:\Users\you\.dotnet\tools\.store\...\pac-mcp.exe
```

That file does not exist.

What exists is `pac-mcp.dll`.  It is a framework dependent assembly, so you launch it with
`dotnet`, not directly.  The CLI prints a path to an executable that was never in the package.

**What actually works:**

```powershell
claude mcp add powerplatform -- dotnet "C:\Users\you\.dotnet\tools\.store\microsoft.powerapps.cli.tool\2.10.1\microsoft.powerapps.cli.tool\2.10.1\tools\net10.0\any\pac-mcp.dll"
```

While you are in there, note that path has the version number baked in twice.  **Upgrading PAC
silently breaks your MCP server.**  Re run `claude mcp add` after every `dotnet tool update` or
you will spend an evening wondering why your agent lost its hands.

---

## Lie 4 | reporting failure on success

This is my favourite one, because it is so confidently wrong.

```powershell
pac admin create --name "My Env" --type Developer
```

Output:

```
Creating Developer Dataverse database in your tenant.
...
Polling completed with status code : OK
Error: There is an error parsing the data. Property 'linkedEnvironmentMetadata' is missing.
```

Read that again.  **Polling completed OK.  Then an error.**

The environment was created.  It exists.  It is healthy.  PAC just could not parse the response
it got back and decided that meant the operation failed.

If you trust the error and run the command again, you get a second environment.  If you trust
the error and go delete things, you are deleting a working environment for no reason.

**Always confirm before you react:**

```powershell
pac env list
```

---

## Lie 5 | "Is Disabled" does not mean what you think

You want to know whether you can install Field Service.  Reasonable question.

```powershell
pac admin list-app-templates --region unitedstates
```

```
Template Name       Display Name     Is Disabled
D365_FieldService   Field Service    True
```

Disabled.  Clear enough.  No Field Service for you, go buy licenses.

I believed this.  I wrote it down.  I told my client it was a licensing problem.

Then Field Service installed fine.

**These two commands gate on completely different things:**

| Command | What it actually governs |
|---|---|
| `pac admin list-app-templates` | Templates offered at environment **creation** time, for the `--templates` flag |
| `pac application install` | Installing into an **existing** environment |

An app can be unavailable as a creation time template and still install perfectly well
afterwards.  The column is named `Is Disabled` with no scope on it whatsoever, and it will
absolutely convince you that you have a licensing problem you do not have.

Do not diagnose entitlement from this table.  Attempt the install and read the error.

---

## Lie 6 | the one that nearly cost me an environment

This is the worst, and it is not even an error message.  It is silence.

Fresh Sandbox, created with Dynamics 365 apps enabled.  I check what is in it:

```powershell
pac solution list
```

```
Crf44fc                       Common Data Services Default Solution
Default                       Default Solution
DynamicsMKT_SendOptimization  Dynamics Marketing Send Optimization
```

Three solutions.  No Sales.  No Customer Service.  No `msdyn_` anything.

A Dynamics 365 enabled environment has **hundreds** of solutions.  Three means Dataverse only.
And per Microsoft Learn, `Enable Dynamics 365 apps` cannot be changed after provisioning.  So
this environment is permanently useless and has to be deleted and rebuilt.

That is what I was about to say.  Out loud.  To the person who had just built it.

Instead I ran the install I actually wanted, as a test.  It worked.  Sales deployed without
complaint.

**First party apps deploy asynchronously and `pac solution list` lags badly behind.**  Learn
says Sales and Customer Service auto install when you enable D365 apps.  True eventually.  Not
true immediately, and nothing tells you which state you are in.

A correctly configured environment and a permanently broken one look **identical** for the first
stretch of their life.

The only reliable test is to attempt an install and read what comes back:

| Error | What it means |
|---|---|
| `Application successfully installed` | Environment takes D365 apps |
| `Installing ... on CDS instance is not supported` | Genuinely Dataverse only |
| `Package requested for installation was not found` | You typed the app name wrong.  Says nothing about the environment |

That third one is a bonus lie, by the way.  It reads like a capability problem.  It is a typo.
Get exact names from `pac application list --environment <id>` instead of guessing.

---

## Why this matters more than it used to

When a human runs a CLI, a bad error message costs an hour of confusion.

When an **agent** runs the CLI, a bad error message becomes a wrong conclusion, written into a
document, acted on with confidence.  I watched it happen in real time.  My agent read
`Is Disabled = True` and correctly concluded "licensing problem."  Correct reasoning.  Garbage
input.

The fix is not smarter agents.  The fix is the discipline of testing instead of inferring.
Every one of these six lies collapses the moment you run the actual operation and read the
actual result.  Every one of them survives indefinitely if you read a status field and reason
from it.

If you are building an agentic Power Platform pipeline right now, and a lot of us are, write
your gotchas file as you go.  Mine has nine entries after one afternoon.

The CLI is still the right tool.  It just is not a reliable narrator.

---

*Pierre Hulsebus builds AI powered business solutions at NukaSoft.AI.  Currently standing up an
agentic Dynamics 365 pipeline and writing down everything that breaks.*
