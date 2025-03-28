# GoodFirstIssueFinder

A simple web application to discover "good first issues" on GitHub, helping developers start contributing to open-source projects.

## How to Contribute

**We welcome pull requests with enhancements:**

*UI optimizations*
*Search filter expansions*
*Documentation improvements*
*Bug fixes*

## 1. Installation

**Clone the repository:**

```bash
git clone https://github.com/admirhusic/GoodFirstIssueFinder.git  
cd GoodFirstIssueFinder
```
##  2. Install dependencies:

```bash
npm install
```
##  3. Configure environment variables:

```bash

# Create .env from the template  
cp .env.example .env  

# Edit the file to add your GitHub token  
nano .env  # or use any text editor
```
## 🔑 Getting a Token

Go to GitHub  [GitHub Settings → Developer Settings → Tokens](https://github.com/settings/tokens)

Create a token with ```repo``` and ```read:user``` permissions

Replace ```INSERT GITHUB TOKEN HERE``` in ```.env``` with your token

##  4. Run the app:

```bash
npm start
``` 
**Demo**

Check out the live demo of the GoodFirstIssueFinder app [here](https://good-first-issue-finder.vercel.app).

