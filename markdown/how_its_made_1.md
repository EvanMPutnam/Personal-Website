At its core this website is just a React website with a number of configured components.
This is not meant to be a summary of how react works, or an introduction to coding but is here for those interested.

# Technology:
* React for generating UI elements (Really the backbone of the whole operation).
* Python for some utility files
* Markdown files for articles

# Blogging:
The big thing about the website is the blogging capability.  There is no server side code and relies on re-compiling the website with npm and pushes the build via git.  The blog items are just really React components with text being read in from a json file.  That master json file has a few tags that are populated.  The code for it is pretty simple.
Note that the syntax highlighting for React is a little weird.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const MAX_ARTICLES_PER_PAGE = 5

const loadedArticles = require("./articles/projects.json")

var articleCount = 0;

class Article extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div className="Article article_block">
                <div className="w3-card-4 w3-margin w3-white">
                    <div className="w3-container">
                        <h3><b>{this.props.article['title']}</b></h3>
                        <h5><span className="w3-opacity">{this.props.article['date']}</span></h5>
                    </div>
                    <div className="w3-container">
                        <div dangerouslySetInnerHTML={ {__html: this.props.article['text']} }></div>
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                            <p><button className="w3-button w3-padding-large w3-white w3-border" onClick={this.handleClick}><b>« BACK</b></button></p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }

    handleClick() {
        ReactDOM.render(
            <RelevantArticleContainer />,
            document.getElementById('articlePosts')
        );
        window.scroll(0, 0)
        
    }
}

class ArticleSummarySection extends React.Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
    }
    
    render() {
        return (
            <div className="Article-Summary">
                <div className="w3-card-4 w3-margin w3-white">
                    <div className="w3-container">
                        <h3><b>{this.props.article['title']}</b></h3>
                        <h5><span className="w3-opacity">{this.props.article['date']}</span></h5>
                    </div>
                    <div className="w3-container">
                        <p>{this.props.article['summary']}</p>
                        <div className="w3-row">
                            <div className="w3-col m8 s12">
                            <p><button className="w3-button w3-padding-large w3-white w3-border" onClick={this.handleClick}><b>READ MORE »</b></button></p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }

    handleClick() {
        const properties = this.props.article;
        ReactDOM.render(
            <Article article={properties} />,
            document.getElementById('articlePosts')
        );
        window.scroll(0, 0)
    }
}

class RelevantArticleContainer extends React.Component {
    render() {
        var listItems = loadedArticles["Articles"].map((article) =>
            <ArticleSummarySection article={article} key={article.title}/>
        );
        listItems.reverse();

        if ((MAX_ARTICLES_PER_PAGE * articleCount) >= listItems.length) {
            articleCount -= 1
        } 
        const elemsLeft = listItems.length - (MAX_ARTICLES_PER_PAGE * articleCount)
        const startingIndex = MAX_ARTICLES_PER_PAGE * articleCount

        if ( elemsLeft > MAX_ARTICLES_PER_PAGE ) {
            listItems = listItems.slice(startingIndex, startingIndex + MAX_ARTICLES_PER_PAGE)
        } else {
            listItems = listItems.slice(startingIndex, startingIndex + elemsLeft)
        }

        return (
            <div className="Article-Summary-Container">
                {listItems}
                <button className="w3-button w3-padding-large w3-white w3-border" onClick={this.handleBackward}><b>« PREV</b></button>
                <button className="w3-button w3-padding-large w3-white w3-border" onClick={this.handleForward}><b>NEXT »</b></button>
            </div>
        );
    };

    handleForward () {
        articleCount += 1
        ReactDOM.render(
            <RelevantArticleContainer />,
            document.getElementById('articlePosts')
        );
    }

    handleBackward () {
        if ( articleCount > 0 ) {
            articleCount -= 1
        }
        ReactDOM.render(
            <RelevantArticleContainer />,
            document.getElementById('articlePosts')
        );
    }
}


class PopularPost extends React.Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render () {
        return (
            <div className="Popular-Post">
                <button className="popular_button" onClick={this.handleClick}>
                    <ul className="w3-ul w3-hoverable w3-white">
                        <li className="w3-padding-16">
                            <span className="w3-large">{this.props.article.title}</span><br/>
                            <span>{this.props.article.date}</span>
                        </li>
                    </ul>
                </button>
            </div>
        );
    }

    handleClick () {
        const properties = this.props.article;
        ReactDOM.render(
            <Article article={properties} />,
            document.getElementById('articlePosts')
        );
        window.scroll(0, 0)
    }
}

class PopularPosts extends React.Component {
    render () {
        var listItems = loadedArticles["Articles"].map((article) =>
            <ArticleSummarySection article={article} key={article.title}/>
        );
        listItems.reverse();

        return (
            <div className="Popular-Posts">
                <PopularPost  article={listItems[0].props.article} />
                <PopularPost  article={listItems[1].props.article} />
            </div>
        );
    }
}




articleCount = 0;
ReactDOM.render(
    <RelevantArticleContainer />,
    document.getElementById('articlePosts')
);

ReactDOM.render(
    <PopularPosts />,
    document.getElementById('popularPosts')
);


```

There is also some logic in here to completely handle the max number of items on a given page.  It just works by picking a few items
depending on the page index the user is on.


## Python:
For actually writing the posts I just use markdown.  Its super simple and is easily converted to html using libraries found online.  To convert the files and add them to the json list I made a quick python utility file that does the following:

1. Converts the input markdown file to html and adds an entry to the json object.
2. Moves any new images in the images folder over to the src folder.
3. Rebuilds the application with the new images and json file.
4. Pushes off to github with a commit message detailing article name.

For those interested it looks like this:

```python
import markdown2
import argparse
import datetime
import shutil
import json
import os

