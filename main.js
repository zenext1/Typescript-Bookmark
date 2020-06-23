document.getElementById('myform').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var sitename = document.getElementById('sitename').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(sitename, siteUrl)){
        return false;

    }


    var bookmark = {
        name: sitename,
        url: siteUrl
    }
    
    if(localStorage.getItem('bookmarks') === null){

        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmarks();

    
    

    e.preventDefault();

   
}
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i = 0; i < bookmarks.length;i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
        

    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();

}




function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn brn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn brn-danger" target="_blank" href="#">Delete</a> ' +
                                      '</h3>'+
                                      '</div>'; 
    }    
}
function validateForm(sitename, siteUrl) {
    if(!sitename || !siteUrl) {
        alert('Please fill in this form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use a valid url');
        return false;
    }

    return true;
}




