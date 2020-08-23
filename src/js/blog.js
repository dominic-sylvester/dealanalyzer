document.querySelector('.blogPost').addEventListener("mouseover", ()=> {
    document.querySelector('.postAnimation').style.top = '0';
    document.querySelector('.postAnimation').style.left= '0';
})

document.querySelector('.blogPost').addEventListener("mouseout", ()=> {
    document.querySelector('.postAnimation').style.top = '-30vh';
    document.querySelector('.postAnimation').style.left = '-30vw';
})