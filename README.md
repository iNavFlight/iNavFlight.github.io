# INAV: The New Documentation Project

![INAV](static/img/inav_home_dark.svg)

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/iNavFlight/inav/nightly-build.yml?label=Nightly)
![GitHub Tag](https://img.shields.io/github/v/tag/iNavFlight/inav?label=Release)
![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)


This project is the new and updated documentation built using Docusaurus V3.10. 
The current INAV documentation is scattered about in the Github Wiki and the docs directory of the main project. 
This documentation attempts to consolidate all the knowledge about INAV into a centralized, easy to access and read location.

To build and run the docs locally, install npm on your system and follow the Docusaurus installation instructions. 

- Prepare the environment with `npm run clear` and `rm package-lock.json`.
- Make sure all packages are installed with `npm install`.
- Run the dev server with `npm run start`.

Documentation can be accessed at this URL: https://inavflight.github.io/

## For Contributors

### Versioning Scheme

The website utilizes Docusaurus's versioning feature to keep track of major changes to the firmware.
The current version is the active stable release in `/versioned_docs/version-x.x.x` directory that has been frozen with no further updates. 
Upon the release of the next stable version, it will be created into its own, new directory using `npm run docusaurus docs:version x.y.z`

### Image and Media References
As per the latest Docusaurus file structure, please place new static images in the `/static/img/` directory in an organized fashion. 
When referring to an image in a markdown file, please use absolute paths according to the following markdown syntax: `![Image Info](/img/FolderName/NameOfImage.jpg)`

### Linking to Pages
When linking to local pages, please do not use http urls or absolute paths to link to other markdown documents that are part of the docusaurus site.
For easier maintenance and organization, use relative paths eg: `../quickstart/Name_of_markdown.md`.
Autocomplete on VS Code should find the directories automatically. 
Linking to headings within the document work as well by using `#` following the filename.

## Plugins Used

* Search plugin: https://github.com/easyops-cn/docusaurus-search-local
* Image zoom plugin: https://github.com/gabrielcsapo/docusaurus-plugin-image-zoom

## Contributors Page

There is now a `Contributors.tsx` component that automatically fetches the top 100 most recent contributors and caches that data in `/static/contributors-cache.json` on build.
Contributors are sorted by the last contribution date while preserving total contributions. 
Post build, the list refreshes weekly using a CORS proxy for seamless updates even after the site is built and deployed.

