let data;
let book;
let frontimage, midimage, backimage;
let inited = false;
let editable = false;
let currentEditingPageIndex;
let _editor;
let settings;
let onClose;
let bookIsOpen = false;

document.addEventListener("DOMContentLoaded", function () {
	book = document.getElementsByClassName("flipbook")[0];
	frontimage = document.getElementById("frontimage");
	midimage = document.getElementById("midimage");
	backimage = document.getElementById("backimage");

	const closeSettingsBtn = document.getElementById("closesettingsbutton");
	if (closeSettingsBtn) {
		closeSettingsBtn.onclick = function () {
			SetClass("w_settings", "off");
		};
	} else {
		console.error("Missing element: #closesettingsbutton");
	}

	// Globally expose index() for inline onclick
	window.index = function (page) {
		$(".flipbook").turn("page", page);
	};

	// Message listener for NUI
	window.addEventListener('message', function (event) {
		if (event.data.type == "OpenBookGui") {
			if (event.data.value === true) {
				const url = new URL(window.location.href);
				StartBook({
					data: event.data.data,
					edit: url.searchParams.get("edit") != null
				});
				bookIsOpen = true;
			} else if (event.data.value === false && bookIsOpen) {
				StopBook();
			}
		}
	});

	// Keyboard controls
	$(document).keydown(function (e) {
		const previous = 37, next = 39, close = 8; // BACKSPACE only

		switch (e.keyCode) {
			case previous:
				Post(`https://${resource}/playSoundPageLeft`);
				$('.flipbook').turn('previous');
				break;
			case next:
				Post(`https://${resource}/playSoundPageRight`);
				$('.flipbook').turn('next');
				break;
			case close:
				StopBook();
				break;
		}
	});
});



function StartBook(args) {
    if (!args || !args.data) return false;

    const d = args.data;
    const edit = !!args.edit;
    onClose = args.onClose;

    SetClass("w_book", "off", false);
    SetClass("w_content", "off", false);

    if (!inited) {
        inited = true;
        $('.flipbook').turn({
            width: 1383,
            height: 900,
            elevation: 50,
            gradients: true,
            autoCenter: true
        });
    }

    editable = edit;
    data = d;

    frontimage.value = data.frontImage || "";
    frontimage.onchange = () => { data.frontImage = frontimage.value; };

    midimage.value = data.midImage || "";
    midimage.onchange = () => { data.midImage = midimage.value; };

    backimage.value = data.backImage || "";
    backimage.onchange = () => { data.backImage = backimage.value; };

    if (!data || !data.pages || data.pages.length === 0) {
        $(".flipbook").turn("addPage", CreatePageElement(editable));
        $(".flipbook").turn("addPage", CreatePageElement(editable));
        $(".flipbook").turn("addPage", CreatePageElement(editable));
    } else {
        BuildPages();
        $(".flipbook").turn("page", 1);
    }

    $(".flipbook").bind("turned", function () {
        document.getElementsByClassName("w_flip")[0].classList.add("off");
    });
}

function StopBook() {
    console.log("[StopBook] called");
    SetClass("w_book", "off", true);
    SetClass("w_content", "off", true);
    bookIsOpen = false; // <- CRITICAL

    if ($('.flipbook').data('turn')) {
        $('.flipbook').turn('destroy');
        inited = false;
    }

    if (typeof GetParentResourceName === "function") {
        const resource = GetParentResourceName();
        fetch(`https://${resource}/close`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        }).catch(err => console.error("Force close fetch failed:", err));
    }
}



function BuildPages() {
    var pageCount = $(".flipbook").turn("pages")
    for( var i = pageCount; i > 0; i--) {
        if($(".flipbook").turn("hasPage",i) == false ) { continue}
        $(".flipbook").turn("removePage", i);
    }
    for( var i = 0; i < data.pages.length; i++ ) {
        $(".flipbook").turn("addPage", CreatePageElement(editable,data.pages[i]))
    }
}

function CreatePageElement(editable, data) {
	const pageNumber = $(".flipbook").turn("pages") + 1;

	const element = document.createElement("div");
	element.classList.add("w_bookpage");
	element.id = "bookpage" + pageNumber;

	if (data?.background) {
		element.style.backgroundImage = `url('${data.background}')`;
	}
	if (data?.backgroundColor) {
		element.style.backgroundColor = data.backgroundColor;
	}
	if (data?.color) {
		element.style.color = data.color;
	}

	const cont = document.createElement("div");
	cont.id = "pagecontent" + pageNumber;
	cont.classList.add("w_pagecontent");
	cont.setAttribute("pageIndex", pageNumber);
	cont.innerHTML = data?.content || "";

	element.appendChild(cont);
	return element;
}




