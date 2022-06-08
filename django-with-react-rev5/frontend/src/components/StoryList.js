import "./StoryList.css";
import { Card } from "antd"

export default function StoryList( { style }) {
    return (
    <div style={style}>
        <Card title="stories" size="small">
            Stories from people
        </Card>
    </div>
    
    );
}