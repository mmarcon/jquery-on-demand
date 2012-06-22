# jQuery On Demand

**On Demand** is a jQuery plugin to asyncronously load functions and objects only when they are needed, thus improving your application performance in terms of amount of code that needs to be downloaded by the client upon application load.

This plugin is ideal to deliver code on demand when the need of a feature, function or object is necessary only after some user actions.

## A practical example
Some of the posts in your blog include photos. Whenever the user clicks on a photo the classic lightbox/carousel is displayed so the user can easily browse all the photos in the post. However if the user decides not to click on any photo, or selects a post with no photos, there is no reason to download the lightbox/carousel code.

This is where On Demand comes into the picture: it can be used to load and execute the JavaScript code for the lightbox only when the user requests the functionality.