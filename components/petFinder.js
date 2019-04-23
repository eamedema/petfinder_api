function PetfinderFeed(PetFinderService, $q) {
  // have to add $q to use promises 

    const ctrl = this;
    
    // load on initial page load

    ctrl.$onInit = function() {
      ctrl.feed = [];
      ctrl.getData();
    };

    



    ctrl.getData = () => {

      return $q(function(resolve, reject) {
        PetFinderService.getData()
          .then( (response) => {

            ctrl.feed = response;
            ctrl.arrayToLoad = [];

            console.log(ctrl.feed);
            
            response.data.animals.forEach( (child) => {

              console.log(response.data.animals.name);
              //create an object of the current post
              let childObj = {
                title: postTitle,
                thumbnail: child.data.thumbnail,
                permalink: realPermalink,
                postDate: dateString
              }

              // add post information to array to be parsed later
              ctrl.arrayToLoad.push(childObj);
                
            });
            resolve();
          })
          .catch( function(error) {
            console.error(error);
            throw error;
          });

      });

        
    }
  }
  
  angular.module('MyApp').component('petFinder', {
    template: `
    <h1>Petfinder</h1>
   `, // or use templateUrl
    controller: PetfinderFeed,
});