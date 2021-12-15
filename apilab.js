(function(){


    const main = document.querySelector('main')

    const input = document.querySelector('input')

    const button = document.querySelector('button')

    const titlePage = document.querySelector('header>h1')

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }


    function reddit(subreddit) {

        fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(data => {
    
            console.log(data.data.children)

            titlePage.innerText = `Reddit ${subreddit}`

            removeAllChildNodes(main);
            
        for (let i=0; i< 10; i++) {
    
            const ulPosts = document.createElement('ul')
            ulPosts.classList.add('card')
    
            const authorLi = document.createElement('li')
            authorLi.innerText = `Author: ${data.data.children[i].data.author}`
    
            const titleLi = document.createElement('li')
            titleLi.innerText = `${data.data.children[i].data.title}`
            
            const postUrlLi = document.createElement('li')
            const aTagUrl = document.createElement('a')
            const link = document.createTextNode('Go to Post')
            aTagUrl.append(link)
            aTagUrl.title = `Go to Post`
            aTagUrl.href = data.data.children[i].data.url
            postUrlLi.append(aTagUrl)
    
            
            if (data.data.children[i].data.thumbnail !== "default") {
            
            const thumbLi = document.createElement('li')
            const imgThumbLi = document.createElement('img')
            imgThumbLi.src = data.data.children[i].data.thumbnail
            thumbLi.append(imgThumbLi)
    
            ulPosts.append(authorLi, titleLi, postUrlLi, thumbLi)
    
            }
    
            else {
            ulPosts.append(authorLi, titleLi, postUrlLi)
            }
    
             
            main.append(ulPosts)
               
            }
    
    
        }) 

    }

    reddit('aww');

    button.addEventListener('click', event => {

        if(input.value !== '') {

        reddit(input.value)

        }
    })

        
        

})()