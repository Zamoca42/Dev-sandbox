import { Avatar, Card } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";

function Post( { post } ) {
    const { caption, location, photo, } = post;
        return (
        <div>
            <Card 
            cover={ <img src={photo} alt={caption} /> }
            actions={ [<HeartOutlined />] }
            >
                <Card.Meta avatar = {<Avatar icon={<UserOutlined />} size="large"/>} 
                        title={location}
                        description={caption} 
                />
            </Card>
            {/* <div>
                <img src={photo} width="50%" />
            </div>
            <div>
                {caption} {location}
            </div> */}
        </div>  
    );    
}

export default Post;