'''
1. Converts the input markdown file to html and adds an entry to the json object.
2. Moves any new images in the images folder over to the src folder.
3. Rebuilds the application with the new images and json file.
4. Pushes off to github with a commit message detailing article name.
'''

# ###########################################################
# Description:      Converts a markdown file to html and
#                   returns it as a string.
# ###########################################################
def convert_file_to_html(file_path):
    str_to_read = ""
    with open(file_path) as fle:
        str_to_read = fle.read()
    str_to_write = markdown2.markdown(str_to_read, extras = ["fenced-code-blocks"])
    print(str_to_write)
    return str_to_write

# ###########################################################
# Description:      Manipulates the .json file that acts
#                   as the database.
# ###########################################################
def alter_json_file(json_file_path, title, summary, html_text, replace = False, tag = "Articles"):

    with open(json_file_path, "r+") as fle:
        # Load our magic json file
        data = json.load(fle)

        # If we are editing/replacing our information then do this.
        if replace:
            found = False

            # Just do a simple linear search.  Never going to get to the point where this is an issue.
            for i in range(0, len(data[tag])):
                if data[tag][i]['title'] == title:
                    found = True
                    data[tag][i]['summary'] = summary
                    data[tag][i]['text'] = html_text

            # Raise a simple exception if you try to replace a json title that does not exist.
            if not found:
                raise Exception("Trying to replace with a title that does not exist.")

        # Otherwise just write a new entry to the data dictionary, push out to file.
        else:
            date = datetime.datetime.now().strftime(r"%m/%d/%Y")
            new_dict = {
                "title": title,
                "date": date,
                "summary": summary,
                "text": html_text
            }
            data[tag].append(new_dict)
        
        # Write on out!
        fle.seek(0)
        json.dump(data, fle, indent=2)
        
# ###########################################################
# Description:      Super primative function that copies all
#                   files over from the image folder in the 
#                   specified markdown directory.
# ###########################################################
def copy_over_images(source_folder, destination_folder):
    for root, dirs, files in os.walk(source_folder):
        for fle in files:
            if not os.path.exists(os.path.join(destination_folder, fle)):
                shutil.copy(os.path.join(source_folder, fle), os.path.join(destination_folder, fle))
            else:
                print("WARNING: Not copying as " + fle + " already exists in destination folder.")

# ###########################################################
# Description:      Builds the application with NPM.
# ###########################################################
def build_application(base_dir):
    os.chdir(base_dir + "/../")
    os.system("npm run build")

# ###########################################################
# Description:      Does all the git needed to push it off.
# ###########################################################
def git_commit_and_push(base_dir, commit_message):
    os.chdir(base_dir + "/../")
    os.system("git add *")
    os.system("git commit -m \"" + commit_message +  "\"")
    os.system("git push")

# ###########################################################
# Description:      Helper function for boolean values in
#                   arguments.
# ###########################################################
def _bool_argument(val):
    if isinstance(val, bool):
        return val
    elif val.lower() in ['true', "t", 'yes']:
        return True
    elif val.lower() in ['false', 'f', 'no']:
        return False
    else:
        raise argparse.ArgumentTypeError("This field expects a boolean.")




if __name__ == "__main__":

    # Specify arguments
    parser = argparse.ArgumentParser(description = "Converts markdown to html and pushes new build to site.")
    parser.add_argument("input", help = "Path to markdown file.")
    parser.add_argument("-n", "--name", help = "Name of article.", required = True)
    parser.add_argument("-s", "--summary", help = "Summary of article.", required = True)
    parser.add_argument('-u', "--update_only", type = _bool_argument, help = "If we only want to build.", default = False)
    parser.add_argument("-r", "--replace", type = _bool_argument, help = "Replace article information.", default = False)

    # Parse arguments
    args = parser.parse_args()

    # Convert to HTML and add to json.
    html = convert_file_to_html(args.input)
    alter_json_file("../src/articles/projects.json", args.name, args.summary, html, replace = args.replace)

    # Get image path from markdown files
    md_image_path = os.path.dirname(args.input) + "/images"

    # Copy over the images to the folder that includes items.
    copy_over_images(md_image_path, "../public/images")


    if args.update_only == False:
        # Build the application with NPM!
        base_dir = os.getcwd()
        build_application(base_dir)

        # Commit and push!
        commit_message = "Committing article " + args.name
        git_commit_and_push(base_dir, commit_message)
```

The script itself is pretty straighforward.  It relies on there being some arbitrary markdown folder, with an images folder inside of it.  The user can upload new articles, change existing ones, and its as simple as changing the arguments.  I have also included a .bat file for Windows computers that can just change the variables.

```
@echo OFF

REM Specify the file name.
SET FILE_PATH=../markdown/how_its_made_1.md

REM Specify the title
SET ARTICLE_TITLE=How This Website Was Made

REM Specify the summary of the file.
SET ARTICLE_SUMMARY=Want to see how I made this website?  Come on down!

REM If you only want to update the .json file
SET UPDATE_ONLY=True

REM If you want to replace in the json file instead of writing a new article every time (Basically edit mode)
SET REPLACE_IN_JSON=True

REM Make the call!
python generate_article.py -n "%ARTICLE_TITLE%" -s "%ARTICLE_SUMMARY%" -u "%UPDATE_ONLY%" -r "%REPLACE_IN_JSON%" "%FILE_PATH%"

REM Does not close out so that we can tell if anything crashed.
pause
```


# Code Highlighting:
The markdown2 plugin has the ability to generate html code with highlight rules (The python library Pygments must be installed via pip).
Then all you need to do is generate the .css file you want for your styling and customize the css classes.

Click [this link](https://github.com/trentm/python-markdown2/wiki/fenced-code-blocks) if you want to see how its done.