function SetClass(className,otherClassName,enable) {
    if(document.getElementsByClassName(className).length == 1 ) {
        document.getElementsByClassName(className)[0].classList.toggle(otherClassName,enable)
    } else {
        document.getElementById(className).classList.toggle(otherClassName,enable)
    }
}


function index(page) {
    $(".flipbook").turn("page",page);
}

window.addEventListener('message', function(event) {

    if (event.data.type == "OpenBookGui") {
        if (event.data.value == true) {
            //DebugInit(true)
            var url = new URL(window.location.href);
            StartBook({data:{pages:[
            {   /* 0 -- front cover */
                content:"<div>  <div class=\"HomeBanner__imgWrap__ytSx9\"><img src=\"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Cover_Image.png?raw=true\" alt=\"Wheeler, Rawson and Co.\" class=\"HomeBanner__img__1bLBq\" tabindex=\"0\"></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/leather.jpg?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 1 -- index */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <h2 class=\"index_header\">INDEX</h2>  <div class=\"ProductPurchaseButtons__button__index__handguns\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"index\" onclick=\"index(4)\" type=\"button\">             <span class=\"Button__text__index\">Handguns</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__index__repeaters\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"index\" onclick=\"index(12)\" type=\"button\">             <span class=\"Button__text__index\">Repeaters</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__index__rifles\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"index\" onclick=\"index(17)\" type=\"button\">             <span class=\"Button__text__index\">Rifles</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__index__shotguns\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"index\" onclick=\"index(22)\" type=\"button\">             <span class=\"Button__text__index\">Shotguns</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__index__misc\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"index\" onclick=\"index(28)\" type=\"button\">             <span class=\"Button__text__index\">Miscellaneous</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/background.jpg?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 2 -- ad */
                content:"<img class = \"ad\" src=\"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Ad_1.png?raw=true\" alt=\"gun\" tabindex=\"0\">",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/background.jpg?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 3 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REVOLVER_CATTLEMAN')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$10.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REVOLVER_CATTLEMAN', 1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Cattleman_Revolver.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 4 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REVOLVER_DOUBLEACTION')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$20.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REVOLVER_DOUBLEACTION', 1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:'https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/DoubleAction_Revolver.png?raw=true',
                backgroundColor:"",
                color:"",
            },
            {   /* 5 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REVOLVER_SCHOFIELD')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$30.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REVOLVER_SCHOFIELD', 1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Schofield_Revolver.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },              
            {   /* 6 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REVOLVER_LEMAT')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$55.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REVOLVER_LEMAT', 1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Lemat_Revolver.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 7 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_PISTOL_VOLCANIC')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$35.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_PISTOL_VOLCANIC', 1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Volcanic_Pistol.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 8 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_PISTOL_SEMIAUTO')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$120.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_PISTOL_SEMIAUTO', 1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Semiauto_Pistol.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 9 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_PISTOL_MAUSER')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$100.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_PISTOL_MAUSER',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Mauser_Pistol.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 10 ad */
                content:"<img class = \"ad\" src=\"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Ad_2.png?raw=true\" alt=\"gun\" tabindex=\"0\">",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/background.jpg?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 11 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REPEATER_CARBINE')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$45.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REPEATER_CARBINE',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Carbine_Repeater.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 12 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REPEATER_WINCHESTER')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$80.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REPEATER_WINCHESTER',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Winchester_Repeater.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 13 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REPEATER_EVANS')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$120.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REPEATER_EVANS',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Evans_Repeater.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 14 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REPEATER_HENRY')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$65.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_REPEATER_HENRY',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Litchfield_Repeater.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 15 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_RIFLE_VARMINT')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$35.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_RIFLE_VARMINT',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Varmint_Rifle.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 16 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_RIFLE_SPRINGFIELD')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$265.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_RIFLE_SPRINGFIELD',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Springfield_Rifle.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 17 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_RIFLE_BOLTACTION')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$275.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_RIFLE_BOLTACTION',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Boltaction_Rifle.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 18 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SNIPERRIFLE_ROLLINGBLOCK')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$290.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_RIFLE_ROLLINGBLOCK',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Rollingblock_Rifle.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 19 */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SNIPERRIFLE_CARCANO')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$310.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_RIFLE_CARCANO',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Carcano_Rifle.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 20 -- ad */
                content:"<img class = \"ad\" src=\"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Ad_3.png?raw=true\" alt=\"ad\" tabindex=\"0\">",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/background.jpg?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 21 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_SAWEDOFF')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$25.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_SAWEDOFF',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Sawedoff_Shotgun.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 22 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_DOUBLEBARREL')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$33.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_DOUBLEBARREL',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Doublebarrel_Shotgun.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 23 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_PUMP')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$40.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_PUMP',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Pumpaction_Shotgun.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 24 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_REPEATING')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$43.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_REPEATING',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Repeating_Shotgun.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 25 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_SEMIAUTO')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$45.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_SHOTGUN_SEMIAUTO',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$2 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Semiauto_Shotgun.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 26 -- ad */
                content:"<img class = \"ad\" src=\"https://github.com/EdWordy/psg-catalogue-images/blob/5a0ec65d6cc97524c150a6a45aec25881251a465/catalogue/Ad_4.png?raw=true\" alt=\"ad\" tabindex=\"0\">",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/background.jpg?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 27 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__1Vwwn\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_BOW')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$35.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br>     <div class=\"ProductPurchaseButtons__button__ammo\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_BOW',1)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"cattermanammo\">$1 Buy ammo</span>         </button>     </div>  <div class=\"ProductPurchaseButtons__button__back\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Hunting_Bow.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 28 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_LASSO')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$10.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Lasso.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 29 --  */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_FISHINGROD')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$5.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Fishing_Rod.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 30 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_MELEE_LANTERN')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$8.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Lantern.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 31 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_MELEE_HATCHET')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$10.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Hatchet.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 32 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_MELEE_KNIFE')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$7.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Hunting_Knife.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 33 --*/
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_THROWN_THROWING_KNIVES')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$15.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Throwing_Knives.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },       
            {   /* 34 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_MELEE_MACHETE')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$12.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Machete.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 35 --*/
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_THROWN_TOMAHAWK')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$20.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Tomahawk.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 36 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_THROWN_DYNAMITE')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$30.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/dynamite.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 37 -- */
                content:"<div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <div class=\"ProductPurchaseButtons__button__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"buyNow\" onclick=\"Buy('WEAPON_THROWN_MOLOTOV')\" type=\"button\">             <span class=\"Button__text__2C2ug\">$25.00 Buy</span>         </button>     </div></div><br><div class=\"ProductPurchaseButtons__buttons__14Q7z\">  <br> <div class=\"ProductPurchaseButtons__button__back__melee\" tabindex=\"0\">         <button class=\"Button__btn__1bc-t Button__black__h0BRc\" data-ui-name=\"back\" onclick=\"index(2)\"type=\"button\">             <span class=\"Button__text__2C2ug\" id=\"back\">Back to index</span>         </button>     </div></div>",                            
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/firebottle.png?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 38 -- ad */
                content:"<img class = \"ad\" src=\"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/Ad_5.png?raw=true\" alt=\"ad\" tabindex=\"0\">",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/background.jpg?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
            {   /* 39 -- back cover */
                content:"<div>  <img class = \"ad\" src=\"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/back.png?raw=true\" alt=\"ad\" tabindex=\"0\">  <p class=\"credits\">Made by Steady and Erratic. RIP Depth.</p></div>",
                background:"https://github.com/EdWordy/psg-catalogue-images/blob/main/catalogue/leather.jpg?raw=true",
                backgroundColor:"#353535",
                color:"white",
            },
        ],
    },
    edit: (url.searchParams.get("edit") != null),
	})
            bookIsOpen = true
        } else if (event.data.value === false) {
            if (bookIsOpen) {
                StopBook()
            }
        }
    }
})

function Buy(weapon, isammo) {
    console.log("Buy clicked", weapon, isammo);
    const payload = {
        weapon: weapon,
        isammo: isammo ?? 0,
    };

    // use fetch instead of $.post (correct for NUI callbacks)
    fetch(`https://${GetParentResourceName()}/purchaseweapon`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).then(res => {
        console.log("[DEBUG] Server response:", res);
    }).catch(err => {
        console.error("[ERROR] Buy fetch failed:", err);
    });
}



Post = function(url, data) {
    var d = (data ? data : {});
    $.post(url, JSON.stringify(d));
};


