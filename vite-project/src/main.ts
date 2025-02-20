import "bootstrap/dist/css/bootstrap.min.css"
import "./style.css"
(() => {

  

  // Add event listener to the form 
  document.getElementById("userForm")?.addEventListener("submit", async function(event: Event) {
      event.preventDefault(); 
      await createUser(); // Call createUser function
  });

  const cardContainer = document.querySelector('#cardsContainer') as HTMLElement; // Get the card container element
  const addUser = document.querySelector('#addUser') as HTMLElement; // Get the add user button

  // Function to fetch user data from API
  async function getUserData() {
    const response = await fetch('https://reqres.in/api/users?page=2'); // Fetch user data
    const users = await response.json(); 

    users.data.forEach((user: any) => {
      const card = document.createElement('div'); // Create a new card element
      card.classList.add('card', 'm-2'); // Add classes to the card
      card.style.width = '18rem'; // 
      card.innerHTML = ` 
     <div class="card" style="width: 18rem">
     <img
       src="${user.avatar}"
       class="card-img-top"
       alt="..."
     />
     <div class="card-body">
       <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
       <p class="card-text">
         Join us
       </p>
       
       <button type="button" class="btn btn-danger" data-id=${user.id}>Delete</button>
     </div>
   </div>`;
      const deleteButton = card.querySelector('.btn-danger') as HTMLElement; // Get the delete button
      deleteButton.addEventListener('click', async (event: Event) => {
         const target = event.target as HTMLElement;
         await deleteUser(target.dataset.id); // Call deleteUser function
          card.remove(); // Remove the card from the DOM
        
      });
      cardContainer.appendChild(card); // Append the card to the container
    });
  }
  getUserData(); // Call getUserData function

  // Function to delete user by ID
  async function deleteUser(id: string | undefined) {
    const response = await fetch(`https://reqres.in/api/posts/${id}`, {
      method: 'DELETE', // Set method to DELETE
    });
  }

  // Function to create a new user
  async function createUser() {
      const name = (document.getElementById("name") as HTMLInputElement).value; // Get name value
      const pledge = (document.getElementById("pledge") as HTMLInputElement).value; // Get pledge value
      const cardContainer = document.getElementById('cardsContainer') as HTMLElement; // Get the card container element

    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ name, pledge }),
    });

    const result = await response.json(); 
    
    const card = document.createElement('div'); // Create a new card element
    card.classList.add('card', 'm-2'); // Add classes to the card
    card.style.width = '18rem'; 
    card.innerHTML = ` 
     <div class="card" style="width: 18rem">
     <img class="card-img-top" src="https://motionarray.imgix.net/preview-463821-I5nqhhQ32qY3zehe-large.jpg?w=3840&q=60&fit=max&auto=format" alt="..."/>
     <div class="card-body">
       <h5 class="card-title">${result.name}</h5>
       <p class="card-text">${result.pledge}</p>
        <button type="button" class="delete-user btn btn-danger" data-id="${result.id}">Delete</button>
     </div>
   </div>`;
    cardContainer.appendChild(card); // Append the card to the container

    const deleteButton = card.querySelector('.btn-danger') as HTMLElement; // Get the delete button
    deleteButton.addEventListener('click', async (event: Event) => {
      const target = event.target as HTMLElement;
      await deleteUser(target.dataset.id); // Call deleteUser function
      card.remove();
    });
  }

  // Add event listener to the add user button
  addUser.addEventListener('click', () => {
    createUser(); // Call createUser function
  });
})();