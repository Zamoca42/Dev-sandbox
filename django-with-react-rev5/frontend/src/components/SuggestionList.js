import "./SuggestionList.css";
import { Card } from "antd"
import Suggestion from "./Suggestion";

export default function SuggestionList({ style }) {
    return (
    <div sytle={style}>
        <Card title="Suggestion for you" size="small">
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
        </Card>
    </div>
    );
}