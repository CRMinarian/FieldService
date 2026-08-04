# LinkedIn | Seven Ways the Power Platform CLI Lies to You (blog launch)

- **Post:** ✅ SCHEDULED on LinkedIn (Pierre, 2026-08-03)
- **Links to:** https://fieldservicenerd.com/blog/power-platform-cli-lies (LIVE)
- **Voice check:** 0 errors, 0 style breaks (1 warning = "Dynamics365" hashtag false positive)
- **⚠️ TAG NICK DOELMAN** on his name when pasting (type @Nick Doelman, pick him) | the model
  is his, and his Power Platform network is exactly this post's reader.
- Optional reach play: put the blog link in the FIRST COMMENT instead of the body (LinkedIn
  demotes external links in-body; comment-link usually reaches further).

---

## Post copy (paste)

The Power Platform CLI lied to me seven times.  In one afternoon.

Not "the docs were unclear" lied.  Confident, false error messages.  One of them nearly got a healthy environment deleted.

I was standing up an agentic Power Platform pipeline.  Claude Code, the Dataverse MCP server, PAC CLI.  The model comes from Nick Doelman's piece "Ditch the Power Apps Maker Portal."  He is right.  This is the way.

A taste:

"Failed to install" | the install was still running.  PAC just stopped watching at 60 minutes.

"DotnetToolSettings.xml was not found in the package" | the package is fine.  Your SDK is too old.

pac solution list reported 3 solutions.  FetchXML reported hundreds.  Same environment, same auth, same moment.

Here is why this matters more than it used to.  When a human reads a bad error message, it costs an hour.  When an AI agent reads one, it becomes a wrong conclusion, written into a document, acted on with confidence.  The fix is the discipline of testing instead of inferring.

All seven lies, with fixes and a working public repo, are on the blog:
https://fieldservicenerd.com/blog/power-platform-cli-lies

Which CLI has lied to you the most?  Tell me below.  I read everything.

#PowerPlatform #Dynamics365 #AgenticAI
