---
id: link-markdown
title: Linking Markdown to Docusaurus
---

:::important

This thing is written based on only the cursory experimenting I've done so far

:::

## Markdown Files

Basically all Markdown files go in the `docs` folder

Each Markdown file should have at least `id` and `title` YAML headers:
```yaml
---
id: some-id  # seems like the convention is to separate words with hyphens?
title: Some Title
---

...rest of Markdown document...
```

---

## Sidebar Configuration

Add the `id` of the Markdown document to the correct category/make new category in `sidebars.js`

`sidebars.js` should have a general structure like:
```js
module.exports = {
    sidebarName: {
        "Some Category Name": [
            "some-id",
            "another-id",
            ...
        ],
        "Another Category Name": [
            "yet-another-id",
            { // subcategory declaration
                type: 'category',
                label: 'Subcategory Name',
                items: [
                    'subcategory-doc-id',
                    ...
                ]
            }
            "yet-yet-another-id"
            ...
        ]
    }
}
```

---

**Full description of possible headers (more info [here](https://v2.docusaurus.io/docs/markdown-features)):**
- `id`: A unique document id. If this field is not present, the document's `id` will default to its file name (without the extension). *(Please still explicitly include the `id` though! )* 
- `title`: The title of your document. If this field is not present, the document's `title` will default to its `id`. *(Also explicitly include the title too)*
- `hide_title`: Whether to hide the title at the top of the doc. By default it is `false`.
- `sidebar_label`: The text shown in the document sidebar and in the next/previous button for this document. If this field is not present, the document's `sidebar_label` will default to its `title`.
- `custom_edit_url`: The URL for editing this document. If this field is not present, the document's edit URL will fall back to `editUrl` from options fields passed to `docusaurus-plugin-content-docs`.
- `keywords`: Keywords meta tag for the document page, for search engines.
- `description`: The description of your document, which will become the `<meta name="description" content="..."/>` and `<meta property="og:description" content="..."/>` in `<head>`, used by search engines. If this field is not present, it will default to the first line of the contents.
- `image`: Cover or thumbnail image that will be used when displaying the link to your post.

**More information about sidebars [here](https://v2.docusaurus.io/docs/docs).**