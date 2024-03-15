## COOKS CORNER

"Cook's Corner" is a cooking blog website designed for food enthusiasts to share and discover recipes.
	      Its primary purpose is to provide a platform where users can publish their favorite recipes and explore culinary creations 

## Features
![1](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/ac40b568-4256-47a2-82f5-3efc1d356c76)

 - Navigation menu allows users to navigate between different sections of the website, including Home, About, Contact, and Submit Recipe.
   
![2](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/1c60dfcf-3d75-4eef-9b14-5b87c1bf5bd3)

 - Users can choose from various food categories such as Mexican, Thai, American, Chinese, and Indian to explore recipes.

![3](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/cd141cec-ca68-4a70-88b6-42ed6087d807)

 - The recipe exploration section allows users to explore recipes within specific categories or view all recipes.

![4](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/b1909e10-cfd1-47c6-9e3f-799ff1185037)

 - Random recipe section provides users with a random recipe each time the page is refreshed, adding an element of surprise and discovery.

![5](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/399fe131-2822-4822-a471-728c9a5bd155)

 - Highlights selected categories on the landing page to showcase popular or trending recipes.

![6 1](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/14cbbd96-c9ef-42b8-abd8-5a2bd6449b6b)

![6 2](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/8c45df9d-8dca-439f-9674-8882704c34a0)

 - Allows users to submit their own recipes by filling out a form with details such as recipe name, email, description, ingredients, and category, including an option to upload an image.

![7](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/102f02b8-6e5e-4f9f-9144-cdd55e3d2c48)

 - Users can search for specific recipes using a search bar, enhancing the user experience and accessibility.

![8](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/535897a4-0c0c-4e55-a9d7-eaa28d48c813)

 - Upon successful submission of a recipe, users are provided with a confirmation message.
![9](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/2725326f-eb38-4c9c-8ee8-2ccfe9553742)

 - Latest recipes section displays the most recently submitted recipes, with newly submitted recipes appearing at the top.

![10](https://github.com/Patilmrashmi/Cooks-Corner/assets/126162500/fa21b812-3e65-4436-94e6-49a464100d3d)

 - Update and Delete Functionality although not implemented as visible buttons, the website includes functionality for updating and deleting recipes, allowing users to manage their submissions over time through backend methods.
 
## Create .env file

Create a .env file to store your MongoDB database credentials
 ```
 MONGODB_URI = mongodb+srv://<username>:<password>@cluster0.6m5cz.mongodb.net/Recipes?retryWrites=true&w=majority
 ```

# Installation

```
$ npm install
```
```
npm init -y
```
```
npm
 i connect-flash cookie-parser dotenv ejs express express-ejs-layouts express-fileupload express-session mongodb mongoose
```
```
code .
```
```
npm i nodemon --save-dev
```

after running the above command go to package.json and include this in scripts
"start": "nodemon app.js" 

```
npm start
```

[Reference](https://youtu.be/OEdPH4fV7vY?si=foiS2itWXeIdJLb8)

