const userApi = 'https://todonew412.herokuapp.com/api/list';
const getUser = 'https://todonew412.herokuapp.com/api/get';
const createApi = 'https://todonew412.herokuapp.com/api/create';
const deleteUserId = 'https://todonew412.herokuapp.com/api/delete'

function start() {
    getUsers(function (users) {
        showUsers(users);
    });

    handlePostUser();
}

start();

function notification() {

}

// =========Lấy ra danh sách các User 
function getUsers(callback) {
    fetch(userApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
        .catch(function (err) {
            console.log(err);
        })
}

function showUsers(users) {
    const listUser = document.getElementById('list-user');
    const html = users.map((user) => {
        return `<li id="users-${user._id}">
        <h4>${user.name}</h4>
        </li>`
    })
    listUser.innerHTML = html.reverse().join('')
}

// ========= Thêm user 
function createUser(data, callback) {
    const option = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };
    fetch(createApi, option)
        .then(function (response) {
            response.json
        })
        .then(callback)
}

function handlePostUser() {
    const createBtn = document.getElementById('create-user');

    createBtn.onclick = function () {
        const name = document.getElementById('name').value;
        const data = { name: name }

        createUser(data, function () {
            getUsers(function (users) {
                showUsers(users);
            });
        })
        alert('Thêm Thành Công !')
    }
}

// Lấy user theo id
function getUserId() {
    const inputId = document.getElementById('userId').value;

    fetch(getUser + '/' + inputId)
        .then(function (response) {
            return response.json();
        })
        .then(function (userId) {
            const user = document.getElementById('show-getUser');

            if (userId.name) {
                user.innerHTML = userId.name;
            } else {
                user.innerHTML = 'Không tồn tại id, Vui lòng nhập lại !';
            }

        });
}

// Xóa theo id 
function deleteUser() {
    confirm('Bạn chắc chắn muốn xóa ?')
    const inputId = document.getElementById('userId').value;

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    fetch(deleteUserId + '/' + inputId, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (userId) {
            const user = document.getElementById('show-getUser');
            const liName = document.getElementById('users-' + inputId);

            if (userId.name) {
                user.innerHTML = userId.name;
                liName.remove();
                alert(`Xóa thành công : ${userId.name}`)
            } else {
                user.innerHTML = 'Không tồn tại id, Vui lòng nhập lại !';
            }

        });
}