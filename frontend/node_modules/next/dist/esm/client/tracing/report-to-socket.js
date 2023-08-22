import { sendMessage } from "../dev/error-overlay/websocket";
export default function reportToSocket(span) {
    if (span.state.state !== "ended") {
        throw new Error("Expected span to be ended");
    }
    sendMessage(JSON.stringify({
        event: "span-end",
        startTime: span.startTime,
        endTime: span.state.endTime,
        spanName: span.name,
        attributes: span.attributes
    }));
}

//# sourceMappingURL=report-to-socket.js.map