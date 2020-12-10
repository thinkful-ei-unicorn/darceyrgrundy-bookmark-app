Thank you for taking the time to look over and grade my assignment! My link for my page can be found here:
https://thinkful-ei-unicorn.github.io/darceyrgrundy-bookmark-app/.

 Here are my user stories for this bookmarks app.

My app will display a list of premade bookmarks (depending on the day) from Thinkful's bookmarks API. It will allow users to hit add new bookmark and submit their own. All bookmarks need a title and a link, obviously. They can also have descriptions and star ratings that are optional. The front page display bookmarks, an option to add new ones, and a way to sort bookmarks by rating. The bookmarks on the front page will only display the title and star rating. Clicking on one of the displayed bookmarks will allow the user to see more details like descriptions and allows the user to visit the link. This expanded view also gives the user an option to delete the expanded bookmark in question. On the add bookmark page, it will prompt the user for each required portion and will send an error when they leave out any of them. If the user decides they don't want to submit a bookmark, they can hit cancel and head back. When the user successfully adds a new bookmark, it will prompt the original page with the added bookmark shown. This addition may take a second so I've placed a short message letting the user know that their input was indeed collected.

My render function can be found near the end of my bookmarks Javascript file. My store module can be found in my store javascript file. The bookmarks file is doing the heavy lifting. My specific API requests can all be found in the api javascript file. 