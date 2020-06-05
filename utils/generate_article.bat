@echo OFF

REM Specify the file name.
SET FILE_PATH=../markdown/how_its_made_1.md

REM Specify the title
SET ARTICLE_TITLE=How This Website Was Made

REM Specify the summary of the file.
SET ARTICLE_SUMMARY=Want to see how I made this website?  Come on down!


REM Make the call!
python generate_article.py -n "%ARTICLE_TITLE%" -s "%ARTICLE_SUMMARY%" "%FILE_PATH%"
pause