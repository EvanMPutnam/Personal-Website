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
pause