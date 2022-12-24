const Header = ({title, isH1}) =>{
    if(isH1){
        return (<h1>{title}</h1>);
    }else{
        return (<h2>{title}</h2>);
    }
} 
  
export default Header