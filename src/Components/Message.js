const ShowPosts = ({ message }) => {


    return <div>

        {
            <div className="row" >
                <div className="two columns alignLeft" ><label style={{ color: 'red' }}>{message.author}:</label></div>
                <div className="ten columns alignLeft">{message.message}</div>
            </div>
        }
    </div>

}

export default ShowPosts;