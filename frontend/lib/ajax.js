var sendRequest = (method, url, data=null) => {

  return new Promise ( res => {

      const ajax = new XMLHttpRequest();
      
      ajax.open(method, url);
      ajax.setRequestHeader('Content-type', 'application/json');
      
      if(!data) {
          ajax.send(data);
      }
      ajax.addEventListener('load', (err, result) => {
          
          return err ? res(err) : res(result)
      });
  });
}

  
 

export { sendRequest };
  