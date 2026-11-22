# SharePoint Framework Samples

Seven TypeScript samples for extending SharePoint Online with SPFx 1.18.2. The collection covers configurable web parts, SharePoint REST calls from a React web part, page placeholders, list forms, and field rendering.

## Try the project intake demo

[Project Intake](demo/project-intake/) is an interactive request queue with sample data, status filtering, and browser-local persistence. Open `demo/project-intake/index.html` locally to try the workflow without a SharePoint tenant. The demo README maps the fields to a SharePoint list for a future SPFx implementation.

## Start with these samples

| Sample | What to review |
| --- | --- |
| [React web part](react-web/) | The React component and service layer. The service uses the web part context and `SPHttpClient` to call SharePoint REST. |
| [Configurable web part](firstwebpart/) | The property pane wires text fields, a slider, a checkbox, and a dropdown to web part properties. |
| [Application Customizer](app-extension/) | The extension listens for placeholder changes and renders into the top and bottom placeholders when available. |
| [Form Customizer](extension/) | The form lifecycle and the save and close handlers that connect custom UI to SharePoint. |
| [Field Customizer](field-extension/) | The cell-rendering and disposal hooks for a custom list field. |
| [Profile web part](project/) | A standalone profile web part with its own project configuration. |
| [jQuery web part](jq/) | A separate example of integrating jQuery into an SPFx web part. |

## Build locally

Each sample has its own package manifest and lockfile. For these SPFx 1.18.2 samples, the manifests declare Node.js 16.13+ within 16.x or 18.17.1+ within 18.x. Run the commands from the sample directory.

```bash
cd react-web
npm ci
npm run build
```

## Validate in SharePoint Online

Use a development site and review the selected sample's `config/serve.json` before starting a tenant test. Use a modern page for the web parts and Application Customizer. For the Form Customizer, use a test list with the appropriate form configuration. For the Field Customizer, add the configured field to a test list view.

- **React web part:** Verify the REST result with a user who has access to the target site and list. Inspect the network response when diagnosing failures.
- **Configurable web part:** Change properties in edit mode, publish the page, and reopen it to check persistence and rendering.
- **Application Customizer:** Check the page when a placeholder is unavailable and after navigating between modern pages.
- **Form and Field Customizers:** Confirm that the intended form or field is targeted, then exercise rendering and cleanup as you open, close, or navigate away.

These are standalone samples. Before adapting one for a tenant rollout, review its permissions, configuration, and error handling in your target environment.
