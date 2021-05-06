"use strict";

// 1. Реализовать страницу корзины:
// Добавить возможность не только смотреть состав корзины, но и редактировать его, 
// обновляя общую стоимость или выводя сообщение «Корзина пуста».

let cartContent = [];
function getButtons() {
    let buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = act;
    }
}

function getCart() {
    let cart = document.getElementById("cart");
    let list = document.createElement("div");
    let smallImage = document.createElement("img");
    let nameOfChosen = document.createElement("p");
    let ammount = document.createElement("p");
    let minus = document.createElement("button");
    let count = document.createElement("p");
    let plus = document.createElement("button");
    let sum = document.createElement("p");
    let totalItem = document.createElement("p");
    let totalCart = 0;
    let outputResult = document.createElement("p");


    cart.innerHTML = "";

    for (let i = 0; i < cartContent.length; i += 4) {
        if (cartContent[i + 2] == 0) {
            cartContent.splice(i, 4)
            i -= 4;
            continue;
        }
        else {
            list.innerHTML = "";
            smallImage.src = cartContent[i];
            nameOfChosen.innerHTML = cartContent[i + 1];
            ammount.innerHTML = "Количество:&nbsp;";
            minus.innerHTML = "-";
            minus.className = "minus";
            count.innerHTML = cartContent[i + 2];
            plus.innerHTML = "+";
            plus.className = "plus";
            sum.innerHTML = "&nbsp;Цена за шт: " + cartContent[i + 3] + "&nbsp;руб.";
            totalItem.innerHTML = "&nbsp;Стоимость: " + (cartContent[i + 2] * cartContent[i + 3]) + "&nbsp;руб.";
            totalCart += (cartContent[i + 2] * cartContent[i + 3]);

            list.appendChild(smallImage);
            list.appendChild(nameOfChosen);
            list.appendChild(ammount);
            list.appendChild(minus);
            list.appendChild(count);
            list.appendChild(plus);
            list.appendChild(sum);
            list.appendChild(totalItem);

            cart.innerHTML += list.outerHTML;
        }
    }
    if (cart.innerHTML == "") {
        outputResult.innerHTML = "Ваша корзина пуста. <br> Добавьте товары в корзину."
    }
    else {
        outputResult.innerHTML = "Общая стоимость вашего заказа: " + totalCart + " рублей."
    }
    cart.appendChild(outputResult);
    getButtons();
}

function act(event) {
    switch (event.target.className) {
        case "minus":
            cartContent[cartContent.indexOf(event.target.parentElement.children[1].innerHTML) + 1] -= 1;
            break;
        case "plus":
            cartContent[cartContent.indexOf(event.target.parentElement.children[1].innerHTML) + 1] += 1;
            break;
        default:
            if (cartContent.indexOf(event.target.parentElement.children[1].innerHTML) == -1) {
                cartContent.push(event.target.parentElement.children[0].src);
                cartContent.push(event.target.parentElement.children[1].innerHTML);
                cartContent.push(1);
                cartContent.push(+(event.target.parentElement.children[3].innerHTML.substr(0, (event.target.parentElement.children[3].innerHTML.length - 4))));
            }
            else {
                cartContent[cartContent.indexOf(event.target.parentElement.children[1].innerHTML) + 1] += 1;
            }
    }
    getCart();
}

window.onload = getCart;