function Post( { post } ) {
    const { caption, location, photo, } = post;
        return (
        <div>
            <div>
                <img src={photo} width="50%" />
            </div>
            <div>
                {caption} {location}
            </div>
        </div>  
    );    
}

export default Post;