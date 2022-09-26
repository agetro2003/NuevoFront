
const redirectUser = () => {
    window.location.href = "http://localhost:5173/home"
}
function PageNotFound() {
 return(
     <div> 
        <h1> PAGE NOT FOUND </h1>
        <h3> We couldn't find this page </h3>
        <button onClick={redirectUser}> Visit our home page </button>     
    </div>
 )   
}
export default PageNotFound