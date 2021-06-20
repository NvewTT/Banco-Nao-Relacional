import React, { Component } from 'react';
import { useForm } from 'react-hook-form' ;
import './App.css';





 
function Welcome(props) {
  
  if (props.texto.length > 400){
    return (
      <a className = "linka"  onClick = {() =>handleClick1(props.id)}>Continuar lendo</a>
    );}
  else{
    return(
      <p></p>
    );
  }  
  
}

function handleClick1(id){
  if(document.getElementById(id).style.maxHeight === '100%'){
    document.getElementById(id).style.maxHeight = '6em';
  }else{
    document.getElementById(id).style.maxHeight = '100%';
  }
  
}




class App extends Component{
  
  state = {
    dados: [],
    loading: false,
  }
  

  async busca_api(text){
    this.setState({loading : true});
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      mode: 'cors'  
    };
    
    fetch("http://127.0.0.1:5000/teste/" + text, requestOptions)
      .then(response => response.json())
      .then(result => {this.setState({dados: result.result, loading : false}) 
    console.log(result.result[1].imagem.toString() === "NULL")}).catch((e)=>{
        console.log(e);
      });
      
  }
  
  
  async handleClick() {
    let text = document.getElementById('busca').value;
    
    console.log("loading",this.state.loading.toString());
    await this.busca_api(text)
  }
  
  render(){
    
   const {dados,loading} = this.state;
    
      
    
    return(
      
      <div>
        
          <div className = "Panel">
          <input className = "Busca" type="text" id = 'busca'   />
          <button className = "btn" onClick={() => this.handleClick()}>
          Buscar
          </button>
          </div>
        
      <div>
        
        
        {loading ? (<div className="loading">
      <div></div>
      <div></div>
    </div> ):dados.map(dados => (
          
          <div className = "Dados" key = {dados.id} id = {dados.id}>
            
            <img  src = {"https://www." + dados.imagem} onError={(e)=>{e.target.onerror = null; e.target.src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Person_icon_BLACK-01.svg/1200px-Person_icon_BLACK-01.svg.png"}}/>
            
            
            

            <p className= "block-with-text" id={dados.id + "demo"}>
              {dados.documento} 
              
            </p>
            <Welcome texto= {dados.documento} id = {dados.id + "demo"} />
            
          </div>
          
        ))}
      </div>
      </div>
    );
  }
}

export default App
