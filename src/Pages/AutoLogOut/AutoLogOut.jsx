
const redirectUser = () => {
    window.location.href = "http://localhost:5173/home"
}
function AutoLogOut() {
 return(
     <div> 
        <h1> Session Timeout </h1>
        <h3> You have been logged out due to inactive  </h3>
        <button onClick={redirectUser}> Visit our home page </button>     
    </div>
 )   
}
export default AutoLogOut