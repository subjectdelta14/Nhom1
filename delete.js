const http = 'https://todonew412.herokuapp.com/'


// all get all user
async  function getList() {
    let url = http+'api/list';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
        
            

        
}
//
var state = {
    'querySet': getList(),
    
    'page': 1,
    'rows': 5,
    'window': 5,
    }
    
  
    
    function pagination(querySet, page, rows) {
    
    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows
    
    var trimmedData = querySet.toString().slice(trimStart, trimEnd)
    
    var pages = Math.round(querySet.length / rows);
    
    return {
        'querySet': trimmedData,
        'pages': pages,
    }
    }
    
    function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')
    
    wrapper.innerHTML = ``
    console.log('Pages:', pages)
    
    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))
    
    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }
    
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
            maxLeft = 1
        }
        maxRight = pages
    }
    
    
    
    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }
    
    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }
    
    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }
    
    $('.page').on('click', function() {
        $('#list-user').empty()
    
        state.page = Number($(this).val())
    
        renderUsers()
    })
    
    }
//
async function renderUsers() {
    

var data = pagination(state.querySet, state.page, state.rows)

    let users = await getList();
    
    let html = '';
    console.log(1)
    users.forEach(user => {
        let htmlSegment = `<tbody>
        <tr>
          <th scope="row" id="user-${user._id}" class="user">${user._id}</th>
          <td>${user.name}</td>
          <td>
          <button type="button" class="btn btn-primary button-submit"  id="delete-${user._id}" onclick="deleteID(${user._id})">Delete</button>
          <button type="button" class="btn btn-primary button-submit"  id="update">Update</button>
          </td>
          
        </tr>
        </tbody>`;

        html += htmlSegment;
        
    });
    pageButtons(data.pages)

    let container = document.querySelector('#list-user');
    container.innerHTML = html;
    
}

//find by id
function findById(){
    const idUser= document.getElementById('userId').value;

    const findUser = http +'api/get/'+ idUser;
   

        fetch(findUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(response => {
                return response.json()
            })
            .then(
                function (userId){
                    const user = document.getElementById('list-user');
                    if(userId.name ){
                        user.innerHTML =`<tbody>
                      
                        <th scope="row">${userId._id}</th>
                          <th scope="row">${userId.name}</th>
                        <td>
                        <button type="button" class="btn btn-primary button-submit"  id="delete" onclick="deleteID(${userId._id})">Delete</button>
                        <button type="button" class="btn btn-primary button-submit"  id="update">Update</button>
                        </td>
                        </tbody>` ;
                
                    }else{
                        alert('id khg co')

                    }

                }
           
            

            )
        


}

//delete  
 function deleteID(idUser) {

    
    const deleteUser = http +'api/delete/'+ idUser;
   

        fetch(deleteUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(response => {
                return response.json()
            })
            .then(
            
            

            )
        alert('Xóa thành công')


        

    

}