# Hind&bull;Site

Shortcuts to the Sitecore interface

## Installation

1. Create a browser bookmark button  
       a. Firefox : https://support.mozilla.org/en-US/kb/bookmarks-firefox  
       b. Chrome : https://support.mozilla.org/en-US/kb/bookmarks-firefox
2. Copy the text in `\dist\final\bookmark.js` to the Location field of the bookmark  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It will look something like:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`javascript:(function(){var newScript = ...`
3. Browse to a sitecore site  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g. `https://local.mySitecoreSite/sitecore/shell/default.aspx`
4. Click the Bookmark button



## Purpose
A Sitecore interface tool that is disassociated enough with a given Sitecore site that expected shorts cuts work.

1. It should never increase the number of clicks required for an action
2. It should never destroy data or state without user acceptance 
3. It should make life easier and therefore its function should be as self-evident as possible. There should be short, easy to understand instructions when helpful or needed.
4. It should make every reasonable effort to detect the current state and adjust for it
5. It should never be dependant on anything except the script and a sitecore CM site. Settings and stored data will be created by the code as needed.
6. It should work for Sitecore 8.x, 9.x. If differences in the two, it should try resolving with the newer version first. If that fails, then try the older versions.

## Usage

**Normal Click** - Opens in new tab  
**Ctrl Click** - Opens in current tab  
**Nickname** - for human readable snapshot name, click 'Set Nickname' to change  
**Save Window State** - Saves the nodes of the current tab  
**Restore State** - Restores  
    1. If you restore a desktop state to a CE, it will just restore the first on in CE  
    2. If you restore either a desktop or CE to a desktop state, it will just add new CE's to the existing desktop


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## Standards and Conventions
1. Use a single space between methods.

## Known Issues

If intellisense stops working on browser.tabs.Tab, simply restart visual studio

## Not Implemented Yet (not prioritized)

1. auto purge
2. multi select  
3. add nickname to CE as tokens   
    lvl2 e.g. C: for content, L for Layout  
    Item name  
    Display name  
4. floating windows do not restore yet (e.g. when clicking on an items template)
5. Auto make a snap shot when restoring
6. Settings
   1. Show debug
   2. Customizable username and password (is password a good idea?)
   3. Selectable Sitecore buttons...kind of like the 'MyToolbar'
7. Detect if on login page when targeting desktop and such
8. Remember and set currently select node
9. search for node if not found
10. side by side (iframes) display
11. tree: preview
12. breakpoints  
     desktop, tablet, mobile, customizable
13. Extension integration chrome and ff
14. replace CM menu with customizable one
15. auto click irritating buttons such as during publish
16. Close Hind&bull;Site child window when no longer associated with the current browser tab
17. Hotkeys
18. Clear Existing tabs?
19. Icons
20. Hover states for CE tab buttons to show which path is current?
21. Open preview/edit/normal window when on node
22. Go to x indexed favorite
23. Open node in new content editor iframe
24. Go to node's template


## History

TODO: Write history

## Credits

TODO: Write credits

## License

TODO: Write license





  



    

