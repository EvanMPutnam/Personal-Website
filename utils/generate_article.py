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

# TODO: Add a replace/edit mode.

def convert_file_to_html(file_path):
    str_to_read = ""
    with open(file_path) as fle:
        str_to_read = fle.read()
    str_to_write = markdown2.markdown(str_to_read, extras = ["fenced-code-blocks"])
    print(str_to_write)
    return str_to_write


def append_to_json_file(json_file_path, title, summary, html_text, tag = "Articles"):
    with open(json_file_path, "r+") as fle:
        data = json.load(fle)
        date = datetime.datetime.now().strftime(r"%d/%m/%Y")
        new_dict = {
            "title": title,
            "date": date,
            "summary": summary,
            "text": html_text
        }
        data[tag].append(new_dict)
        fle.seek(0)
        json.dump(data, fle, indent=2)
    


def copy_over_images(source_folder, destination_folder):
    for root, dirs, files in os.walk(source_folder):
        for fle in files:
            if not os.path.exists(os.path.join(destination_folder, fle)):
                shutil.copy(os.path.join(source_folder, fle), os.path.join(destination_folder, fle))
            else:
                print("WARNING: Not copying as " + fle + " already exists in destination folder.")

def build_application(base_dir):
    os.chdir(base_dir + "/../")
    os.system("npm run build")

def git_commit_and_push(base_dir, commit_message):
    os.chdir(base_dir + "/../")
    os.system("git add *")
    os.system("git commit -m \"" + commit_message +  "\"")
    os.system("git push")


if __name__ == "__main__":


    # Specify arguments
    parser = argparse.ArgumentParser(description = "Converts markdown to html and pushes new build to site.")
    parser.add_argument("input", help = "Path to markdown file.")
    parser.add_argument("-n", "--name", help = "Name of article.", required = True)
    parser.add_argument("-s", "--summary", help = "Summary of article.", required = True)

    # Parse arguments
    args = parser.parse_args()

    # Convert to HTML and add to json.
    html = convert_file_to_html(args.input)
    append_to_json_file("../src/articles/projects.json", args.name, args.summary, html)

    # Get image path from markdown files
    md_image_path = os.path.dirname(args.input) + "/images"

    # Copy over the images to the folder that includes items.
    copy_over_images(md_image_path, "../public/images")

    # Build the application with NPM!
    base_dir = os.getcwd()
    build_application(base_dir)

    # Commit and push!
    commit_message = "Committing article " + args.name
    git_commit_and_push(base_dir, commit_message)
