# redPoints

STEP 1: CHANGE the API_KEY, ACCOUNT_ID and redirect url (line : 15) in case you use different port, mine is

http://localhost:3000

/src/shared/AxiosConfig/EndPoints.js







Features: 

  1: Authentication.
  
  2:search by title, sorting.
  
  3: you can save the movie as favorite which will be added to https://www.themoviedb.org/u/passedByMe/favorites.
  
  4: remove them.
  
  5: modal containeng favorite movies.
  
  6: Pagination.
  
  
  7: after comming back from some movie's page to home page, parameters you set before 'filtered movies by tiitle, some sort       parameter, page where you was' will be set back.
  
  8: Layouts for mobile and desktop.
  
  It would be nice to have 'isFavorite' property in 'movie' object. Since it's not there, i have to get the list of favorite movies first, then get the list of 'popular/filtered by title' movies so i can attach 'favorite icon' to them.
