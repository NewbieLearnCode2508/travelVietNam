function load()
{
    let header = document.getElementById("header");
    let sublist = document.querySelector(".navbar-item__sublist");

    if(sublist.clientHeight > (window.innerHeight - header.clientHeight))
    {
        sublist.style.overflow = "scroll";
    }
    sublist.style.maxHeight = `calc((100vh) - ${header.clientHeight}px)`;
    console.log(sublist.clientHeight, (window.innerHeight - header.clientHeight));
}

load();