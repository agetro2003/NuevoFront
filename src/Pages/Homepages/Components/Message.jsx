import { Col, Input, Button } from "reactstrap"

export default function Message() {
    return(<Col className="align-self-center text-center ml-auto mr-auto" lg="6" md="8">
        <h1>Send us a message</h1>
        <div className="textarea-container">
            <Input
                cols="1000"
                name="name"
                placeholder="Type a message..."
                rows="5"
                type="textarea"
            ></Input>
        </div>
        <div className="send-button p-2">
            <Button
                block
                className="btn-round"
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="lg"
            >
                Send Message
            </Button>
        </div>
    </Col>);
}