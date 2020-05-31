# Website

This is a personal, completely static, website that I plan to use to showcase items I am working on.
It is very simplistic and was built with REACT and some simple W3 templates.

## Purpose of Website:
Previously I had a weebly site but wanted to create something of my own.  However, there were a few things that I would absolutely need for this to work for my use case.  Firstly, I wanted a  website that was not going to have any server side code to maintain and would be up close to 100% of the time.  No SQL database to setup, endpoints to manage, ajax, etc.  Then since most of my document writing these days is in markdown I wanted the ability to have markdown support on that website.  Lastly, I wanted the ability to blog with frequent content but not pay anything yearly (Or if I used a free version, a watermark).

### Markdown:
For the markdown support I decided to go with a python module that takes my markdown and converts it to HTML.
The Python-Markdown2 library has support for almost every markdown feature and I am able to easily generate my HTML content.

### Workflow to Deploy a Change:
In the utils folder there is a python file that allows me to generate new articles from my existing markdown templates.  They are then put into the articles.json object file which is read in to the website.  The only thing I need to ever do is write my markdown,  convert it with that python file, and then kick off a script to recompile a few static files (Most of the time it would just be updating the JSON) and push to github, where the site would be hosted.

With this the site is "completely static" and most all processing is done on the client side.


# Original README.md
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The following are helpful snippits from that README.md



## `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.