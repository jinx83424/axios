// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token']='akjdi8kjksiw8wkj393jmsxkms89ue3nkmzjcnjcu8du7ewhsjsjieujeygyshujhjhiahiahuie67e48u48'


// GET REQUEST
function getTodos() {
    axios
        .get('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then((res)=>showOutput(res))
        .catch((err)=>console.error(err));
    
  }
  
  // POST REQUEST
  function addTodo() {
    // console.log('POST Request');
    axios
        .post('https://jsonplaceholder.typicode.com/posts', {
            title:"Para1",
            completed:true,
            class:2023
        })
        .then((res)=>showOutput(res))
        .catch((err)=>console.error(err));
    
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    // console.log('PUT/PATCH Request');
    // PUT REQ
    // axios
    //     .put('https://jsonplaceholder.typicode.com/posts/2', {
    //         title:"updated title",
    //         completed:false,
    //         class:NaN
    //     })
    //     .then((res)=>showOutput(res))
    //     .catch((err)=>console.error(err));
    // patch REQ
    axios
        .patch('https://jsonplaceholder.typicode.com/posts/2', {
            title:"updated title",
            completed:false,
            class:NaN
        })
        .then((res)=>showOutput(res))
        .catch((err)=>console.error(err));
    
  }
  
  // DELETE REQUEST
  function removeTodo() {
    // console.log('DELETE Request');
    // PUT REQ
    axios
        .delete('https://jsonplaceholder.typicode.com/posts/2')
        .then((res)=>showOutput(res))
        .catch((err)=>console.error(err));
    
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    // console.log('Simultaneous Request');
    // PUT REQ
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/comments?_limit=5')
    ])
        .then(([post,comm])=>{
            console.log(comm);
            showOutput(post)})
        .catch((err)=>console.error(err));
    
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    // console.log('Custom Headers');
    config={
        headers:{
            "content-Type":"application/json",
            Authorization:"some Token"
        }
    }
    axios
        .post('https://jsonplaceholder.typicode.com/posts', {
            title:"Para1",
            completed:true,
            class:2023
        },config)
        .then((res)=>showOutput(res))
        .catch((err)=>console.error(err));
    
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    // console.log('Transform Response');
    const options={
        method:'post',
        url:'https://jsonplaceholder.typicode.com/posts',
        data:{
            title:'HEllo World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data=>{
          data.title=data.title.toUpperCase();
          return data;
        })
    };
    axios(options).then(res=>showOutput(res))
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
        .get('https://jsonplaceholder.typicode.com/postssius?_limit=5')
        .then((res)=>showOutput(res))
        .catch((err)=>{
          // if(err.response){
            if(err.response.status==404){
            
              alert("Page Not Found...ERROR CODE:404")
              console.log(err.response.headers)
            }
          // }
        });
    
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    // console.log('Cancel Token');
   const source=axios.CancelToken.source();

    axios
        .get('https://jsonplaceholder.typicode.com/posts?_limit=5',{
          cancelToken: source.token
        })
        .then((res)=>showOutput(res))
        .catch(thrown=>{
          if(axios.isCancel(thrown)){
            console.log( thrown.message)
          }
        });
        if(true){
          source.cancel('request cancelled')
        }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    config=>{
        console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().toLocaleTimeString()}`);
        return config;
    },
    (error)=>{
        return Promise.reject("error")
    }
  )
  // AXIOS INSTANCES
  
const axiosInstance=axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
});
axiosInstance.get('/comments?_limit=6').then(res=>showOutput(res))


  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);


