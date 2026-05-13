
function Card(props){

    return(
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>{props.tech}</p>
            <p>{props.done}</p>     
        </div>
    );

}
export default Card;