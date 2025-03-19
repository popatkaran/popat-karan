---
slug: '/article/github'
date: '2019-05-04'
title: 'GitHub'
category: 'github'
category_key: 'github'
type: 'professional'
image: '../../images/github-mark.png'
order: 6
---

### from local to github

- Create github access token
- Open [Github Tokens](https://github.com/settings/tokens)
- Generate new token - classic
- provide meaningful note / name
- set expiration
- select scopes
- copy github token
- set token as environment variable
  - Linux & Mac: `export GH_TOKEN=<token>`
  - Windows: `$env:GH_TOKEN="<token>""`
- In the command line, navigate to the root directory of your project.
- Initialize the local directory as a Git repository.
  `git init -b main`
- Stage and commit all the files in your project.
  `git add README.md && git commit -m "initial commit with README"`
- To create a repository for your project on GitHub, use the `gh repo create` subcommand.
- Follow the interactive prompts. To add the remote and push the repository, confirm yes when asked to add the remote and push the commits to the current branch.
