// image carousel on main page

let nrOfImages = 7;
let midWay = (nrOfImages + 1) / 2;
let imgCarousel = document.getElementById("img_carousel1");

function imgCarouselSetup() {
    if (!imgCarousel) return;
    let imgCarouselItem = getImgCarouselItems();
    let imgCarouselItemCount = parseInt(imgCarouselItem.length);
   
     imgCarouselNumbering();
}

function getImgCarouselItems() {
    if (!imgCarousel) return;
    let imgCarouselItem = imgCarousel.getElementsByClassName("img_carousel_item");
    // console.log(imgCarouselItem.length);
    let elementsToProcess = [];
    for (let r in imgCarouselItem) {
        if (!imgCarouselItem[r].classList || !imgCarouselItem[r].classList.contains("img_carousel_item")) continue;
        elementsToProcess.push(imgCarouselItem[r]);
    }

    var elements = [].slice.call(elementsToProcess);
    // sorting using data-id
    elements.sort(function (a, b) { return a.dataset.img_carousel_id - b.dataset.img_carousel_id });    

    return elements;
}

/* adds numbers to the id */
function imgCarouselNumbering() {
    let imgCarouselItem = getImgCarouselItems();
    let imgCarouselItemCount = imgCarouselItem.length;
    let lastImageId = "img_carousel_14";
    let counter;
    let cnt = 1;
    let imgItem;
    let zIndex = 1;
    let scaleFactor = .06;

    for (let r in imgCarouselItem) {
        imgItem = imgCarouselItem[r];
        if (!counter) counter = (imgItem.dataset.img_carousel_id) ? imgItem.dataset.img_carousel_id : 0;
        counter++; if (counter > imgCarouselItemCount) counter = 1;
        imgItem.dataset.img_carousel_id = counter;
        if (!imgItem.id) imgItem.id = "img_carousel_item_" + counter;
        

        // add styling
        if (cnt >= 1 && cnt <= 7) {
            if (cnt < midWay) {
                scale = 1 - (scaleFactor * (midWay - cnt + 1));
                translateX = ((midWay - cnt) * 100);
                imgItem.style.transform = "scale(" + scale + ") translateX(-" + translateX + "%)";
                imgItem.style.zIndex = zIndex;
                zIndex++;
                
            } else if (cnt > midWay) {
                scale = 1 + (scaleFactor * (midWay - cnt - 1));
                translateX = ((cnt - midWay) * 100);
                imgItem.style.transform = "scale(" + scale + ") translateX(" + translateX + "%)";
                imgItem.style.zIndex = zIndex;
                zIndex--;
            } else {
                zIndex = midWay;
                scaleY = 1; translateX = 0;
                imgItem.style.transform = "scale(1) translateX(0%)";
                imgItem.style.zIndex = zIndex;
                zIndex--;
            }
            
            imgItem.style.visibility = "";
                                    
        } else {
            /* hide these images */
            imgItem.style.visibility = "hidden";
            imgItem.style.zIndex = "";
            imgItem.style.transform = "scale(0)";
        };
        cnt++;
    }
}


imgCarouselSetup();
if (imgCarousel) {
    setInterval(
        imgCarouselNumbering,
        3000
    );
}

