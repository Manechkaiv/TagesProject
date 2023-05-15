function loadJSON(path, success, error) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        success(JSON.parse(request.responseText));
      }
      else {
        error(request);
      }
    }
  };
  request.open('GET', path, true);
  request.send();
}

loadJSON("https://jsonplaceholder.typicode.com/users", printUsers, 'jsonp');

function printUsers(users) {
  loadJSON("https://jsonplaceholder.typicode.com/posts", addPostsToUsers, 'jsonp');
  
  function addPostsToUsers(posts) {
    let arrayOfUsers = [];

    for (let i = 0; i <= 9; i++) {
      const user = users[i];
      const userPosts = [];
      const filteredPostsByUser = posts.filter(post => post.userId === user.id);
      const countOfPosts = filteredPostsByUser.length;

      for (j = 0; j < countOfPosts ; j++) {
        const post = filteredPostsByUser[j];
        userPosts.push({
          id: post.id, 
          title: post.title, 
          title_crop: post.title.length > 20 ? `${post.title.slice(0, 20)}...` : post.title, 
          body: post.body
        });
      }
      arrayOfUsers.push({
        id: user.id, 
        name: user.name, 
        email: user.email, 
        address: `${user.address.city}, ${user.address.street}, ${user.address.suite}`,
        website: `https://${user.website}`, 
        company: user.company.name, 
        post: userPosts
      });
    }
    console.log(arrayOfUsers);
  }
}
