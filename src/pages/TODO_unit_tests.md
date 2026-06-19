Writing a list of stuff to test first
- Test if http://localhost:3000/ works (no page, redirect)
- Test if http://localhost:3000/?page=4 works (starting not on page 1)
- Test if http://localhost:3000/?art=ordell+another+guitar+piece+idk works (start on art piece)
    - current problem: doubled up if on the same page
- Test if http://localhost:3000/?include=irl&exclude=human works (tags are implemented)
- http://localhost:3000/?include=irl&exclude=human&page=2&art=nelly 
- http://localhost:3000/?page=4&include=oc should redirect back to page 3


- Click through include/exclude tags and make sure they are added properly
- Make sure adding a tag on exclude removes it on include

- Test if changing input field to more than max page brings it back to max page
- Test if changing input field to less than min page brings it back to min page
