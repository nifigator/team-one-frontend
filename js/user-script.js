var userInfo = sessionStorage.getItem('houseCareUser');
if (userInfo) {
    userInfo = JSON.parse(userInfo);
    $('.js-user-fio').text(userInfo.surname + ' ' + userInfo.name + ' ' + userInfo.middlename);
    $('.js-user-account').text('0006295');
    $('.js-user-phone').text(userInfo.phone);
    $('.js-user-phone').attr('href', 'tel:' + userInfo.phone);
    $('.js-user-mail').text(userInfo.email);
    $('.js-user-mail').attr('href', 'mailto:' + userInfo.email);
}

$(function () {
    $('[data-toggle="popover"]').popover()
});

$(document).ready(function () {

    function getUserOrders() {
        var userId = userInfo.id;

        getOrders(userId)
            .then(drawOrders);
    }

    function getOrders(userId) {
        return $.ajax({
            type: 'GET',
            url: '/api/v1.0/customers/' + userId + '/issues',
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
            $('.js-order-counter').text(data.length + 2);
            orderContainer.find('.alert').remove();
            orderList = $('<ul class="collapse-list mt-4 border rounded container"></ul>');
            data.forEach(function (order, idx) {
                maxId = order.id;
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
                orderListItemBlock = $('<div class="collapse-list__item-cell col-md-2">' + getStatusBadge(order.status_id) + '</div>');
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
                orderList.prepend(orderListItem);
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

    function getStatusBadge(id) {
        switch (id) {
            case 1:
                return '<span class="badge badge-primary">Создана</span>';
            case 2:
                return '<span class="badge badge-warning">В работе</span>';
            case 3:
                return '<span class="badge badge-danger">Отклонена</span>';
            case 4:
                return '<span class="badge badge-success">Выполнена</span>';
            case 5:
                return '<span class="badge badge-dark">Закрыта</span>';
            default:
                return '<span class="badge badge-secondary">Обработка</span>';
        }
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
            url: 'https://cifra.taxi/gates/team-one/classifier.php?',
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

    $('.js-new-request').on('submit', function (evt) {
        evt.preventDefault();
        var form = this;
        var userID = userInfo.id;
        var body = this.body.value;
        var categoryId = parseInt(this.categories.value.split('.')[0]);
        var body = JSON.stringify({
            "body": body,
            "category_id": categoryId,
            "contractor": "Цифровой прорыв",
            "contractor_id": 1,
            "customer_id": userID,
            "management_id": 1,
            "status_id": 1
        });

        $.ajax({
            method: 'POST',
            url: 'https://team-one.kras.ru/api/v1.0/customers/'+userID+'/issues',
            headers:{
                'accept': 'application/json',   
                'Content-Type': 'application/json'
            },
            data: body,
        }).then(function(data){
            console.log(data);
            $('#exampleModal').modal('hide');
        });
    });

    var max_id = 0; //global variable

function update_issues() {
    $.ajax({
        type: "GET",
        url: "https://team-one.kras.ru/api/v1.0/customers/"+userInfo.id+"/issues", //management API URL
        //url: "https://team-one.kras.ru/api/v1.0/contractor//1/issues", //contractor/ API URL
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            for (var item in data) {

                if (data[item].id <= max_id) //break when old issue
                    return;

                max_id = Math.max(max_id, data[item].id)

                drawOrders(data);
            }
        },
        failure: function (errMsg) {
            console.log(JSON.stringify(errMsg));
        }
    });
}

    // var tm = setInterval(function(){
    //     update_issues();
    // }, 1000);
});