import markdown2
import shutil
import json
import os



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
        new_dict = {
            "title": title,
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
                print("WARNING: " + fle + " already exists in destination folder.")

def add_to_json():
    pass


if __name__ == "__main__":
    html = convert_file_to_html("../markdown/example_markdown.md")
    append_to_json_file("../src/articles/projects.json", "Test Script", "This is just a test of upload capabilities", html)
    copy_over_images("../markdown/images", "../public/images")