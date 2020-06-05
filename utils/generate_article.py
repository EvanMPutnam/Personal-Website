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
