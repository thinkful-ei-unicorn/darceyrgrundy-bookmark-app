Thank you for taking the time to look over and grade my assignment! My link for my page can be found here:
https://thinkful-ei-unicorn.github.io/darceyrgrundy-bookmark-app/.



Here are my user stories for this bookmarks app.

My app will display a list of premade bookmarks (depending on the day) from Thinkful's bookmarks API. It will allow users to hit add new bookmark and submit their own. All bookmarks need a title and a link, obviously. They can also have descriptions and star ratings that are optional. The front page display bookmarks, an option to add new ones, and a way to sort bookmarks by rating. The bookmarks on the front page will only display the title and star rating. Clicking on one of the displayed bookmarks will allow the user to see more details like descriptions and allows the user to visit the link. This expanded view also gives the user an option to delete the expanded bookmark. When a user decides they want to add a new bookmark, they can just clicked the "+ Add New Bookmark" button which will load an 'add bookmark' page. On the add bookmark page, it will prompt the user for each required portion and will show an short error above the form when they leave out any of them. The two required portions are the website title and the URL. If the user decides they don't want to submit a bookmark, they can hit cancel and head back. When the user successfully adds a new bookmark, it will prompt the original page with the added bookmark shown at the bottom of the bookmark list. This addition may take a second so I've placed a short message above the add bookmark page letting the user know that their input was indeed collected.

My render function can be found near the end of my bookmarks Javascript file. My store module can be found in my store javascript file, along with certain properties located at the top of the file that help me change the state of my app. The bookmarks file is doing the heavy lifting. My specific API requests can all be found in the api javascript file. 

My last grader helped point me in the direction of really understanding and hopefully passing this interview. I used his feedback to clean up some things like making sure I let my user know that their bookmarks are being submitted even though the page may not look responsive for a second. I was also suggested to enhance the accessibility in keyboard navigation which I was able to do by adding focus to selected buttons and forms. I was able to remove my DOM-updating Javascript out of functions that they didn't belong in, to their rightful home in my render function. I made sure to edit my make my HTML semantic by updating classes and ID's to be more descriptive and specific for people of varying abilities.