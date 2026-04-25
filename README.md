# GitHub Pages portfolio site

This is a GitHub Pages-ready personal website for Romi Padam.

## What it includes

- Static one-page portfolio site
- No public email address or phone number on the page
- Contact form designed to send messages to a private Gmail inbox through a separate Google Apps Script web app
- GitHub Pages-friendly structure (plain HTML, CSS, and JavaScript)

## Why this setup

GitHub Pages is a static hosting service, so the website itself cannot securely send email on its own. The safe pattern is:

1. Host the website on GitHub Pages
2. Keep your private Gmail address in a separate Google Apps Script project
3. Let the form submit to that private Apps Script endpoint

That keeps your email address out of the site and out of the public repository.

## Files

- `index.html` - site markup
- `assets/styles.css` - styling
- `assets/script.js` - form behavior
- `assets/config.js` - paste your private Apps Script URL here
- `google-apps-script/Code.gs` - template for the private Google Apps Script backend

## GitHub Pages setup

### Option A: User site

Create a repository named:

`YOUR_GITHUB_USERNAME.github.io`

Then upload these files to the root of that repository.

### Option B: Project site

Create any repository name you want, upload these files, then enable GitHub Pages in:

`Settings -> Pages`

Choose the branch and folder you want GitHub Pages to publish.

## Contact form setup with Gmail

### 1) Create a private Apps Script project

- Open Google Apps Script
- Create a new standalone project
- Paste in `google-apps-script/Code.gs`
- Replace `YOUR_PRIVATE_GMAIL_HERE` with your private Gmail address

Keep this project private. Do not commit your real Gmail address into a public GitHub repository.

### 2) Deploy the Apps Script as a web app

- Click `Deploy -> New deployment`
- Select `Web app`
- Execute as: `Me`
- Who has access: `Anyone`
- Deploy and authorize the script
- Copy the Web app URL

### 3) Add the URL to the site

Open `assets/config.js` and paste the Web app URL:

```js
window.CONTACT_ENDPOINT_URL = "YOUR_DEPLOYED_WEB_APP_URL";
```

### 4) Push the website to GitHub

Commit the site files and push them to your GitHub repository.

## Important privacy notes

- The public website does not show an email address or phone number.
- Your private Gmail address should live only in the private Apps Script project.
- Do not store your real Gmail address in the public GitHub repository.

## Optional next improvements

- Add a custom domain
- Add analytics
- Add basic anti-spam protection such as Cloudflare Turnstile or reCAPTCHA
- Add a downloadable resume once you have a version without private contact details
