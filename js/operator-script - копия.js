// var userInfo = sessionStorage.getItem('houseCareUser');
// if (userInfo) {
//     userInfo = JSON.parse(userInfo);
//     $('.js-user-fio').text(userInfo.surname + ' ' + userInfo.name + ' ' + userInfo.middlename);
//     $('.js-user-account').text('0006295');
//     $('.js-user-phone').text(userInfo.phone);
//     $('.js-user-phone').attr('href', 'tel:' + userInfo.phone);
//     $('.js-user-mail').text(userInfo.email);
//     $('.js-user-mail').attr('href', 'mailto:' + userInfo.email);
// }

// $(function () {
//     $('[data-toggle="popover"]').popover()
// });

$(document).ready(function () {

    function getUserOrders() {
        var userId = 1;

        getOrders(userId)
            .then(drawOrders);
    }

    function getOrders(userId) {
        return $.ajax({
            type: 'GET',
            url: '/api/v1.0/contractor/' + userId + '/issues',
            headers: {
                accept: 'appication/json',
            },
        })
    }

    function drawOrders(data) {
        var orderContainer = $('#requests');
        var orderList;
        var orderListItem;
        var orderListItemBlock;
        if (data.length) {
            $('.js-order-counter').text(data.length);
            orderContainer.find('.alert').remove();
            orderList = $('<ul class="collapse-list mt-4 border rounded container"></ul>');
            data.forEach(function (order, idx) {
                orderListItem = $('<li>', {
                    id: 'collapse-list-1__item-' + idx,
                    class: 'collapse-list__item row',
                });

                orderListItem.on('click', '.collapse-list__collapse-btn', getOrderDetails);

                orderListItemBlock = $('<div class="collapse-list__item-cell text-center col-md-1">#' + order.id + '</div>');
                orderListItem.append(orderListItemBlock);
                orderListItemBlock = $('<div class="collapse-list__item-cell col-md-2">' + new Date(order.create_data).toLocaleDateString() + '</div>');
                orderListItem.append(orderListItemBlock)
                orderListItemBlock = $('<div class="collapse-list__item-cell col-md-6">' + order.body + '</div>');
                orderListItem.append(orderListItemBlock)
                orderListItemBlock = $('<div class="collapse-list__item-cell col-md-2"><span class="badge badge-success">' + (order.status_id ? order.status_id : 'В обработке') + '</span></div>');
                orderListItem.append(orderListItemBlock);
                orderListItemBlock = $('<div class="collapse-list__item-cell col collapse-list__item-cell_details collapse order-12"></div>');
                orderListItem.append(orderListItemBlock);
                orderListItemBlock = $('<div class="collapse-list__item-cell text-center col-md-1"></div>');
                orderListItemBlock.append($('<button>', {
                    class: "collapse-list__collapse-btn btn-block",
                    type: "button",
                    'data-order-id': order.id,
                    'data-toggle': "collapse",
                    'data-target': '#collapse-list-1__item-' + idx + ' .collapse-list__item-cell_details',
                    'aria-expanded': "false",
                    'aria-controls': 'collapse-list-1__item-' + idx,
                    html: '<img src="img/arrow-down.svg" width="15" height="15" alt="Стрелка вниз - раскрыть детали">',
                }, ));
                orderListItem.append(orderListItemBlock);
                orderList.append(orderListItem);
            });
            orderContainer.append(orderList);
        } else {
            orderContainer.append('<div class="alert alert-info" role="alert">В этом разделе сейчас нет заявок.</div>')
        }
    }

    getUserOrders()

    function getOrderDetails(evt) {
        console.log(this.dataset.orderId);
    }

    // $(function () {
    //     $('[data-toggle="popover"]').popover()
    // });

    var myjSonObject0 = {
        "dataArray": [{
                "isSelected": "true",
                "nextDistance": 2,
                "title": "Зарегистрирован",
                "subTitle": "",
                "dateValue": "10:12", // 10:12
                "pointCnt": "27.09.2019",
                "bodyCnt": 'Отдать приоритезированный список трэков.'
            },
            {
                "isSelected": "",
                "nextDistance": 5,
                "title": "Назначен",
                "subTitle": "",
                "dateValue": "15:12", // 12:11
                "pointCnt": "27.09.2019",
                "bodyCnt": 'Назначен трэк №17'
            },
            {
                "isSelected": "",
                "nextDistance": 4,
                "title": "В работе",
                "subTitle": "",
                "dateValue": "35:12", // 12:11
                "pointCnt": "27.09.2019",
                "bodyCnt": 'Решаем задачи по трэку'
            },
        ]
    };
    var myjSonObject1 = {
        "dataArray": [{
                "isSelected": "true",
                "nextDistance": 2,
                "title": "Зарегистрирована",
                "subTitle": '',
                "dateValue": "10:12", // 10:12
                "pointCnt": "09.09.2019",
                "bodyCnt": 'Прошу согласовать командировку на всероссийский конкурс "Цифровой прорыв"'
            },
            {
                "isSelected": "",
                "nextDistance": 2,
                "title": "Согласовано",
                "subTitle": '',
                "dateValue": "15:12", // 12:11
                "pointCnt": "12.09.2019",
                "bodyCnt": 'Командировка согласована. Можете заказывать билеты в корпоративной системе.'
            },
            {
                "isSelected": "",
                "nextDistance": 1,
                "title": "Оформлено",
                "subTitle": '',
                "dateValue": "20:12", // 12:11
                "pointCnt": "13.09.2019",
                "bodyCnt": 'Билеты и бронирование гостиницы оформлены.'
            },
            {
                "isSelected": "",
                "nextDistance": 5,
                "title": "Решено",
                "subTitle": '',
                "dateValue": "59:12", // 12:11
                "pointCnt": "26.09.2019",
                "bodyCnt": 'Прибыл в Казань'
            }
        ]
    };

    var myjSonDatas = [myjSonObject0, myjSonObject1];

    $('.myjtline').each(function (idx, elem) {
        $(elem).jTLine(getjTlineSettings(idx));
    });

    function getjTlineSettings(idx) {
        return {
            callType: 'jsonObject',
            structureObj: myjSonDatas[idx],
            distanceMode: 'fixDistance', // predefinedDistance , fixDistance               
            eventsMinDistance: 60,
            fixDistanceValue: 3,
            firstPointMargin: 0,

        }
    }

    var select2ru = {
        errorLoading: function () {
            return "Невозможно загрузить результаты"
        },
        inputTooLong: function (e) {
            var r = e.input.length - e.maximum,
                u = "Пожалуйста, введите на " + r + " символ";
            return u += n(r, "", "a", "ов"), u += " меньше"
        },
        inputTooShort: function (e) {
            var r = e.minimum - e.input.length,
                u = "Пожалуйста, введите ещё хотя бы " + r + " символ";
            return u += n(r, "", "a", "ов")
        },
        loadingMore: function () {
            return "Загрузка данных…"
        },
        maximumSelected: function (e) {
            var r = "Вы можете выбрать не более " + e.maximum + " элемент";
            return r += n(e.maximum, "", "a", "ов")
        },
        noResults: function () {
            return "Совпадений не найдено"
        },
        searching: function () {
            return "Поиск…"
        },
        removeAllItems: function () {
            return "Удалить все элементы"
        }
    }

    $('.js-request-category-select').select2({
        language: select2ru,
        width: '100%',
        ajax: {
            url: 'https://cifra.taxi/gates/team-one/dialogflow.php?',
            dataType: 'json',
            data: function (params) {
                var query = {
                    text: params.term,
                    guid: 1,
                    data: 1,
                };
                // Query parameters will be ?search=[term]&type=public
                return query;
            },
            processResults: function (data) {
                return {
                    results: data.data
                };
            }
        },
    });
});