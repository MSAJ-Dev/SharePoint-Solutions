# Project intake demo

A standalone browser demo of a SharePoint-style project request queue. Open [index.html](index.html) locally. Add a request, change its status, and use the status filter. Reload the page to check persistence in browsers that permit local storage for local files.

## Map the demo to SharePoint

| Demo field | Suggested SharePoint list column |
| --- | --- |
| Project name | Title |
| Request owner | Person or Group |
| Status | Choice with Submitted, In review, and Approved |

An SPFx implementation could use the web part context and `SPHttpClient` to read and update list items under the signed-in user's permissions. The demo uses sample data and browser storage. It does not connect to a tenant or enforce reviewer permissions.
