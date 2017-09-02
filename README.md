# README

## OVERVIEW:
Have you taken a recent trip around your neighborhood? Will you be able to make a tour and show us any good food spot, things to do or take us somewhere that only someone from the neighborhood might know? If not, that's okay I dont know either. I am recent to the my current neighborhood. 
The following project will show a listing of different places I frequent most in my neighborhood. 

## CONTEXT:
When project is downloaded following will be included:

1. neighborhood-map(folder)
    1. index.html
    2. js(folder)
        1. even.js
        2. script.js
    3. css(folder)
        1. style.css
    4. node_modules(folder)
        1. bootstrap(folder)
        2. jquery(folder)

2. README.md

## Requirements:
1. Web Browser of choice 
2. Program that allows to unzip a file (WINDOWS only)

##Downloads
To download file to run web application
    * https://github.com/jfinest/neighborhood-map.git
1. If you have access to github simply run
    * https://github.com/jfinest/neighborhood-map.git
2. If you dont have git installed then simply click on the **clone or download** button, to download the web applications files.

# How to Run Program Once Download Complete
    A. Unzip folder
    B. Locate unzipped folder and open
    C. 2 options to open project in a browser
        1. Right click on index3.html and click 'open with': Now open with the browser of your choice
        2. Open browser of your choice
            1. Click File on top
            2. Click Open
            3. browse until neighborhood-map folder is located
            4. Select index3.html

#Make your own Neighborhood Map
Want to have fun or share your neighborhood map with others.
1. Open the script.js file located in the js folder.
2. Open it with your text editor of choice (Sublime, TextWranger, etc.)
3. Locate the following line:
    var locations = [
4. Now this is called an Array of the locations I wanted to show. You just have to simply change the title, locations and id to the values of the locations you would like to show.
5. You can get the lat, lng and id from the following link: (Enter address of location)
    * https://google-developers.appspot.com/maps/documentation/utils/geocoder/
6. Copy lat, lng & id from result window and paste it into the script.js
7. Also, dont forget to change title. 
8. Save the newly updated file and simply reopen index3.html or refresh your web broswer.


## Source that helped with code for this project
1. NYT API from udacity lessons
2. Google APIs from udacity lessons
3. used stackflow to get general idea on how to use .toUppercase(), .filter()
4. Used some bootstrap for styling some css like lis.
5. Knockout documentation from * http://knockoutjs.com/documentation/event-binding.html
6. Also, * https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282. Helped with calling google map asynchronously.
 

