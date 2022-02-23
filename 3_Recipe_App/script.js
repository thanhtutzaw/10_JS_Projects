const meals = document.getElementById('meals');
const favContainer = document.getElementById('fav-meal');
const mealImage = document.getElementById('meal-image');
const heartBtn = document.getElementById('heart-btn');

const favImage = document.getElementById('fav-image');
const favSpan = document.getElementById('fav-span');

// const heartBtn = document.getElementById('heart-btn');
const mealName = document.getElementById('meal-name');
const mealBody =document.getElementById('meal-body');
fetchFav();
getRandom();
async function getRandom (){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    // console.log(randomMeal);

    addMeal(randomMeal , true); //randomMeal is mealData
}

async function getMeal(id){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);

    const respData = await resp.json();
    const meal =  respData.meals[0];
    // console.log(meal.typeof())
    // const sortedMeal = meal.sort((a, b) => (a.color > b.color) ? 1 : -1);
    return meal;
}

async function searchMeal(term){
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
}

function addMeal (mealData , random = false){
    // const meal = document.createElement('div');
    // meal.classList.add('meal');
    // console.log(mealData)
    mealImage.src= mealData.strMealThumb; 
    mealImage.alt = mealData.strMeal;
    

    const mealBodyChild = document.createElement('div');
    mealBodyChild.classList.add('d');
    mealBody.innerHTML = 
    `
    <h4 id="meal-name">${mealData.strMeal}</h4>
    <button><i id="heart-btn" class="fas fa-heart"></i></button>
    `;
const heartBtn = document.getElementById('heart-btn');
    
    heartBtn.addEventListener('click', ()=>{
        if(heartBtn.classList.contains('active')){
            removeMealLS(mealData.idMeal);
            heartBtn.classList.remove('active');
        }
        else{
            addMealLS(mealData.idMeal);
            heartBtn.classList.add('active');
        }
        
        fetchFav();
    });
    // meals.appendChild(meal);
    
    
}


function addMealLS(mealId){ // mealId from mealData.idMeal
    const mealIds = getMealsLS();

    localStorage.setItem(
        'mealIds', JSON.stringify( [...mealIds, mealId])
    );
    
}

function removeMealLS(mealId){
    const mealIds = getMealsLS();
    localStorage.setItem(
        'mealIds', JSON.stringify(mealIds.filter( (id) => id !== mealId) )
    );

    // localStorage.removeItem(
    //     'mealIds', JSON.stringify( [...mealIds, mealId])
    // )
}

function getMealsLS(){
    
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds ;
}


async function fetchFav(){
    //clean 
    favContainer.innerHTML = '';

    const mealIds = getMealsLS();
    const meals = [];
    for(let i=0; i<mealIds.length; i++){
        const mealId = mealIds[i];

        const meal = await getMeal(mealId);
        // meal = meal.sort( (a,b) => (a>b)?1:-1);
        meals.push(meal)
        // .sort( (a,b) => (a>b)?1:-1)
        ;

        addFav(meal);
    }

}


function addFav(mealData){
    // favImage.src=mealData.strMealThumb;
    // favImage.alt=mealData.strMeal;
    // favSpan.innerText=mealData.strMeal;
    const favMeal =document.createElement('li');

    favMeal.innerHTML = 
    `
                        <img loading="lazy" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                        <span>${mealData.strMeal}</span>
                        <button id="clearBtn" class="fas fa-times"></button>
                    
    `;
    const clearBtn = favMeal.querySelector('#clearBtn');

    clearBtn.addEventListener('click', ()=>{
        removeMealLS(mealData.idMeal);
        fetchFav();
    });
    favContainer.appendChild(favMeal);

    // function deleteFav(mealData){
    //     removeMealLS(mealData.idMeal);
    //     fetchFav();
        
    // }
}