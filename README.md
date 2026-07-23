# Portfolio
A personal portfolio site built with [Eleventy](https://www.11ty.dev/). It is reachable at [nuntilus.ch](https://nuntilus.ch).
## Run the project
``` bash
npm run serve
```
## Blog posts
Blog posts are getting fetched from a different [Repository](https://github.com/Nuntilus/blog-posts) they are written in markdown and are converted in html with GitHub actions when pushing something in this repository.
## Deployment
The project is deployed using GitHub actions see [here](.github/workflows/deploy.yml) for the configuration.

The deployment follows the following steps:
- Checking out the repo<Select>
- Removing al existing posts and cloning the [Blog-Post](https://github.com/Nuntilus/blog-posts) repository into the `src/blog/posts` folder
- Installing npm dependencies 
- Building the project
- Getting ssh keys from GitHub action secrets
- Deploy to server using SCP
