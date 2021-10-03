
function App() {
    const query = (params) => document.querySelector(params)
    const menuClick = () => {
        let header__content = document.getElementsByClassName('header__content')
        let btnWrapper = document.querySelectorAll('.menu_btnWrapper');
        let a = header__content[0];
        a.addEventListener('click', () => {
            a.classList.toggle('text-active')
            query('.menu').classList.toggle('isActive')
            if(query('.menu').classList.contains('isActive')){
                setTimeout(()=>{
                    btnWrapper.forEach(item =>{
                        item.style.overflow = 'inherit'
                    })
                },1500)
            }else{
                btnWrapper.forEach(item =>{
                    item.style.overflow = 'hidden'
                })
               
            }
        })
    }
    const scrollPage = () => {
        let scrollTitle = query('.srcoll_start');
        let pLeft = query('.project.pLeft');
        let pRight = query('.project.pRight');
        let main = query('.main');
        let header_text = query('.header__text')
        let line = document.querySelectorAll('.line')
        let fTransformX = -170;
        let fTransformY = -300;
        let sTrnaformX = 170;
        let sTransformY = -200;
        let brandTransformY = 6600;
        let scaleXY = 2;
        let scrollY = 1700;
        let creaBtn = query('.creativity_btn');
        let footerBtn = query('.footer_btn');
        let footerBtn1 = query('.footer_btn1');
        let footerBtn2 = query('.footer_btn2');
        let brand_container = query('.brand_container')
        const scrollbar = Scrollbar.init(document.querySelector('.scroller'));
        scrollbar.addListener((status) => {

            const { limit, offset } = status
            //6600 => 0%
            Object.assign(brand_container.style,{
                transform : `translateX(${100 - (offset['y']/6600 * 100)}%)`
            })
            if (offset['y'] <= 1700) {
                //scroll container title
                Object.assign(scrollTitle.style, {
                    transform: `scale(${1 - offset['y'] / scrollY})`,
                    opacity: `${1 - offset['y'] / 600}`,
                })
                Object.assign(pLeft.style, {
                    //total = 1800 = 100%, x/1800 * 100% 
                    // 170% ,300%  , scale 2 , op 0;
                    transform: `translate(${fTransformX - (offset['y'] / scrollY * fTransformX)}%,${fTransformY - (offset['y'] / scrollY * fTransformY)}%) scale(${scaleXY - (offset['y'] / scrollY)})`,
                    opacity: `${offset['y'] / scrollY}`
                })

                Object.assign(pRight.style, {
                    transform: `translate(${sTrnaformX - (offset['y'] / scrollY * sTrnaformX)}%,${sTransformY - (offset['y'] / scrollY * sTransformY)}%) scale(${scaleXY - (offset['y'] / scrollY)})`,
                    opacity: `${offset['y'] / scrollY}`
                })

            }
            if (offset['y'] >= 1600 && offset['y'] < 5600 ) {
                main.classList.add('dark-theme');
                line.forEach(item => {
                    item.style.backgroundColor = 'white'
                })
                header_text.style.color = 'white'
                creaBtn.classList.remove('btnBlack');
                footerBtn.classList.remove('btnBlack');
                footerBtn1.classList.remove('btnBlack');
                footerBtn2.classList.remove('btnBlack');
                creaBtn.classList.add('btnWhite');
                footerBtn.classList.add('btnWhite');
                footerBtn1.classList.add('btnWhite');
                footerBtn2.classList.add('btnWhite');

            }else if(offset['y'] >= 5600){
                main.classList.remove('dark-theme');
                line.forEach(item => {
                    item.style.backgroundColor = 'black'
                })
                header_text.style.color = 'black';
                creaBtn.classList.remove('btnWhite');
                footerBtn.classList.remove('btnWhite');
                footerBtn1.classList.remove('btnWhite');
                footerBtn2.classList.remove('btnWhite');
                creaBtn.classList.add('btnBlack');
                footerBtn.classList.add('btnBlack');
                footerBtn1.classList.add('btnBlack');
                footerBtn2.classList.add('btnBlack');
                // rgba(16,16,16,.1);
            }else{
                main.classList.remove('dark-theme');
                line.forEach(item => {
                    item.style.backgroundColor = 'black'
                })
                header_text.style.color = 'black';
                creaBtn.classList.remove('btnWhite');
                footerBtn.classList.remove('btnWhite');
                footerBtn1.classList.remove('btnWhite');
                footerBtn2.classList.remove('btnWhite');
                creaBtn.classList.add('btnBlack');
                footerBtn.classList.add('btnBlack');
                footerBtn1.classList.add('btnBlack');
                footerBtn2.classList.add('btnBlack');
            }
        })
    }

    const hoverBtn = (container,item,itemChange) => {
        container.addEventListener('mousemove', e => {
            update(e);
        })
        container.addEventListener('mouseleave', () => {
            Object.assign(itemChange.style, {
                transform: `scale(1) translate(0px,0px)`,
                transition : 'all .5s'
            })
            Object.assign(item.style, {
                transform: `scale(1) translate(0px,0px)`,
                transition : 'all .5s'
            })
        })
        const update = e => {
            const { clientX, clientY, offsetX, offsetY} = e;
            let rect = container.getBoundingClientRect();
            let x =rect.x + Math.floor(container.clientWidth/2);
            let y = rect.y + Math.floor(container.clientHeight/2);
            Object.assign(itemChange.style, {
                transform: `scale(1.1) translate(${15 * (clientX - x) / 100}px,${15 * (clientY - y) / 60}px)`,
                transition :''
            })
            Object.assign(item.style, {
                transform: `translate(${ 12 * (clientX - x) / 100}px,${12 * (clientY - y) / 100}px)`,
                transition :''
            })
        }
    }
    
    // let prjBtn = query('.project_button')
    // let btn = query('.btn')
    // let btnSpan = query('.btn span');


    hoverBtn(query('.project_button'),query('.btn span'),query('.btn'));
    const hoverBtnCircle = (container,itemTextSpan,button) =>{
        hoverBtn(container,itemTextSpan,button);
        const mouseChange = (eventListener,opacity) =>{
            container.addEventListener(eventListener,()=>{
                Object.assign(button.style,{
                    opacity:opacity
                })
            })
        }
        mouseChange('mouseover',1);
        mouseChange('mouseleave',0)
    }
    hoverBtnCircle(query('.creativity_btn'), query('.creativity_itemText'), query('.creativity_circle'))
    hoverBtnCircle(query('.footer_btn'), query('.footerBtn_itemText'), query('.footerBtn_circle'))
    hoverBtnCircle(query('.footer_btn1'), query('.footerBtn_itemText1'), query('.footerBtn_circle1'))
    hoverBtnCircle(query('.footer_btn2'), query('.footerBtn_itemText2'), query('.footerBtn_circle2'))
    hoverBtnCircle(query('.menu_BtnLeft'), query('.menuBtnLeft_itemText'), query('.menuBtnLeft_circle'))
    hoverBtnCircle(query('.menu_BtnLeft2'), query('.menuBtnLeft_itemText2'), query('.menuBtnLeft_circle2'))
    hoverBtnCircle(query('.menu_BtnLeft3'), query('.menuBtnLeft_itemText3'), query('.menuBtnLeft_circle3'))
    hoverBtnCircle(query('.dribbble_btnRight'), query('.dribbble_itemText'), query('.dribbble_circle'))
    hoverBtnCircle(query('.instagram_btnRight'), query('.instagram_itemText'), query('.instagram_circle'))
    hoverBtnCircle(query('.coworking_btnRight'), query('.coworking_itemText'), query('.coworking_circle'))
    hoverBtnCircle(query('.podcast_btnRight'), query('.podcast_itemText'), query('.podcast_circle'))
    hoverBtnCircle(query('.news_btnRight'), query('.news_itemText'), query('.news_circle'))

    // query('.menuBtnLeft_area').addEventListener('mouseover',()=>{
    //     query('.menu_imageContent').classList.add('style-show');
    // })
    // query('.menuBtnLeft_area').addEventListener('mouseleave',()=>{
    //     query('.menu_imageContent').classList.remove('style-show');
    // })

    const styleShow = (classBtn,classImg)=>{
        query(classBtn).addEventListener('mouseover',()=>{
            query(classImg).classList.add('style-show');
        })
        query(classBtn).addEventListener('mouseleave',()=>{
            query(classImg).classList.remove('style-show');
        })
    }
    styleShow('.menuBtnLeft_area','.tab1')
    styleShow('.dribbble_area','.tab2')
    styleShow('.instagram_area','.tab3')
    styleShow('.coworking_area','.tab4')
    styleShow('.podcast_area','.tab5')
    styleShow('.news_area','.tab6')
    styleShow('.menuBtnLeft_area2','.tab7')
    styleShow('.menuBtnLeft_area3','.tab8')



    let arrSlider_btn = document.querySelectorAll('.slider_btn');
    arrSlider_btn.forEach(item =>{
        let sliderA = item.children[0];
        let sliderSpan = sliderA.children[0];
        hoverBtn(item,sliderSpan,sliderA)
    })
    let draggableSlider = function () {
        // DOM element(s)
        let slider = document.querySelector(".slider_footer"),
          innerSlider = document.querySelector(".slider-inner_footer");
        // Slider variables
        let pressed = false,
          startX,
          x;
        // Mousedown eventlistener
        slider.addEventListener("mousedown", (e) => {
          pressed = true;
          startX = e.offsetX - innerSlider.offsetLeft;
          slider.style.cursor = "grabbing";
          const arrImg = document.querySelectorAll('.slide_footer_item');
          arrImg.forEach(item =>{
              let img = item.querySelector('img');
              Object.assign(item.style,{
                  transform:`scale(${.88},${.88})`,
              })
              Object.assign(img.style,{
                transform:`scale(${1.5},${1.5})`,
            })
          })
          Object.assign(query('.footer_slide_text').style,{
            opacity : '1',
            transform:`scale(1)`
          })
        });
      
        // mouseneter
        slider.addEventListener("mouseenter", () => {
          slider.style.cursor = "grab";
        });
      
        // mouseup
        slider.addEventListener("mouseup", () => {
          slider.style.cursor = "grab";
          const arrImg = document.querySelectorAll('.slide_footer_item');
          arrImg.forEach(item =>{
              let img = item.querySelector('img');
              Object.assign(item.style,{
                  transform:`scale(${1},${1})`,

              })
              Object.assign(img.style,{
                transform:`scale(${1},${1})`,
            })
          })
          Object.assign(query('.footer_slide_text').style,{
            opacity : '0',
            transform:`scale(.6)`

          })
        });
      
        // window
        window.addEventListener("mouseup", () => {
          pressed = false;
        });
      
        // Slider mousemove event listener
        slider.addEventListener("mousemove", (e) => {
          if (!pressed) return;
          e.preventDefault();
      
          x = e.offsetX;
      
          innerSlider.style.left = `${x - startX}px`;
      
          checkBoundry();
        });
      
        // Check boundry of outer and inner sliders
        function checkBoundry() {
          let outer = slider.getBoundingClientRect(),
            inner = innerSlider.getBoundingClientRect();
      
          if (parseInt(innerSlider.style.left) > 0) {
            innerSlider.style.left = "0px";
          } else if (inner.right < outer.right) {
            innerSlider.style.left = `-${inner.width - outer.width}px`;
          }
        }
      };
      
    draggableSlider();
    scrollPage();
    menuClick();
}


App()

